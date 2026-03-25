import { Toaster } from "@/components/ui/sonner";
import { GoogleProvider } from "@/providers/GoogleProvider";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleProvider>
      {children}
      <Toaster position="bottom-right" />
    </GoogleProvider>
  );
}
