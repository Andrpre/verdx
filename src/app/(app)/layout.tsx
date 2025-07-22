import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/app/supabase/server";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar/ui/AppSidebar";

export const metadata: Metadata = {
  title: "verdx",
  description: "Сервис для разрешения споров",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex gap-4 w-full p-2">
          <SidebarTrigger />
          <main className="flex flex-col gap-8 w-2xl">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
