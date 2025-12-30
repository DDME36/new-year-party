import { useState } from 'react'

const colors = ['#ff6b9d', '#ffd93d', '#6bcb77', '#9b5de5', '#4ecdc4', '#ff8c42']

function FloatingShape({ color, size, top, left, shape, delay, duration }: {
  color: string, size: number, top: number, left: number, shape: 'circle' | 'square' | 'donut' | 'triangle', delay: number, duration: number
}) {
  const baseStyle = {
    position: 'absolute' as const,
    top: `${top}%`,
    left: `${left}%`,
    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
  }

  if (shape === 'circle') {
    return <div style={{ ...baseStyle, width: size, height: size, borderRadius: '50%', backgroundColor: color }} />
  }
  if (shape === 'square') {
    return <div style={{ ...baseStyle, width: size, height: size, backgroundColor: color, transform: 'rotate(15deg)' }} />
  }
  if (shape === 'donut') {
    return <div style={{ ...baseStyle, width: size, height: size, borderRadius: '50%', border: `${size/5}px solid ${color}`, backgroundColor: 'transparent' }} />
  }
  if (shape === 'triangle') {
    return (
      <div style={{
        ...baseStyle,
        width: 0,
        height: 0,
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
        backgroundColor: 'transparent',
      }} />
    )
  }
  return null
}

export default function OverlayPage() {
  const [shapes] = useState(() => {
    const shapeTypes: ('circle' | 'square' | 'donut' | 'triangle')[] = ['circle', 'square', 'donut', 'triangle']
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 20 + Math.random() * 60,
      top: Math.random() * 100,
      left: Math.random() * 100,
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }))
  })

  return (
    <div className="h-screen w-screen bg-[#fffbf0] relative overflow-hidden">
      {/* CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Large background blobs */}
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-[#ff6b9d]/20 -top-[10vw] -left-[10vw]" style={{ animation: 'pulse-slow 8s ease-in-out infinite' }} />
      <div className="absolute w-[35vw] h-[35vw] rounded-full bg-[#ffd93d]/20 -bottom-[8vw] -right-[8vw]" style={{ animation: 'pulse-slow 6s ease-in-out infinite' }} />
      <div className="absolute w-[30vw] h-[30vw] rounded-full bg-[#6bcb77]/20 top-[60%] -left-[8vw]" style={{ animation: 'pulse-slow 7s ease-in-out infinite' }} />
      <div className="absolute w-[25vw] h-[25vw] rounded-full bg-[#9b5de5]/20 top-[10%] right-[5%]" style={{ animation: 'pulse-slow 9s ease-in-out infinite' }} />

      {/* Floating shapes */}
      {shapes.map(s => (
        <FloatingShape key={s.id} {...s} />
      ))}

      {/* Spinning donuts */}
      <div className="absolute w-[8vw] h-[8vw] rounded-full border-[1vw] border-[#ff6b9d] top-[15%] left-[8%]" style={{ animation: 'spin-slow 20s linear infinite' }} />
      <div className="absolute w-[6vw] h-[6vw] rounded-full border-[0.8vw] border-[#4ecdc4] bottom-[20%] right-[10%]" style={{ animation: 'spin-slow 15s linear infinite reverse' }} />
      <div className="absolute w-[5vw] h-[5vw] rounded-full border-[0.6vw] border-[#ffd93d] top-[70%] left-[85%]" style={{ animation: 'spin-slow 18s linear infinite' }} />

      {/* Squiggly lines */}
      <svg className="absolute top-[30%] left-[5%] w-[10vw] h-[5vw] opacity-40" style={{ animation: 'float 6s ease-in-out infinite' }}>
        <path d="M0,25 Q25,0 50,25 T100,25" stroke="#9b5de5" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute bottom-[25%] right-[8%] w-[8vw] h-[4vw] opacity-40" style={{ animation: 'float 5s ease-in-out 1s infinite' }}>
        <path d="M0,20 Q20,0 40,20 T80,20" stroke="#ff8c42" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>

    </div>
  )
}
