"use client";

import SideBar from "@/components/layouts/SideBar";
import { useUserStore } from "@/stores/user.store";
import {
  Mail,
  Calendar,
  Linkedin,
  Twitter,
  FileText,
  CheckCircle,
} from "lucide-react";
import React, { useEffect } from "react";

const page = () => {
  const { user, connectedAccounts, getUser, subscriptions } = useUserStore();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <>
      {/* Header */}
      <section>
        <h1 className="text-3xl font-semibold">Profile 👤</h1>
        <p className="text-sm text-zinc-500 mt-1">
          View your public profile and activity
        </p>
      </section>

      {/* Profile Card */}
      <section className="bg-white rounded-md shadow-md p-6 flex gap-6 items-center">
        <img
          src={user?.profile_Picture || "user-placeholder.png"}
          alt="Profile"
          className="h-20 w-25 lg:h-28 lg:w-28 rounded-lg border shadow-md object-cover"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl lg:text-2xl font-semibold">
            {user?.name || "Unkown User"}
          </h2>
          <div className="flex items-center gap-2 text-zinc-500 text-xs lg:text-sm">
            <Mail className="size-3 lg:size-4 " />
            <span>mayur@email.com</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500  text-xs lg:text-sm">
            <Calendar className="size-3 lg:size-4 " />
            <span>Joined At {user?.createdAt}</span>
          </div>

          <div className="flex gap-3 mt-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
              <CheckCircle className="size-4" /> Active
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-md p-5 flex flex-col gap-2">
          <h3 className="text-sm text-zinc-500">Total Posts</h3>
          <p className="text-3xl font-semibold">24</p>
        </div>

        <div className="bg-white rounded-md shadow-md p-5 flex flex-col gap-2">
          <h3 className="text-sm text-zinc-500">Platforms Connected</h3>
          <p className="text-3xl font-semibold">{connectedAccounts?.length}</p>
        </div>

        <div className="bg-white rounded-md shadow-md p-5 flex flex-col gap-2">
          <h3 className="text-sm text-zinc-500">Scheduled Posts</h3>
          <p className="text-3xl font-semibold">5</p>
        </div>
      </section>

      {/* Connected Platforms */}
      <section className="bg-white rounded-md shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Connected Platforms</h2>

        <div className="flex flex-col gap-3">
          {connectedAccounts?.map((pl) =>
            pl.platform === "LINKEDIN" ? (
              <div className="flex items-center justify-between border rounded-md p-4">
                <div className="flex items-center gap-3">
                  <Linkedin />
                  <span>LinkedIn</span>
                </div>
                <span className="text-green-600 text-sm">Connected</span>
              </div>
            ) : (
              <div className="flex items-center justify-between border rounded-md p-4">
                <div className="flex items-center gap-3">
                  <Twitter />
                  <span>X (Twitter)</span>
                </div>
                <span className="text-green-600 text-sm">Connected</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white rounded-md shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-zinc-600">
           <h1>Plan</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
