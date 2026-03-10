
"use client";

import { useState } from "react";
import ConnectedAccountsSection from "@/components/settings/ConnectedAccountsSection";
import Header from "@/components/settings/Header";
import NotificationsSection from "@/components/settings/NotificationsSection";
import UserInfoBar from "@/components/settings/UserInfoBar";
import { AccountDeleteConformation } from "@/components/settings/AccountDeleteConformation";
import { Lock, Bell, Trash2, Linkedin, Twitter } from "lucide-react";
import CurrentPlanComponent from "@/components/settings/CurrentPlanComponent";
import DeleteAccountSection from "@/components/settings/DeleteAccountSection";

const page = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Header />
      {/* Account Info */}
      <UserInfoBar />

      {/* Connected Accounts */}
      <ConnectedAccountsSection />
      <CurrentPlanComponent/>
      <DeleteAccountSection/>

     

    
    </>
  );
};

export default page;
