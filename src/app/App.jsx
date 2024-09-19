import { AlertSoundSettingsPage } from "@/domains/dashboard/AlertSoundSettingsPage"
// import { FinancePage } from "@/domains/dashboard/FinancePage"
import { HeaderDashboar } from "@/domains/dashboard/HeaderDashboard"
import { SidebarDashboard } from "@/domains/dashboard/SidebarDashboard"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderDashboar />
      <div className="flex flex-grow flex-col lg:flex-row">
        <SidebarDashboard />
        {/* <FinancePage /> */}
        <AlertSoundSettingsPage />
      </div>
    </div>
  )
}

export default App
