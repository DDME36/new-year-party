import { useState, useEffect } from 'react'
import { useGuests } from '../App'

const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4', '#ff8c42']

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 8,
      rotate: Math.random() * 360,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.left}%`,
          top: '-40px',
          width: p.size,
          height: p.size,
          backgroundColor: p.shape !== 2 ? p.color : 'transparent',
          borderRadius: p.shape === 0 ? '50%' : '0',
          borderLeft: p.shape === 2 ? `${p.size/2}px solid transparent` : undefined,
          borderRight: p.shape === 2 ? `${p.size/2}px solid transparent` : undefined,
          borderBottom: p.shape === 2 ? `${p.size}px solid ${p.color}` : undefined,
          animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
    </div>
  )
}

function CelebrationScreen() {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 300) }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[#fffbf0] p-[4vw]">
      <Confetti />
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[30vw] h-[30vw] rounded-full bg-[#ff6b9d]/20 -top-[8vw] -left-[8vw] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[25vw] h-[25vw] rounded-full bg-[#ffd93d]/20 -bottom-[5vw] -right-[5vw] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[20vw] h-[20vw] rounded-full bg-[#6bcb77]/20 top-[20%] right-[10%] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>
      <div className={`text-center z-10 transition-all duration-1000 max-w-full ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className="mb-2 animate-bounce" style={{ animationDuration: '2s' }}>
          <span className="inline-block text-[3vw]">🎉</span>
        </div>
        <h1 className="font-display text-[8vw] font-bold mb-1 text-[#2d2d2d] tracking-tight">HAPPY</h1>
        <h2 className="text-[4vw] font-medium text-[#ff6b9d] mb-2">สวัสดีปีใหม่</h2>
        <p className="font-display text-[14vw] font-bold leading-none" style={{ 
          background: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 50%, #6bcb77 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(6px 6px 0 #2d2d2d)'
        }}>2026</p>
        <p className="text-[2vw] text-[#666] mt-4 font-medium">มาครบแล้ว เริ่มงานเฉลิมฉลองกันเลย!</p>
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
  const showBanner = pending.length > 0

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer) }, [])

  if (allArrived) return <CelebrationScreen />

  const progress = guests.length > 0 ? (checkedIn.length / guests.length) * 100 : 0
  
  // จำกัดจำนวนที่แสดงให้พอดีหน้าจอ
  const maxDisplay = 12
  const displayCheckedIn = checkedIn.slice(0, maxDisplay)
  const displayPending = pending.slice(0, maxDisplay)
  const moreCheckedIn = checkedIn.length - maxDisplay
  const morePending = pending.length - maxDisplay

  return (
    <div className="h-screen w-screen bg-[#fffbf0] relative overflow-hidden">
      {/* Memphis shapes - animated */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[20vw] h-[20vw] rounded-full bg-[#ff6b9d]/10 -top-[5vw] -left-[5vw]" />
        <div className="absolute w-[15vw] h-[15vw] rounded-full bg-[#ffd93d]/10 -bottom-[3vw] -right-[3vw]" />
        <div className="absolute w-[4vw] h-[4vw] rounded-full bg-[#ff6b9d] top-[8%] left-[3%] animate-pulse shadow-lg" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[3vw] h-[3vw] rounded-full bg-[#ffd93d] top-[12%] right-[4%] animate-bounce shadow-lg" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[5vw] h-[5vw] rounded-full border-[0.4vw] border-[#9b5de5] bottom-[10%] left-[4%] animate-spin" style={{ animationDuration: '25s' }} />
        <div className="absolute w-[2.5vw] h-[2.5vw] bg-[#6bcb77] bottom-[18%] right-[3%] rotate-45 animate-pulse shadow-lg" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col p-[2vw]" style={{ paddingBottom: showBanner ? '6vw' : '2vw' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-[1.5vw] flex-shrink-0">
          <div>
            <h1 className="font-display text-[4vw] font-bold leading-none" style={{ 
              background: 'linear-gradient(135deg, #ff6b9d 0%, #9b5de5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>PARTY 2026</h1>
            <p className="text-[#666] text-[1.2vw] mt-[0.3vw]">บ้านย่า พ้องพาน</p>
          </div>
          <div className="text-right">
            <p className="font-display text-[5vw] font-bold leading-none" style={{ 
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff8c42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>{currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            <p className="text-[#666] text-[1.2vw]">{currentTime.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-[1.2vw] p-[1.5vw] mb-[1.5vw] border-[0.25vw] border-[#2d2d2d] shadow-[0.4vw_0.4vw_0_#2d2d2d] flex-shrink-0">
          <div className="flex items-center justify-between mb-[1vw]">
            <div className="flex items-center gap-[1vw]">
              <div className="w-[3vw] h-[3vw] rounded-full bg-[#6bcb77] flex items-center justify-center">
                <svg className="w-[1.5vw] h-[1.5vw] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#2d2d2d] font-bold text-[1.8vw]">แขกมาถึงแล้ว</span>
            </div>
            <div className="flex items-baseline gap-[0.5vw]">
              <span className="font-display font-bold text-[3.5vw] text-[#6bcb77]">{checkedIn.length}</span>
              <span className="text-[#666] text-[1.5vw]">/ {guests.length} คน</span>
            </div>
          </div>
          <div className="h-[1.2vw] bg-[#eee] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6bcb77 0%, #4ecdc4 100%)'
            }} />
          </div>
        </div>

        {/* Guest Lists */}
        <div className="flex-1 grid grid-cols-2 gap-[1.5vw] min-h-0">
          {/* Checked In */}
          <div className="bg-white rounded-[1.2vw] p-[1.2vw] border-[0.25vw] border-[#6bcb77] shadow-[0.4vw_0.4vw_0_#6bcb77] overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-[1vw] flex-shrink-0">
              <div className="flex items-center gap-[0.6vw]">
                <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-[#6bcb77] animate-pulse" />
                <h2 className="font-bold text-[1.8vw] text-[#6bcb77]">มาถึงแล้ว</h2>
              </div>
              <span className="bg-[#6bcb77] text-white px-[1vw] py-[0.3vw] rounded-full font-bold text-[1.2vw]">{checkedIn.length}</span>
            </div>
            <div className="flex-1 overflow-hidden min-h-0">
              {checkedIn.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-[#999] text-[1.5vw]">รอแขกมาถึง...</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-[0.5vw] content-start">
                  {displayCheckedIn.map((guest, index) => {
                    const color = colors[index % colors.length]
                    return (
                      <div key={guest.id} className="p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#2d2d2d] bg-white" style={{ boxShadow: `0.15vw 0.15vw 0 ${color}` }}>
                        <div className="flex items-center gap-[0.4vw]">
                          <div className="w-[2vw] h-[2vw] rounded-full text-white flex items-center justify-center font-bold text-[0.9vw] flex-shrink-0" style={{ backgroundColor: color }}>
                            {guest.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-[0.9vw] truncate text-[#2d2d2d]">{guest.name}</span>
                        </div>
                      </div>
                    )
                  })}
                  {moreCheckedIn > 0 && (
                    <div className="p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#6bcb77] bg-[#6bcb77]/10 flex items-center justify-center">
                      <span className="font-bold text-[0.9vw] text-[#6bcb77]">+{moreCheckedIn}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-[1.2vw] p-[1.2vw] border-[0.25vw] border-[#ffd93d] shadow-[0.4vw_0.4vw_0_#ffd93d] overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-[1vw] flex-shrink-0">
              <div className="flex items-center gap-[0.6vw]">
                <div className="w-[1.2vw] h-[1.2vw] rounded-full bg-[#ffd93d]" />
                <h2 className="font-bold text-[1.8vw] text-[#2d2d2d]">รอเข้างาน</h2>
              </div>
              <span className="bg-[#ffd93d] text-[#2d2d2d] px-[1vw] py-[0.3vw] rounded-full font-bold text-[1.2vw]">{pending.length}</span>
            </div>
            <div className="flex-1 overflow-hidden min-h-0">
              {pending.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-[#6bcb77] text-[1.8vw] font-bold">แขกมาครบแล้ว!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-[0.5vw] content-start">
                  {displayPending.map((guest, index) => {
                    const color = colors[(index + 3) % colors.length]
                    return (
                      <div key={guest.id} className="p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-dashed border-[#ccc] bg-[#fafafa] opacity-60">
                        <div className="flex items-center gap-[0.4vw]">
                          <div className="w-[2vw] h-[2vw] rounded-full text-white flex items-center justify-center font-bold text-[0.9vw] flex-shrink-0" style={{ backgroundColor: color }}>
                            {guest.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-[0.9vw] truncate text-[#999]">{guest.name}</span>
                        </div>
                      </div>
                    )
                  })}
                  {morePending > 0 && (
                    <div className="p-[0.5vw] rounded-[0.5vw] border-[0.1vw] border-[#ffd93d] bg-[#ffd93d]/10 flex items-center justify-center">
                      <span className="font-bold text-[0.9vw] text-[#666]">+{morePending}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banner - fixed to screen */}
      {showBanner && (
        <div className="fixed bottom-[2vw] left-0 right-0 flex justify-center z-50">
          <div className="bg-gradient-to-r from-[#ffd93d] to-[#ff8c42] px-[3vw] py-[0.8vw] rounded-full border-[0.25vw] border-[#2d2d2d] shadow-[0.3vw_0.3vw_0_#2d2d2d] animate-bounce" style={{ animationDuration: '2s' }}>
            <p className="font-bold text-[1.5vw] text-[#2d2d2d]">
              {pending.length <= 5 ? `ใกล้ครบแล้ว! รออีกแค่ ${pending.length} คน` : `รอแขกอีก ${pending.length} คน`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
