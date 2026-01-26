"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const hasShownToast = sessionStorage.getItem("welcome_toast_shown");

      if (!hasShownToast) {
        toast.success(`Welcome back, ${user.firstName || "User"}!`);

        sessionStorage.setItem("welcome_toast_shown", "true");
      }
    }

    if (isLoaded && !isSignedIn) {
      sessionStorage.removeItem("welcome_toast_shown");
    }
  }, [isLoaded, isSignedIn, user]);

  return <>{children}</>;
}
