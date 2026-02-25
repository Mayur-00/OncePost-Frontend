import React from "react";

const RecentsSkeleton = () => {
  return (
    <section className="w-full lg:w-[60%] h-auto max-h-120 overflow-y-auto flex flex-col bg-white text-black p-5 rounded-md gap-3 outline outline-zinc-300 shadow-xl animate-pulse">
      <div className="h-5 w-40 bg-zinc-300 rounded-lg animate-pulse "></div>

      <div className="bg-white  shadow-lg h-20 rounded-md p-2 flex  gap-2 relative ">
        <div className="h-15 w-15 rounded-sm  shadow-lg bg-zinc-300 animate-pulse "></div>
        <div className="flex flex-col gap-3 ">
          <div className="h-5 w-100 bg-zinc-300 rounded-lg shadow-lg animate-pulse"></div>
          <div className="flex gap-3 items-center">
            <div
              className={`h-5 w-10 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>
            <div
              className={`h-5 w-10 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>

            <div
              className={`h-5 w-30 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-white  shadow-lg h-20 rounded-md p-2 flex  gap-2 relative ">
        <div className="h-15 w-15 rounded-sm  shadow-lg bg-zinc-300 animate-pulse "></div>
        <div className="flex flex-col gap-3 ">
          <div className="h-5 w-100 bg-zinc-300 rounded-lg shadow-lg animate-pulse"></div>
          <div className="flex gap-3 items-center">
            <div
              className={`h-5 w-10 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>
            <div
              className={`h-5 w-10 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>

            <div
              className={`h-5 w-30 bg-zinc-300 rounded-lg animate-pulse `}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentsSkeleton;
