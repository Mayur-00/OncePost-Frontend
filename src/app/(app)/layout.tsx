import MobileSidebar from "@/components/layouts/MobileSidebar";
import SideBar from "@/components/layouts/SideBar";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    
    <main className="h-screen w-screen flex overflow-y-auto relative">
      <SideBar/>
      <MobileSidebar/>
      <section className="w-full p-4 lg:p-6 mt-15 lg:m-0 flex flex-col gap-6 overflow-y-auto">{children}</section>
         <Toaster position="bottom-right"/>
    </main>
  );
}