"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Github } from "lucide-react";
import { setInitialRole } from "@/app/admin-panel/_actions";

export default function SocialSignIn() {
  const { user } = useUser();
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_github",
  ) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
        if (user && !user?.publicMetadata?.role) {
          setInitialRole(user.id);
        }
      })
      .catch((err: any) => {
        console.log(err.errors);
        toast.error(err.errors[0].message);
        console.error(err, null, 2);
      });
  };

  return (
    <div className="flex gap-5 mt-8">
      {/* Google Login Button */}
      <button
        onClick={() => signInWith("oauth_google")}
        type="button"
        className="w-full bg-slate-800/50 border border-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] hover:border-blue-500/50 hover:shadow-blue-500/20 cursor-pointer"
      >
        <FcGoogle size={22} />
      </button>

      {/* Facebook Login Button */}
      <button
        onClick={() => signInWith("oauth_facebook")}
        type="button"
        className="w-full bg-slate-800/50 border border-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] hover:border-purple-500/50 hover:shadow-purple-500/20 cursor-pointer"
      >
        <BsFacebook size={22} />
      </button>
      {/* Github Login Button */}
      <button
        onClick={() => signInWith("oauth_github")}
        type="button"
        className="w-full bg-slate-800/50 border border-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-slate-800/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] hover:border-cyan-500/50 hover:shadow-cyan-500/20 cursor-pointer"
      >
        <Github
          size={22}
          className="text-slate-300 group-hover:text-white transition-colors"
        />
      </button>
    </div>
  );
}
