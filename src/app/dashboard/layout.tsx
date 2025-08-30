import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Creative Dashboard",
};
import DashboardLayout from "@/components/Layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
