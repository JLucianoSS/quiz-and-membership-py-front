import { Headerpage } from "@/components";
import { AdminDashboard } from "./components";

export default function AdminHomePage() {
  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Dashboard" />
      <AdminDashboard />
    </div>
  );
}
