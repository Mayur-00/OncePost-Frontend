"use client"

import api from "@/lib/axios";
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import { useState } from "react";
const LinkedinConnectbutton = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const handleConnection = async () => {
    try {
      setLoading(true)
   const response = await api.get(`/linkedin/auth`);

   if(!response.data.success){
    return alert('api error occured');
   }
   
    return window.location.href = response.data.data
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
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium cursor-pointer"
    >
     {loading?(<Loader2 className="size-5 animate-spin" />):('Connect')}
    </button>
  );
};

export default LinkedinConnectbutton;
