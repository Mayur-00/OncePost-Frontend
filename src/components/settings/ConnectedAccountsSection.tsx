"use client"

import { useUserStore } from '@/stores/user.store'
import { Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LinkedinConnectbutton from '../LinkedinConnectbutton'
import XConnectButton from '../XConnectionButton'
import ConnectedAccountsSkeleton from '../skeleton/ConnectedAccountsSkeleton'


const ConnectedAccountsSection = () => {
  const {connectedAccounts, isFetching} = useUserStore()

  const handleConnect = (platform: string) => {
    // Handle connect logic for the platform
    console.log(`Connecting to ${platform}`)
  }

  const isLinkedInConnected = connectedAccounts?.some(
    (acc) => acc.platform.toLowerCase() === 'linkedin' && acc.isExpired === false
  );
  const isTwitterConnected = connectedAccounts?.some(
    (acc) => acc.platform.toLowerCase() === 'x' && acc.isExpired === false
  );

  if(isFetching){
    return (
      <ConnectedAccountsSkeleton/>
    )
  }

  return (
        <section className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Linkedin />
          <h2 className="text-lg font-semibold">Connected Accounts</h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border rounded-md p-4">
            <div className="flex items-center gap-3">
              <Linkedin />
              <span>LinkedIn</span>
            </div>
            {isLinkedInConnected ? (
              <span className="text-sm text-green-600">Connected</span>
            ) : (
             <LinkedinConnectbutton/>
            )}
          </div>

          <div className="flex items-center justify-between border rounded-md p-4">
            <div className="flex items-center gap-3">
              <Twitter />
              <span>X (Twitter)</span>
            </div>
            {isTwitterConnected ? (
              <span className="text-sm text-green-600">Connected</span>
            ) : (
              <XConnectButton/>
            )}
          </div>
        </div>
      </section>
  )
}

export default ConnectedAccountsSection