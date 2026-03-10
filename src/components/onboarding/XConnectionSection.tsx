'use client'

import { TwitterIcon, CheckCircle } from 'lucide-react'
import XConnectButton from '../XConnectionButton'
import { useUserStore } from '@/stores/user.store'

const XConnectionSection = () => {
  const { connectedAccounts } = useUserStore();

  const isConnected = connectedAccounts?.some(
    (acc) => acc.platform.toLowerCase() === 'x' && !acc.isExpired
  );

  return (
    <div className="h-60 bg-white rounded-xl shadow-sm border px-5 py-5 flex flex-col gap-4 transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-lg">
          <TwitterIcon className="text-black size-5" />
        </div>
        <div>
          <h2 className="font-semibold text-base">X (Twitter)</h2>
          <p className="text-xs text-gray-500">Short-form audience growth</p>
        </div>
      </div>

      {/* Features */}
      <ul className="text-xs text-gray-600 space-y-1">
        <li>• Thread scheduling</li>
        <li>• Performance tracking</li>
        <li>• Engagement insights</li>
      </ul>

      {/* Action */}
      <div className="pt-2">
        {isConnected ? (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle className="size-4" />
            Connected
          </div>
        ) : (
          <XConnectButton />
        )}
      </div>
    </div>
  );
};

export default XConnectionSection;