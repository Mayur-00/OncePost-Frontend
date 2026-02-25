import { GoogleProvider } from "@/providers/GoogleProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <GoogleProvider>{children}</GoogleProvider>
    </body>
  );
}
