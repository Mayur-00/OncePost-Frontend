"use client"

import { AlertTriangle, Crown, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  limit: number
}

export default function PostLimitBanner({ limit }: Props) {

  const [visible, setVisible] = useState(true)
  const router = useRouter()

  if (!visible) return null

  return (
    <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between gap-4">

      {/* LEFT */}

      <div className="flex gap-3">

        <AlertTriangle className="text-red-500 mt-1" size={20} />

        <div>
          <p className="font-semibold text-red-700">
            Monthly post limit reached
          </p>

          <p className="text-sm text-red-600">
            You have reached the limit of <span className="font-medium">{limit}</span> posts for your current plan.
            Upgrade your plan to continue publishing posts.
          </p>
        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <button
          onClick={() => router.push("/pricing")}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md text-sm hover:bg-violet-700 transition"
        >
          <Crown size={16} />
          Upgrade Plan
        </button>

        <button
          onClick={() => setVisible(false)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={18} />
        </button>

      </div>

    </div>
  )
}