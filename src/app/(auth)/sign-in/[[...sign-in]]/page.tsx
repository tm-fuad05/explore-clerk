"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { EmailCodeFactor } from "@clerk/types";
import Loader from "@/components/Loader";
import {
  ArrowRight,
  Eye,
  EyeClosed,
  Lock,
  Mail,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import SocialSignIn from "@/app/(auth)/components/GoogleSignIn";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import {
  SignInFormError,
  signInSchema,
  SignInSchema,
  verifyEmailScema2,
  VerifyEmailScema2,
} from "@/schemas/auth.schema";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [formData, setFormData] = React.useState<SignInSchema>({
    email: "",
    password: "",
  });

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const [code, setCode] = React.useState<VerifyEmailScema2>("");
  const [error, setError] = React.useState("");
  const [formError, setFormError] = React.useState<SignInFormError>({});

  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [canResend, setCanResend] = React.useState(true);
  const [timer, setTimer] = React.useState(0);
  const [isFirstAttempt, setIsFirstAttempt] = React.useState(true);

  const [showEmailCode, setShowEmailCode] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <Loader />;
    setLoading(true);
    setError("");
    setFormError({});

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten();
      setFormError(errors.fieldErrors);
      setLoading(false);
      return;
    } else {
      setFormError({});
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === "complete") {
        (await setActive({
          session: signInAttempt.createdSessionId,
        }),
          router.push("/"));
      } else if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor =>
            factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <Loader />;
    setLoading(true);

    const result = verifyEmailScema2.safeParse(code);

    if (!result.success) {
      toast.warn(result.error.issues[0]?.message || "Invalid code");
      setLoading(false);
      return;
    } else {
      setLoading(true);
    }

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      toast.warn(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  async function resendCode() {
    if (!signIn || !canResend) return;

    const factor = signIn.supportedSecondFactors?.find(
      (f): f is EmailCodeFactor => f.strategy === "email_code",
    );

    if (!factor) return toast.error("Something went wrong!");

    toast.promise(
      signIn.prepareSecondFactor({
        strategy: "email_code",
        emailAddressId: factor.emailAddressId,
      }),
      { pending: "Resend code...", success: "Verification code sent!" },
    );

    setCanResend(false);

    if (isFirstAttempt) {
      setTimer(30);
      setIsFirstAttempt(false);
    } else {
      setTimer(60);
    }
  }

  // Display email code verification form
  if (showEmailCode) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg">
          {/* Glassmorphism Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-slate-700">
                <ShieldCheck className="text-blue-400" size={40} />
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Check your email
              </h1>
              <p className="text-slate-400">
                Enter the 6-digit code sent to your{" "}
                <strong>{formData.email}</strong>
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleEmailCode}>
              {/* OTP Inputs */}
              <div className="flex justify-between gap-2">
                <OTPInput
                  value={code}
                  onChange={setCode}
                  numInputs={6}
                  // renderSeparator={<span className="text-gray-600">-</span>}
                  renderInput={(props) => (
                    <input
                      className=""
                      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                    />
                  )}
                  containerStyle="flex justify-center w-full"
                  inputStyle="flex-1 h-18 mx-2 text-center text-white bg-slate-800/50 border border-slate-700 rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Verify Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] disabled:from-slate-500 disabled:to-slate-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Code"}
                <ArrowRight
                  size={18}
                  className={`group-hover:translate-x-1 transition-transform ${loading && "hidden"}`}
                />
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-slate-400 text-sm">Didn't receive the code?</p>
              <button
                onClick={() => {
                  resendCode();
                  setCode("");
                }}
                disabled={!canResend}
                className={`flex items-center justify-center gap-2 mx-auto  font-medium   ${canResend ? "text-blue-400 transition-colors group hover:text-blue-300 cursor-pointer" : "text-slate-500 cursor-not-allowed"}`}
              >
                <RefreshCcw
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                {canResend ? "Resend code" : `Resend in ${timer}s`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display a form to capture the user's email and password
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative p-5 lg:p-16 pt-30">
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Log in to your developer account</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">
                Email Address
              </label>
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={changeInputHandler}
                    placeholder="name@example.com"
                    name="email"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>
                {formError.email && (
                  <p className="animate-in fade-in slide-in-from-top-2 text-red-400 text-sm">
                    {formError.email[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <button
                    type="button"
                    onMouseDown={() => setShow(true)}
                    onMouseUp={() => setShow(false)}
                    onMouseLeave={() => setShow(false)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {show ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </button>

                  <input
                    type={show ? "text" : "password"}
                    value={formData.password}
                    onChange={changeInputHandler}
                    placeholder="••••••••"
                    name="password"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>
                {formError.password && (
                  <p className="ml-5 animate-in fade-in slide-in-from-top-2 text-red-400 text-sm">
                    {formError.password[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Error Message (Conditional) */}
            {error && (
              <div className="relative flex items-center gap-3 bg-red-500/10 border border-red-500/50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                <p className="text-sm font-medium text-red-200">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] disabled:from-slate-500 disabled:to-slate-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight
                size={18}
                className={`group-hover:translate-x-1 transition-transform ${loading && "hidden"}`}
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex gap-2 justify-center items-center">
            <div className="h-px grow bg-slate-800" />
            <p className="text-slate-500 text-sm font-medium">Or</p>
            <div className="h-px grow bg-slate-800" />
          </div>

          {/* Social Logins */}
          <SocialSignIn />

          {/* Footer */}
          <p className="text-center mt-8 text-slate-400 text-sm">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
