'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {

  const router = useRouter();
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={()=>router.back()} className="px-3 py-3 rounded-full outline-1 hover:bg-gray-200 cursor-pointer mb-2 bg-gray-100 "><ArrowLeft/></button>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <strong>OncePost</strong>. Your privacy is important to us.
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>

      <p className="mb-4">
        When you use OncePost, we may collect the following information:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Name and email address</li>
        <li>Connected social media account information</li>
        <li>Usage data such as posts created and platform activity</li>
        <li>Payment information required to process subscriptions</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>

      <p className="mb-4">We use your information to:</p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Provide and improve our services</li>
        <li>Allow you to connect and post to social media platforms</li>
        <li>Manage your subscription plan</li>
        <li>Provide customer support</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Payments</h2>

      <p className="mb-4">
        All payments on OncePost are securely processed through
        <strong> Razorpay</strong>. We do not store your credit card or banking
        information on our servers.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. No Refund Policy</h2>

      <p className="mb-4">
        Once a subscription payment has been successfully processed, it is
        considered final. <strong>OncePost does not provide refunds</strong>
        for any subscription payments.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Security</h2>

      <p className="mb-4">
        We implement appropriate security measures to protect your personal data
        from unauthorized access, disclosure, or alteration.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        6. Third-Party Services
      </h2>

      <p className="mb-4">
        OncePost may integrate with third-party platforms such as social media
        providers. Your use of those platforms is subject to their own privacy
        policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. Changes to This Policy
      </h2>

      <p className="mb-4">
        We may update this Privacy Policy from time to time. Updates will be
        posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact Us</h2>

      <p>
        If you have questions regarding this Privacy Policy, please contact us
        through the <a href="/help" className="underline text-blue-700">help page</a>.
      </p>
    </div>
  );
}
