import DashboardLayout from "@/components/Layout/DashboardLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Creative Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
