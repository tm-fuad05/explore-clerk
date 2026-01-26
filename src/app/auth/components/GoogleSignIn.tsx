"use client";

import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function SocialSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err.errors);
        toast.error(err.errors[0].message);
        console.error(err, null, 2);
      });
  };

  return (
    <div className="flex flex-col space-y-4 mt-8">
      {/* Google Login Button */}
      <button
        onClick={() => signInWith("oauth_google")}
        type="button"
        className="w-full bg-slate-800/50 border border-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] hover:border-blue-500/50 hover:shadow-blue-500/20"
      >
        <FcGoogle />
        <span className="text-slate-200 group-hover:text-white transition-colors">
          Continue with Google
        </span>
      </button>

      {/* Facebook Login Button */}
      <button
        onClick={() => signInWith("oauth_facebook")}
        type="button"
        className="w-full bg-slate-800/50 border border-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] hover:border-purple-500/50 hover:shadow-purple-500/20"
      >
        <BsFacebook />
        <span className="text-slate-200 group-hover:text-white transition-colors">
          Continue with Facebook
        </span>
      </button>
    </div>
  );
}
