import PageHeader from "@/components/PageHeader";
import LogsTable from "@/components/tables/LogsTable";
import SidebarCustomer from "@/components/SidebarCustomer";

export default function LogsPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f5f2]">
      <SidebarCustomer />

      <main className="flex-1 p-8">
        <PageHeader
          title="Logs"
          subtitle="Acompanhe todas as logs de clientes"
        />

        <LogsTable />
      </main>
    </div>
  );
}
