"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Eye, EyeClosed } from "lucide-react";
import { ShieldCheck, RefreshCcw } from "lucide-react";
import Loader from "@/components/Loader";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import SocialSignIn from "@/app/auth/components/GoogleSignIn";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [show, setShow] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [canResend, setCanResend] = React.useState(true);
  const [timer, setTimer] = React.useState(0);
  const [isFirstAttempt, setIsFirstAttempt] = React.useState(true);

  const [error, setError] = React.useState<string>("");

  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <Loader />;
    setLoading(true);
    setError("");
    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      // Send the user an email with the verification code
      toast.promise(
        signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        }),
        {
          pending: "Verification code sending....",
          success: "Code sent",
        },
      );

      // Set 'verifying' true to display second form
      // and capture the code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling

      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return <Loader />;
    setLoading(true);
    setError("");

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        toast.promise(
          setActive({
            session: signUpAttempt.createdSessionId,
          }),
          {
            pending: "Signing up...",
            success: "Successfully Signed Up!",
          },
        );
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.

        console.error("Sign-up attempt not complete:", signUpAttempt);
        console.error("Sign-up attempt status:", signUpAttempt.status);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling

      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
      toast.error(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  //Resend Logic
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
    if (!signUp || !canResend) return;

    toast.promise(
      signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      }),
      {
        pending: "Sending code...",
        success: "Verification code resent to your email.",
      },
    );
    setCanResend(false);

    if (isFirstAttempt) {
      setTimer(30);
      setIsFirstAttempt(false);
    } else {
      setTimer(60);
    }
  }

  if (loading) return <Loader />;

  // Display the verification form to capture the code
  if (verifying) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        {/* Background Blobs (Same as Signup) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative w-full max-w-lg">
          {/* Glassmorphism Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-slate-700">
                <ShieldCheck className="text-blue-400" size={40} />
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Check your email
              </h1>
              <p className="text-slate-400">
                Enter the 6-digit code sent to your{" "}
                <strong>{emailAddress}</strong>
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleVerify}>
              {/* OTP Inputs */}
              <div className="flex justify-between gap-2">
                <OtpInput
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
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
              >
                Verify Code
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
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
                className={`flex items-center justify-center gap-2 mx-auto  font-medium ${canResend ? "text-blue-400 transition-colors group hover:text-blue-300 cursor-pointer " : "text-slate-500 cursor-not-allowed"}`}
              >
                <RefreshCcw
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                {canResend ? "Resend code" : `Resend in ${timer}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-120">
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-slate-400">Join our community of developers</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Last Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white pl-3 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock size={18} />
                </div>
                <button
                  onMouseDown={() => setShow(true)}
                  onMouseUp={() => setShow(false)}
                  onMouseLeave={() => setShow(false)}
                  className="absolute inset-y-3 right-3 cursor-pointer text-slate-500"
                >
                  {show ? <EyeClosed /> : <Eye />}
                </button>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
              {/* Error Message */}
              {error && (
                <div className="group relative w-full mb-6 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-red-500/10 blur-xl"></div>

                  <div className="relative flex items-center gap-3 bg-red-500/10 border border-red-500/50 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
                    {/* Red Bar on the left */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>

                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-500/20 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>

                    {/* Error Message */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-200 leading-tight">
                        {error}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setError("")}
                      className="text-red-400 hover:text-red-200 transition-colors p-1 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all active:scale-[0.98]"
            >
              Sign Up
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
          <div className="my-4 flex gap-2 justify-center items-center">
            <div className="h-px grow bg-slate-800" />{" "}
            <p className="text-slate-500 font-medium">Or</p>
            <div className="h-px grow bg-slate-800" />
          </div>
          <SocialSignIn />

          {/* Footer */}
          <p className="text-center mt-8 text-slate-400 text-sm">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
