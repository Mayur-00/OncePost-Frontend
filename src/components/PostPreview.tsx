"use client"
import { useUserStore } from "@/stores/user.store";
import React from "react";

const PostPreview = ({content, imagePreview, platforms}:{content:string, imagePreview:string, platforms:any[]}) => {
  const {user} = useUserStore();
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4 border">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-zinc-300 overflow-hidden" >
          <img src={user?.profile_Picture || '/logo2.png'} alt="" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-sm">{user?.name || 'OncePost'}</p>
          <p className="text-xs text-zinc-500">Preview • Twitter / LinkedIn</p>
        </div>
      </div>


      {/* Content Preview */}
      <section className="text-sm text-zinc-800 leading-relaxed mb-3 max-h-40 overflow-auto wrap-break-word whitespace-pre-wrap" >
        {content ? content:'🚀 Your post content will appear here.Start typing to see how it looks across platforms.'}
      </section>

      {/* Image Preview */}
       {imagePreview ? (
          <img src={imagePreview} alt=" image_preview" className="w-full h-40 bg-zinc-200 rounded-md mb-3" />
        ):(
          <div className="w-full h-40 bg-zinc-200 rounded-md mb-3 flex items-center justify-center  text-zinc-500">
       
      </div>
        )}
      

      {/* Footer */}
      <div className="flex justify-between text-xs text-zinc-500">
        <span>❤️ Likes</span>
        <span>💬 Comments</span>
        <span> 🔁 Reposts </span>
      </div>
    </div>
  );
};

export default PostPreview;