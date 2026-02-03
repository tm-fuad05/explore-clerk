import Loader from "@/components/Loader";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Loader />
      <AuthenticateWithRedirectCallback />
    </>
  );
}
