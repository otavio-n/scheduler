import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import CustomersTable from "@/components/tables/CustomersTable";

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f5f2]">
      <Sidebar />

      <main className="flex-1 p-8">
        <PageHeader title="Clientes" subtitle="Overview de todos os clientes" />

        <CustomersTable />
      </main>
    </div>
  );
}
