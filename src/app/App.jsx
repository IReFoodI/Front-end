import { FinancePage } from "@/domains/dashboard/FinancePage"
import { HeaderDashboar } from "@/domains/dashboard/HeaderDashboard"
import { SidebarDashboard } from "@/domains/dashboard/SidebarDashboard"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderDashboar />
      <div className="flex flex-grow">
        <SidebarDashboard />
        <FinancePage />
      </div>
    </div>
  )
}

export default App
