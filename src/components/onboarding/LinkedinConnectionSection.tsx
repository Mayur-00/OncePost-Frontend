'use client'

import { LinkedinIcon, CheckCircle } from 'lucide-react'
import LinkedinConnectbutton from '../LinkedinConnectbutton'
import { useUserStore } from '@/stores/user.store'

const LinkedinConnectionSection = () => {
  const { connectedAccounts } = useUserStore();

  const isConnected = connectedAccounts?.some(
    (acc) => acc.platform.toLowerCase() === 'linkedin' && !acc.isExpired
  );

  return (
    <div className="h-60  bg-white rounded-xl shadow-sm border px-5 py-5 flex flex-col gap-4 transition hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg">
          <LinkedinIcon className="text-blue-600 size-5" />
        </div>
        <div>
          <h2 className="font-semibold text-base">LinkedIn</h2>
          <p className="text-xs text-gray-500">Professional content publishing</p>
        </div>
      </div>

      {/* Features */}
      <ul className="text-xs text-gray-600 space-y-1">
        <li>• Schedule posts</li>
        <li>• Track engagement</li>
        <li>• Profile analytics</li>
      </ul>

      {/* Action */}
      <div className="pt-2">
        {isConnected ? (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle className="size-4" />
            Connected
          </div>
        ) : (
          <LinkedinConnectbutton />
        )}
      </div>
    </div>
  );
};

export default LinkedinConnectionSection;