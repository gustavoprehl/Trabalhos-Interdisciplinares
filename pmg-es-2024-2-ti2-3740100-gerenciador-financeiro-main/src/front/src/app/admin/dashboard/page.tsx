import { AdminDashboardPageLayout } from "@/components/AdminDashboard";
import Sidebar from "@/components/AdminDashboard/sidebar";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <AdminDashboardPageLayout />
      </main>
    </div>
  );
}
