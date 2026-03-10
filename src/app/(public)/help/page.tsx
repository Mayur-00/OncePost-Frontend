'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function HelpPage() {

  const router = useRouter();



  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={()=>router.back()} className="px-3 py-3 rounded-full outline-1 hover:bg-gray-200 cursor-pointer mb-2 bg-gray-100 "><ArrowLeft/></button>

      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>

      <p className="text-gray-600 mb-10">
        Need help using OncePost? Here are some common questions and answers.
      </p>


      {/* FAQ */}

      <div className="space-y-8">

        <div>
          <h2 className="font-semibold text-lg">
            How do I connect my social media accounts?
          </h2>

          <p className="text-gray-600 mt-2">
            Go to the onboarding page after signing up and connect your
            supported social media accounts such as LinkedIn or X.
          </p>
        </div>


        <div>
          <h2 className="font-semibold text-lg">
            Why can't I create more posts?
          </h2>

          <p className="text-gray-600 mt-2">
            Your subscription plan may have reached its monthly post limit.
            You can upgrade your plan to continue posting.
          </p>
        </div>


        <div>
          <h2 className="font-semibold text-lg">
            How are payments processed?
          </h2>

          <p className="text-gray-600 mt-2">
            All payments are securely processed through Razorpay.
          </p>
        </div>


        <div>
          <h2 className="font-semibold text-lg">
            Do you offer refunds?
          </h2>

          <p className="text-gray-600 mt-2">
            No. All subscription payments are final and OncePost does not
            provide refunds.
          </p>
        </div>


        <div>
          <h2 className="font-semibold text-lg">
            My social account disconnected. What should I do?
          </h2>

          <p className="text-gray-600 mt-2">
            Simply reconnect your account from the settings pages's account
            connection section.
          </p>
        </div>

      </div>


      {/* Contact */}

      <div className="mt-16 border-t pt-8">

        <h2 className="text-xl font-semibold mb-3">
          Contact Support
        </h2>

        <p className="text-gray-600">
          If you need further assistance, please contact us
        </p>

        <Link 
   href={"https://mail.google.com"} 
  className="mt-2 font-medium font underline text-blue-600"

>
  mayurxdev@gmail.com
</Link>

      </div>

    </div>
  )
}