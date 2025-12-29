import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import BoardPage from './pages/BoardPage'
import AdminPage from './pages/AdminPage'
import LiveDisplayPage from './pages/LiveDisplayPage'

interface Guest {
  id: string
  name: string
  registeredAt: string
  checkedIn: boolean
  checkedInAt?: string
}

interface GuestContextType {
  guests: Guest[]
  addGuest: (name: string) => void
  checkInGuest: (id: string) => void
  uncheckGuest: (id: string) => void
  deleteGuest: (id: string) => void
}

const GuestContext = createContext<GuestContextType | null>(null)

export const useGuests = () => {
  const context = useContext(GuestContext)
  if (!context) throw new Error('useGuests must be used within GuestProvider')
  return context
}

function GuestProvider({ children }: { children: React.ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem('new-year-guests')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Validate data structure
        if (Array.isArray(parsed)) {
          return parsed.filter(g => g && typeof g.id === 'string' && typeof g.name === 'string')
        }
      }
    } catch (e) {
      console.error('Error loading guests from localStorage:', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem('new-year-guests', JSON.stringify(guests))
    } catch (e) {
      console.error('Error saving guests to localStorage:', e)
    }
  }, [guests])

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'new-year-guests' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (Array.isArray(parsed)) {
            setGuests(parsed.filter(g => g && typeof g.id === 'string' && typeof g.name === 'string'))
          }
        } catch (e) {
          console.error('Error parsing storage event:', e)
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const addGuest = (name: string) => {
    const trimmedName = name.trim()
    if (!trimmedName) return
    // Check for duplicate names
    if (guests.some(g => g.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert('ชื่อนี้ลงทะเบียนแล้ว')
      return
    }
    setGuests(prev => [...prev, { id: crypto.randomUUID(), name: trimmedName, registeredAt: new Date().toISOString(), checkedIn: false }])
  }
  const checkInGuest = (id: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, checkedIn: true, checkedInAt: new Date().toISOString() } : g))
  }
  const uncheckGuest = (id: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, checkedIn: false, checkedInAt: undefined } : g))
  }
  const deleteGuest = (id: string) => { setGuests(prev => prev.filter(g => g.id !== id)) }

  return <GuestContext.Provider value={{ guests, addGuest, checkInGuest, uncheckGuest, deleteGuest }}>{children}</GuestContext.Provider>
}

function Navigation() {
  const location = useLocation()
  const { guests } = useGuests()
  const checkedIn = guests.filter(g => g.checkedIn).length
  const [menuOpen, setMenuOpen] = useState(false)

  if (location.pathname === '/live') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass bg-[#fffbf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold text-[#2d2d2d]">PARTY 2026</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-[#ff6b9d]' : 'text-[#666] hover:text-[#2d2d2d]'}`}>หน้าแรก</Link>
            <Link to="/register" className={`text-sm font-medium transition-colors ${location.pathname === '/register' ? 'text-[#ff6b9d]' : 'text-[#666] hover:text-[#2d2d2d]'}`}>ลงทะเบียน</Link>
            <Link to="/board" className={`text-sm font-medium transition-colors ${location.pathname === '/board' ? 'text-[#ff6b9d]' : 'text-[#666] hover:text-[#2d2d2d]'}`}>รายชื่อ</Link>
            <div className="ml-2 px-3 py-1 rounded-full bg-[#ffd93d] text-[#2d2d2d] text-sm font-semibold border-2 border-[#2d2d2d]">{checkedIn}/{guests.length}</div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="px-2.5 py-1 rounded-full bg-[#ffd93d] text-[#2d2d2d] text-xs font-semibold border-2 border-[#2d2d2d]">{checkedIn}/{guests.length}</div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-[#2d2d2d]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t-2 border-[#eee] flex flex-col gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className={`py-2 px-3 rounded-lg font-medium ${location.pathname === '/' ? 'bg-[#ff6b9d]/10 text-[#ff6b9d]' : 'text-[#666]'}`}>หน้าแรก</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className={`py-2 px-3 rounded-lg font-medium ${location.pathname === '/register' ? 'bg-[#ff6b9d]/10 text-[#ff6b9d]' : 'text-[#666]'}`}>ลงทะเบียน</Link>
            <Link to="/board" onClick={() => setMenuOpen(false)} className={`py-2 px-3 rounded-lg font-medium ${location.pathname === '/board' ? 'bg-[#ff6b9d]/10 text-[#ff6b9d]' : 'text-[#666]'}`}>รายชื่อ</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <HashRouter>
      <GuestProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/live" element={<LiveDisplayPage />} />
        </Routes>
      </GuestProvider>
    </HashRouter>
  )
}

export default App
