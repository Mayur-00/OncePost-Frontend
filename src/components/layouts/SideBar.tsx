
import SidebarNavigationButtonsSection from "../sidebar/SidebarNavigationButtonsSection";
import UserProfileBar from "../sidebar/UserProfileBar";

const SideBar = async () => {
  console.log('sidebar 1')
  return (
    <section
      className={` bg-gray-50 w-[20%] lg:w-[20%]   h-screen px-4 py-2 hidden lg:flex flex-col items-center outline outline-zinc-300 text-2xl font-semibold text-zinc-700 rounded-lg transition delay-500 duration-300 ease-in   `}
    >
      <div className=" h-15 flex justify-center items-center w-full py-5  ">
        <div className="flex items-center gap-2 p-1">
          <img
            src="/logo2.png"
            alt="logo"
            className={`h-6 rounded-full cursor-pointer transition delay-0 animate-out duration-150 hover:scale-105 `}
          
          />
          <h2
            className={`text-zinc-900 text-xl hidden lg:block`}
          >
            oncepost
          </h2>
        </div>
      </div>

      <SidebarNavigationButtonsSection />
     <UserProfileBar/>
    </section>
  );
};

export default SideBar;


