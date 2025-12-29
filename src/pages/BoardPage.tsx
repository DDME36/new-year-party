import { useGuests } from '../App'
import { Link } from 'react-router-dom'
import MemphisBackground from '../components/MemphisBackground'

const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4', '#ff8c42']

export default function BoardPage() {
  const { guests } = useGuests()
  const checkedIn = guests.filter(g => g.checked_in).length
  const pending = guests.length - checkedIn

  const formatTime = (isoString: string) => new Date(isoString).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 relative">
      <MemphisBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">GUESTS</h1>
          <p className="text-[#666] text-sm sm:text-lg">รายชื่อแขกงานปีใหม่ 2026</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12 max-w-xs sm:max-w-lg mx-auto">
          <div className="card text-center p-3 sm:p-4" style={{ borderColor: '#ff6b9d' }}>
            <p className="font-display text-2xl sm:text-4xl font-bold text-[#ff6b9d]">{guests.length}</p>
            <p className="text-[#666] text-xs sm:text-sm">ทั้งหมด</p>
          </div>
          <div className="card text-center p-3 sm:p-4" style={{ borderColor: '#6bcb77' }}>
            <p className="font-display text-2xl sm:text-4xl font-bold text-[#6bcb77]">{checkedIn}</p>
            <p className="text-[#666] text-xs sm:text-sm">มาถึงแล้ว</p>
          </div>
          <div className="card text-center p-3 sm:p-4" style={{ borderColor: '#ffd93d' }}>
            <p className="font-display text-2xl sm:text-4xl font-bold text-[#ffd93d]">{pending}</p>
            <p className="text-[#666] text-xs sm:text-sm">รอเข้างาน</p>
          </div>
        </div>

        {guests.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-[#ffd93d] border-3 sm:border-4 border-[#2d2d2d] flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#2d2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ยังไม่มีแขกลงทะเบียน</h3>
            <p className="text-[#666] mb-4 sm:mb-6 text-sm sm:text-base">เป็นคนแรกที่ลงทะเบียนเลย!</p>
            <Link to="/register" className="btn-primary text-sm sm:text-base">ลงทะเบียนเลย</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {guests.map((guest, index) => {
              const color = colors[index % colors.length]
              return (
                <div key={guest.id} className="card p-3 sm:p-4" style={{ borderColor: guest.checked_in ? '#6bcb77' : color }}>
                  {guest.checked_in && <div className="absolute top-3 right-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#6bcb77]" /></div>}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold text-white flex-shrink-0" style={{ backgroundColor: guest.checked_in ? '#6bcb77' : color }}>
                      {guest.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{guest.name}</h3>
                      <p className="text-[#999] text-xs sm:text-sm">#{index + 1}</p>
                      {guest.checked_in && <p className="text-[#6bcb77] text-xs mt-0.5">มาถึง {formatTime(guest.checked_in_at!)}</p>}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 sm:pt-3 border-t-2 border-[#eee] flex items-center justify-between">
                    <span className="text-[#999] text-[10px] sm:text-xs">{formatTime(guest.registered_at)}</span>
                    <span className={`badge text-[10px] sm:text-xs py-0.5 px-2 ${guest.checked_in ? 'badge-green' : 'badge-yellow'}`}>
                      {guest.checked_in ? 'มาแล้ว' : 'รอ'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Link to="/register" className="btn-secondary text-sm sm:text-base">ลงทะเบียนแขกเพิ่ม</Link>
        </div>
      </div>
    </div>
  )
}
