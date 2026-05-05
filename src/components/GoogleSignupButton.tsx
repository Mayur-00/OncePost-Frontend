"use client"

import { useAuthStore } from "@/stores/auth.store";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GoogleSignupButton = () => {
  const { googleAuthSuccess } = useAuthStore();

  const router = useRouter()

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("failed");
      return;
    }
    const res = await googleAuthSuccess(credentialResponse.credential);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    router.push("/boarding-gateway")
  };

  const handleError = () => {
    toast.error("sign in process Failed, Please retry after some time");
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={handleError}
      useOneTap
      theme="outline"
      size="large"
      text="continue_with"
      shape="pill"
    />
  );
};

export default GoogleSignupButton;
