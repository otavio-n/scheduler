import PageHeader from "@/components/PageHeader";
import SidebarCustomer from "@/components/SidebarCustomer";
import AccountForm from "@/components/AccountForm";
import { CUSTOMER } from "@/data/customer.mock";

export default function LogsPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f5f2]">
      <SidebarCustomer />

      <main className="flex-1 p-8">
        <PageHeader
          title="Minha conta"
          subtitle="Ajuste informações da sua conta de forma simples"
        />

        <AccountForm initialData={CUSTOMER} />
      </main>
    </div>
  );
}
