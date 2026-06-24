import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
