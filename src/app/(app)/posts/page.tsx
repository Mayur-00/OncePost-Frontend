"use client";

import { usePostStore } from "@/stores/post.store";
import { ArrowLeft, ArrowRight, Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [searchText, setSearchText] = useState("");
  const [skip, setSkip] = useState(0);

  const { getPosts, posts, postsLoading, searchPosts } = usePostStore();

  const handleSearch = async () => {
    if (!searchText.trim() || searchText.trim().length <= 3) {
      return;
    }

    const res = await searchPosts(searchText, "ALL", 10, 0);

    if (res.success) {
      setSearchText("");
    }
  };
  const handleIncreaseSkipAndGetPosts = async () => {
    const newSkipValue = skip + 10;
    setSkip(newSkipValue);
    console.log(newSkipValue);
    getPosts(10, newSkipValue);
  };
  const handleDecreaseSkipAndGetPosts = async () => {
    if (skip < 0) {
      return;
    }

    const newSkipValue = skip - 10;
    setSkip(newSkipValue);
    console.log(newSkipValue);
    getPosts(10, newSkipValue);
  };
  useEffect(() => {
    if (!posts) {
      getPosts(10, 0);
    }
  }, []);
  return (
    <>
      <section className="w-full flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold">All Posts 👋</h1>
          <p className="text-sm text-zinc-500 mt-1">
            View and manage all your published posts
          </p>
        </div>
      </section>

      {/* Card */}
      <section className="w-full bg-gray-50 shadow-lg rounded-md flex flex-col p-5 gap-5 h-screen overflow-y-scroll relative">
        {/* Search + Filter */}
        <div className="w-full bg-white flex items-center gap-4 p-3 rounded-md shadow">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search your posts..."
            className="flex-1 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={handleSearch}
          >
            <Search size={18} />
          </button>
        </div>

        {postsLoading ? (
          <div className="h-50 w-full flex items-center justify-center ">
            <Loader2 className="animate-spin size-10" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Post Card */}
            {posts?.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-md p-4 flex gap-4 hover:shadow-xl transition cursor-pointer"
              >
                {/* Image */}
                <img
                  src={post.mediaUrl || "/postsPlaceholder.png"}
                  alt="post"
                  className="h-16 w-16 rounded-md object-cover"
                />

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h2 className="text-sm font-medium line-clamp-2">
                    {post.content}
                  </h2>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Platform */}
                    {post.platform_post.map((platform) => (
                      <span
                        key={platform.id}
                        className="flex items-center gap-1 text-xs bg-zinc-900 text-white px-3 py-1 rounded-full"
                      >
                        {platform.platform}
                      </span>
                    ))}

                    {/* Status */}
                    <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
                      {post.status}
                    </span>

                    {/* Time */}
                    <span className="text-xs text-zinc-400">
                      {`${new Date(post.updatedAt).toLocaleTimeString()} : ${new Date(post.updatedAt).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {posts?.length ===0 && !postsLoading && (
          <div className="text-center text-zinc-500 text-sm py-10">
            No posts found
          </div>
        )}
        {posts && (
          <div className="h-50 w-full flex items-center justify-center gap-2 ">
            <button
              name="decrement"
              className="h-10 w-10 rounded-md bg-violet-500 text-white flex items-center justify-center"
              onClick={handleDecreaseSkipAndGetPosts}
              disabled={skip === 0}
            >
              <ArrowLeft />
            </button>
            <button
              name="increment"
              className="h-10 w-10 rounded-md bg-violet-500 text-white flex items-center justify-center"
              onClick={handleIncreaseSkipAndGetPosts}
              disabled={posts?.length === 0 ? true : false}
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
