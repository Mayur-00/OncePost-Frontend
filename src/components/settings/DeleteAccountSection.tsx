import React, { useState } from 'react'
import { Trash2 } from "lucide-react";
import { AccountDeleteConformation } from './AccountDeleteConformation';


 
 const DeleteAccountSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

   return (

    <>
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

       <AccountDeleteConformation
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onSuccess={() => {
                // Redirect to home or login after successful deletion
                window.location.href = "/";
              }}
              />
    
    </>
   )
 }
 
 export default DeleteAccountSection