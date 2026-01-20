import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import LogsTable from "@/components/tables/LogsTable";

export default function LogsPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f5f2]">
      <Sidebar />

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
