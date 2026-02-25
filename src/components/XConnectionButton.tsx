'use client'


import api from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
const XConnectButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const handleConnection = async () => {
    try {
      setLoading(true)
         const response = await api.post('/x/auth');
         if(!response.data.success){
            alert(response.data.data.message)
         }
         window.location.href = response.data.data.url
    } catch (error) {
        alert(error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <button
      onClick={handleConnection}
      disabled={loading}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-900 transition text-sm font-medium cursor-pointer"
    >
      {loading?(<Loader2 className="size-5 animate-spin"/>):('Connect')}
    </button>
  );
};

export default XConnectButton;
