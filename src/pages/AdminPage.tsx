import { useState } from 'react'
import { useGuests } from '../App'
import MemphisBackground from '../components/MemphisBackground'

const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4', '#ff8c42']

export default function AdminPage() {
  const { guests, checkInGuest, uncheckGuest, deleteGuest, addGuest } = useGuests()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [quickAddName, setQuickAddName] = useState('')
  
  const checkedIn = guests.filter(g => g.checkedIn).length
  const pending = guests.length - checkedIn
  const progress = guests.length > 0 ? (checkedIn / guests.length) * 100 : 0

  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const sortedGuests = [...filteredGuests].sort((a, b) => {
    if (a.checkedIn && !b.checkedIn) return 1
    if (!a.checkedIn && b.checkedIn) return -1
    return a.name.localeCompare(b.name)
  })

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (quickAddName.trim()) { addGuest(quickAddName); setQuickAddName('') }
  }

  const formatTime = (isoString: string) => new Date(isoString).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative">
      <MemphisBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">ADMIN</h1>
            <p className="text-[#666] mt-1">จัดการแขกและเช็คอิน</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => guests.forEach(g => { if (!g.checkedIn) checkInGuest(g.id) })} disabled={pending === 0}
              className="btn-primary disabled:opacity-50">เช็คอินทั้งหมด</button>
            <button onClick={() => guests.forEach(g => { if (g.checkedIn) uncheckGuest(g.id) })} disabled={checkedIn === 0}
              className="btn-secondary disabled:opacity-50">รีเซ็ต</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card" style={{ borderColor: '#ff6b9d' }}><p className="text-[#666] mb-1">ลงทะเบียน</p><p className="font-display text-3xl font-bold text-[#ff6b9d]">{guests.length}</p></div>
          <div className="card" style={{ borderColor: '#6bcb77' }}><p className="text-[#666] mb-1">เช็คอินแล้ว</p><p className="font-display text-3xl font-bold text-[#6bcb77]">{checkedIn}</p></div>
          <div className="card" style={{ borderColor: '#ffd93d' }}><p className="text-[#666] mb-1">รอเข้างาน</p><p className="font-display text-3xl font-bold text-[#ffd93d]">{pending}</p></div>
          <div className="card" style={{ borderColor: '#9b5de5' }}><p className="text-[#666] mb-1">ความคืบหน้า</p><p className="font-display text-3xl font-bold text-[#9b5de5]">{Math.round(progress)}%</p></div>
        </div>
        
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#666]">ความคืบหน้าการเช็คอิน</span>
            <span className="font-semibold">{checkedIn} / {guests.length}</span>
          </div>
          <div className="h-4 bg-[#eee] rounded-full overflow-hidden border-2 border-[#2d2d2d]">
            <div className="h-full bg-[#6bcb77] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          {progress === 100 && guests.length > 0 && <p className="text-[#6bcb77] text-center mt-4 font-semibold">แขกมาครบแล้ว เริ่มงานได้เลย!</p>}
        </div>

        <div className="card mb-6">
          <h3 className="font-semibold text-lg mb-3">เพิ่มแขกด่วน</h3>
          <form onSubmit={handleQuickAdd} className="flex gap-3">
            <input type="text" value={quickAddName} onChange={(e) => setQuickAddName(e.target.value)} placeholder="ชื่อเล่น..." className="input-field flex-1" />
            <button type="submit" disabled={!quickAddName.trim()} className="btn-primary px-8 disabled:opacity-50">เพิ่ม</button>
          </form>
        </div>
        
        <div className="mb-6">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ค้นหาแขก..." className="input-field" />
        </div>
        
        {guests.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-[#666] text-lg">ยังไม่มีแขกลงทะเบียน</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedGuests.map((guest) => {
              const color = colors[guests.indexOf(guest) % colors.length]
              return (
                <div key={guest.id} className="card flex items-center gap-4" style={{ borderColor: guest.checkedIn ? '#6bcb77' : color }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: guest.checkedIn ? '#6bcb77' : color }}>
                    {guest.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{guest.name}</h3>
                    <p className="text-sm text-[#999]">ลงทะเบียน {formatTime(guest.registeredAt)}{guest.checkedIn && <span className="text-[#6bcb77] ml-2">• มาถึง {formatTime(guest.checkedInAt!)}</span>}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {guest.checkedIn ? (
                      <button onClick={() => uncheckGuest(guest.id)} className="btn-secondary py-2 px-4 text-sm">ยกเลิก</button>
                    ) : (
                      <button onClick={() => checkInGuest(guest.id)} className="btn-primary py-2 px-4 text-sm">เช็คอิน</button>
                    )}
                    {showDeleteConfirm === guest.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => { deleteGuest(guest.id); setShowDeleteConfirm(null) }} className="px-3 py-2 rounded-full bg-red-500 text-white text-sm font-medium border-2 border-[#2d2d2d]">ยืนยัน</button>
                        <button onClick={() => setShowDeleteConfirm(null)} className="btn-secondary py-2 px-3 text-sm">ยกเลิก</button>
                      </div>
                    ) : (
                      <button onClick={() => setShowDeleteConfirm(guest.id)} className="p-2 rounded-full hover:bg-red-100 text-[#999] hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {filteredGuests.length === 0 && guests.length > 0 && <div className="card text-center py-8"><p className="text-[#666]">ไม่พบแขกที่ค้นหา</p></div>}
      </div>
    </div>
  )
}
