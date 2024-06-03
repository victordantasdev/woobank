import Header from "@/components/header"
import SideBar from "@/components/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <SideBar />

      <div className="ml-80">{children}</div>
    </main>
  )
}
