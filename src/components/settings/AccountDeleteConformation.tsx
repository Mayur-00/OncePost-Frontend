"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  deleteAccountSchema,
  type DeleteAccountFormData,
} from "@/schema/delete-account.schema";
import { useUserStore } from "@/stores/user.store";

interface AccountDeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AccountDeleteConformation = ({
  isOpen,
  onClose,
  onSuccess,
}: AccountDeleteConfirmationProps) => {

    const {deleteAccount} = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
  });



  const onSubmit = async (data: DeleteAccountFormData) => {
    try {
      const response = await deleteAccount();

      if (response.success) {
        toast.success("Account deleted successfully");
        reset();
        onClose();
        onSuccess?.();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete account. Please try again.";
      toast.error(errorMessage);
    } 
  };

  if (!isOpen) return null;

  return (
    <div className="h-[80%] w-[94%] lg:w-[80%] bg-transparent  fixed z-50 flex items-center justify-center">
      <section className="bg-white rounded-lg shadow-xl  max-w-md w-full mx-4 p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-red-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Delete Account
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-800">
            <strong>Warning:</strong> Deleting your account will:
          </p>
          <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
            <li>Permanently delete all your posts and data</li>
            <li>Disconnect all social media accounts</li>
            <li>Cannot be recovered</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Confirmation Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Type <strong>"delete my account"</strong> to confirm
            </label>
            <input
              {...register("confirmation")}
              type="text"
              placeholder="delete my account"
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
            />
            {errors.confirmation && (
              <p className="text-red-500 text-sm">{errors.confirmation.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center">
          If you need help, please contact our support team before deleting your
          account.
        </p>
      </section>
    </div>
  );
};

