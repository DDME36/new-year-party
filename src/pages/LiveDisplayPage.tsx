import { useState, useEffect } from 'react'
import { useGuests } from '../App'

const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4', '#ff8c42']

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      isCircle: Math.random() > 0.5,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 6,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.left}%`,
          top: '-30px',
          width: p.size,
          height: p.size,
          backgroundColor: p.color,
          borderRadius: p.isCircle ? '50%' : '0',
          animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

function CelebrationScreen() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[#fffbf0]">
      <Confetti />
      <div className={`text-center z-10 transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <h1 className="font-display text-[8vw] font-bold mb-2 text-[#2d2d2d]">HAPPY</h1>
        <h2 className="text-[4vw] font-medium text-[#ff6b9d] mb-2">สวัสดีปีใหม่</h2>
        <p className="font-display text-[15vw] font-bold text-[#ffd93d] leading-none" style={{ textShadow: '6px 6px 0 #2d2d2d' }}>2026</p>
        <p className="text-[2.5vw] text-[#666] mt-8">เริ่มงานเฉลิมฉลองกันเลย!</p>
      </div>
    </div>
  )
}

export default function LiveDisplayPage() {
  const { guests } = useGuests()
  const checkedIn = guests.filter(g => g.checked_in)
  const pending = guests.filter(g => !g.checked_in)
  const allArrived = guests.length > 0 && pending.length === 0
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer) }, [])

  if (allArrived) return <CelebrationScreen />

  const progress = guests.length > 0 ? (checkedIn.length / guests.length) * 100 : 0

  return (
    <div className="h-screen w-screen p-[2vw] bg-[#fffbf0] relative overflow-hidden">
      {/* Memphis shapes - animated */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[5vw] h-[5vw] rounded-full bg-[#ff6b9d] top-[5%] left-[2%] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[4vw] h-[4vw] rounded-full bg-[#ffd93d] top-[10%] right-[3%] animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[6vw] h-[6vw] rounded-full border-[0.5vw] border-[#9b5de5] bottom-[8%] left-[3%] animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute w-[3vw] h-[3vw] bg-[#6bcb77] bottom-[15%] right-[2%] rotate-45 animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute w-[2.5vw] h-[2.5vw] rounded-full bg-[#4ecdc4] top-[45%] left-[1%] animate-bounce" style={{ animationDuration: '3.5s' }} />
        <div className="absolute w-[4vw] h-[4vw] rounded-full border-[0.4vw] border-[#ff8c42] top-[60%] right-[2%] animate-spin" style={{ animationDuration: '15s' }} />
        <div className="absolute w-[3vw] h-[3vw] rounded-full bg-[#ff6b9d] bottom-[35%] left-[92%] animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute w-[5vw] h-[5vw] rounded-full border-[0.4vw] border-[#ffd93d] top-[75%] left-[6%] animate-bounce" style={{ animationDuration: '5s' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-[1.5vw]">
          <div>
            <h1 className="font-display text-[3.5vw] font-bold text-[#2d2d2d] leading-none">PARTY 2026</h1>
            <p className="text-[#666] text-[1.2vw]">53 หมู่ 2 ต.ร่องกาศ อ.สูงเม่น จ.แพร่</p>
          </div>
          <div className="text-right">
            <p className="font-display text-[5vw] font-bold text-[#ff6b9d] leading-none">{currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            <p className="text-[#666] text-[1.2vw]">{currentTime.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-[1vw] p-[1.2vw] mb-[1.5vw] border-[0.2vw] border-[#2d2d2d]">
          <div className="flex items-center justify-between mb-[0.8vw]">
            <span className="text-[#666] font-medium text-[1.5vw]">แขกมาถึงแล้ว</span>
            <span className="font-bold text-[2vw]">{checkedIn.length} / {guests.length}</span>
          </div>
          <div className="h-[1vw] bg-[#eee] rounded-full overflow-hidden">
            <div className="h-full bg-[#6bcb77] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Guest Lists */}
        <div className="flex-1 grid grid-cols-2 gap-[1.5vw] min-h-0">
          {/* Checked In */}
          <div className="bg-white rounded-[1vw] p-[1.2vw] border-[0.2vw] border-[#6bcb77] overflow-hidden flex flex-col">
            <div className="flex items-center gap-[0.5vw] mb-[1vw] flex-shrink-0">
              <div className="w-[1vw] h-[1vw] rounded-full bg-[#6bcb77] animate-pulse" />
              <h2 className="font-bold text-[1.8vw] text-[#6bcb77]">มาถึงแล้ว ({checkedIn.length})</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {checkedIn.length === 0 ? (
                <p className="text-[#999] text-center text-[1.5vw] py-[3vw]">รอแขกมาถึง...</p>
              ) : (
                <div className="grid grid-cols-3 gap-[0.8vw]">
                  {checkedIn.map((guest) => (
                    <div key={guest.id} className="flex items-center gap-[0.6vw] p-[0.8vw] bg-[#6bcb77]/10 rounded-[0.6vw]">
                      <div className="w-[2.5vw] h-[2.5vw] rounded-full bg-[#6bcb77] text-white flex items-center justify-center font-bold text-[1.2vw] flex-shrink-0">
                        {guest.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-[1.3vw] truncate">{guest.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-[1vw] p-[1.2vw] border-[0.2vw] border-[#ffd93d] overflow-hidden flex flex-col">
            <div className="flex items-center gap-[0.5vw] mb-[1vw] flex-shrink-0">
              <div className="w-[1vw] h-[1vw] rounded-full bg-[#ffd93d]" />
              <h2 className="font-bold text-[1.8vw] text-[#666]">รอเข้างาน ({pending.length})</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {pending.length === 0 ? (
                <p className="text-[#6bcb77] text-center text-[1.5vw] py-[3vw] font-bold">แขกมาครบแล้ว!</p>
              ) : (
                <div className="grid grid-cols-3 gap-[0.8vw]">
                  {pending.map((guest) => {
                    const color = colors[guests.indexOf(guest) % colors.length]
                    return (
                      <div key={guest.id} className="flex items-center gap-[0.6vw] p-[0.8vw] bg-gray-50 rounded-[0.6vw] opacity-60">
                        <div className="w-[2.5vw] h-[2.5vw] rounded-full text-white flex items-center justify-center font-bold text-[1.2vw] flex-shrink-0" style={{ backgroundColor: color }}>
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[1.3vw] truncate text-[#666]">{guest.name}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Almost there banner */}
        {pending.length > 0 && pending.length <= 5 && (
          <div className="absolute bottom-[2vw] left-1/2 -translate-x-1/2 bg-[#ffd93d] px-[2vw] py-[1vw] rounded-full border-[0.2vw] border-[#2d2d2d]">
            <p className="font-bold text-[1.5vw]">ใกล้ครบแล้ว! รออีก {pending.length} คน</p>
          </div>
        )}
      </div>
    </div>
  )
}
