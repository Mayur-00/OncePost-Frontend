
import { useAuthStore } from "@/stores/auth.store";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const GoogleSignupButton = () => {
  const router = useRouter();


  const {googleAuthSuccess} = useAuthStore();

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    if(!credentialResponse.credential){
      toast.error('failed');
      return
    }
    const res = await googleAuthSuccess(credentialResponse.credential);

    if(!res.success){
      toast.error(res.message);
      return
    };
    window.location.href = '/dashboard'
  };

  const handleError = () => {
   toast.error('sign in process Failed, Please retry after some time')
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
