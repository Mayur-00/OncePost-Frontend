'use client'
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function TermsPage() {
    const router = useRouter();


  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={()=>router.back()} className="px-3 py-3 rounded-full outline-1 hover:bg-gray-200 cursor-pointer mb-2 bg-gray-100 "><ArrowLeft/></button>

      <h1 className="text-3xl font-bold mb-6">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <strong>OncePost</strong>. By accessing or using our
        platform, you agree to comply with and be bound by these
        Terms and Conditions. If you do not agree with these terms,
        please do not use the service.
      </p>

      {/* Acceptance */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        1. Acceptance of Terms
      </h2>

      <p className="mb-4">
        By creating an account or using OncePost, you agree to these
        Terms and Conditions and our Privacy Policy.
      </p>

      {/* Service */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. Description of Service
      </h2>

      <p className="mb-4">
        OncePost provides tools that allow users to create, schedule,
        and publish content across multiple social media platforms
        from a single dashboard.
      </p>

      <p className="mb-4">
        Features and limitations may vary depending on the subscription
        plan selected by the user.
      </p>

      {/* Accounts */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. User Accounts
      </h2>

      <p className="mb-4">
        Users are responsible for maintaining the confidentiality of
        their account credentials. You agree to provide accurate
        information during registration.
      </p>

      <p className="mb-4">
        OncePost is not responsible for any unauthorized access caused
        by negligence in protecting login credentials.
      </p>

      {/* Payments */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. Payments & Billing
      </h2>

      <p className="mb-4">
        All subscription payments are processed securely through
        <strong> Razorpay</strong>. By purchasing a subscription,
        you agree to Razorpay's payment processing terms.
      </p>

      <p className="mb-4">
        OncePost does not store sensitive payment information such as
        credit card details on its servers.
      </p>

      {/* Refund */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        5. No Refund Policy
      </h2>

      <p className="mb-4">
        All payments made for subscriptions are final. OncePost does
        <strong> not provide refunds</strong> for any subscription
        purchases.
      </p>

      {/* Usage */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        6. Acceptable Use
      </h2>

      <p className="mb-4">
        You agree not to use OncePost for any unlawful activities,
        including but not limited to:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Posting illegal or harmful content</li>
        <li>Violating social media platform policies</li>
        <li>Attempting to disrupt or abuse the service</li>
      </ul>

      {/* Availability */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        7. Service Availability
      </h2>

      <p className="mb-4">
        OncePost strives to maintain reliable service, but we do not
        guarantee uninterrupted availability. Service may be
        temporarily unavailable due to maintenance or external
        factors.
      </p>

      {/* Third party */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        8. Third-Party Platforms
      </h2>

      <p className="mb-4">
        OncePost integrates with third-party platforms such as social
        media services. We are not responsible for any changes,
        restrictions, or failures caused by those external platforms.
      </p>

      {/* Termination */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        9. Account Termination
      </h2>

      <p className="mb-4">
        OncePost reserves the right to suspend or terminate accounts
        that violate these Terms or misuse the platform.
      </p>

      {/* Liability */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        10. Limitation of Liability
      </h2>

      <p className="mb-4">
        OncePost shall not be held liable for any direct or indirect
        damages resulting from the use or inability to use the
        platform.
      </p>

      {/* Changes */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        11. Changes to Terms
      </h2>

      <p className="mb-4">
        We may update these Terms from time to time. Updated versions
        will be posted on this page.
      </p>

      {/* Contact */}

      <h2 className="text-xl font-semibold mt-8 mb-3">
        12. Contact
      </h2>

      <p>
        If you have any questions regarding these Terms and Conditions,
        please contact us through the Help page.
      </p>

    </div>
  )
}