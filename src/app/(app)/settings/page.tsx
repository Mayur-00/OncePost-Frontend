
"use client";

import { useState } from "react";
import ConnectedAccountsSection from "@/components/settings/ConnectedAccountsSection";
import Header from "@/components/settings/Header";
import NotificationsSection from "@/components/settings/NotificationsSection";
import UserInfoBar from "@/components/settings/UserInfoBar";
import { AccountDeleteConformation } from "@/components/settings/AccountDeleteConformation";
import { Lock, Bell, Trash2, Linkedin, Twitter } from "lucide-react";

const page = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Header />
      {/* Account Info */}
      <UserInfoBar />

      {/* Connected Accounts */}
      <ConnectedAccountsSection />

      {/* Notifications */}
      <NotificationsSection />

      {/* Security */}
      <section className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Lock />
          <h2 className="text-lg font-semibold">Security</h2>
        </div>

        <button disabled className="w-fit border border-zinc-300 px-4 py-2 rounded-md hover:bg-gray-50 disabled:grayscale">
          Change Password
        </button>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4 border border-red-200">
        <div className="flex items-center gap-3 text-red-600">
          <Trash2 />
          <h2 className="text-lg font-semibold">Danger Zone</h2>
        </div>

        <p className="text-sm text-zinc-500">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-fit bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Delete Account
        </button>
      </section>

      {/* Delete Account Modal */}
      <AccountDeleteConformation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => {
          // Redirect to home or login after successful deletion
          window.location.href = "/";
        }}
      />
    </>
  );
};

export default page;
