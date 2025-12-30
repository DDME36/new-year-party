import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuests } from '../App'
import MemphisBackground from '../components/MemphisBackground'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addGuest, guests } = useGuests()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    addGuest(name)
    setSuccess(true)
    setName('')
    setTimeout(() => navigate('/board'), 2500)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 relative bg-[#fffbf0]">
        <MemphisBackground />
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="absolute w-3 h-3 sm:w-4 sm:h-4" style={{
              left: `${Math.random() * 100}%`, top: '-20px',
              backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4'][Math.floor(Math.random() * 5)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animation: `confetti-fall ${2 + Math.random() * 2}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }} />
          ))}
        </div>
        <div className="text-center relative z-10 px-4">
          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 rounded-full bg-[#6bcb77] border-3 sm:border-4 border-[#2d2d2d] flex items-center justify-center">
            <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">สำเร็จ!</h1>
          <p className="text-[#666] text-lg sm:text-xl mb-2">ขอบคุณที่ร่วมฉลองกับเรา</p>
          <p className="text-[#999] text-base sm:text-lg">แล้วพบกันในงานปาร์ตี้นะ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative">
      <MemphisBackground />
      <div className="w-full max-w-sm sm:max-w-md relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-2">JOIN US</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-4 text-[#ff6b9d]">ร่วมฉลองปีใหม่ 2026</h2>
          <p className="text-[#666] text-sm sm:text-base">
            {guests.length > 0 ? `มีผู้ลงทะเบียนแล้ว ${guests.length} คน` : 'ลงทะเบียนเพื่อร่วมงานปาร์ตี้'}
          </p>
        </div>
        
        <div className="card p-5 sm:p-6">
          <div className="text-center mb-5 sm:mb-6">
            <span className="badge badge-green text-xs sm:text-sm">เปิดรับลงทะเบียน</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2 sm:mb-3 text-sm sm:text-base">ชื่อเล่น</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="กรอกชื่อเล่นของคุณ" className="input-field text-base" required autoFocus />
            </div>
            
            <button type="submit" disabled={isSubmitting || !name.trim()} className="btn-primary w-full text-base sm:text-lg disabled:opacity-50">
              {isSubmitting ? 'กำลังลงทะเบียน...' : 'ลงทะเบียนเข้าร่วมงาน'}
            </button>
          </form>
          
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t-2 border-[#eee] grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#ff6b9d]">{guests.length}</div>
              <div className="text-[#999] text-xs sm:text-sm">ลงทะเบียนแล้ว</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#6bcb77]">{guests.filter(g => g.checked_in).length}</div>
              <div className="text-[#999] text-xs sm:text-sm">มาถึงแล้ว</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
