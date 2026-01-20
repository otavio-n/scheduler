import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import SchedulesTableCustomer from "@/components/SchedulesTableCustomer";
import SidebarCustomer from "@/components/SidebarCustomer";

export default function SchedulesPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f5f2]">
      <SidebarCustomer />

      <main className="flex-1 p-8">
        <PageHeader
          title="Agendamentos"
          subtitle="Acompanhe todos os agendamentos de clientes de forma simples"
        />

        <SchedulesTableCustomer />
      </main>
    </div>
  );
}
