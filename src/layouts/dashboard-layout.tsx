import { Header } from "../components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import localFont from "next/font/local";

const dmSans = localFont({
  variable: "--dm-sans",
  src: [
    {
      path: "../styles/fonts/DMSans-VariableFont.ttf",
      weight: "100 900",
      style: 'normal',
    },
    {
      path: "../styles/fonts/DMSans-Italic-VariableFont.ttf",
      weight: "100 900",
      style: 'italic',
    },
  ]
});


interface Props {
  titlePage: String;
  children: ReactNode;
  variant?: String;
}

function DashboardLayout({ titlePage = "Dashboard", children, variant = "default" }: Props) {
  const items = [
    { title: "Introduction", completed: true },
    { title: "Course Structure", completed: true },
    {
      title: "Notes",
      completed: true,
      subItems: [
        { title: "Community", completed: true },
        { title: "Support", completed: true },
      ],
    },
  ];

  return (
    <>
      <Header titlePage={titlePage}></Header>
      {/* <AppSidebar >
         {children}
       </AppSidebar>
       <SidebarProvider>
         <AppSidebar />
         <main>
           <SidebarTrigger />
           {children}
         </main>
       </SidebarProvider> */}
      {variant === "default" &&
        <SidebarProvider>
          <AppSidebar variant={variant} />
          <main className={`w-full`}>
            <div className="flex w-full p-4 bg-[#c23531]">
              <SidebarTrigger className="bg-white" />
            </div>
            {children}
          </main>
        </SidebarProvider>
      }

      {variant === "rounded" &&
        <div className={`${dmSans.className} flex min-h-screen`}>
          <SidebarProvider>
            <AppSidebar variant={variant} />
            <main className="flex-1 p-6 h-screen overflow-hidden">


              <div className="relative h-full bg-white rounded-3xl flex flex-col">
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] rounded-3xl z-[1]" />
                <div className="flex items-center p-4 bg-[#c23531] rounded-t-3xl flex-none">
                  <SidebarTrigger className="bg-white" />
                </div>
                <div className="relative overflow-y-auto">
                  {children}
                </div>
              </div>
            </main>
          </SidebarProvider>
        </div>
      }
    </>
  );
}

export default DashboardLayout;
