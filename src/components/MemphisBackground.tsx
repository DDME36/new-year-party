const shapes = [
  { type: 'circle', size: 80, color: '#ff6b9d', top: '10%', left: '5%', delay: 0 },
  { type: 'circle', size: 40, color: '#ffd93d', top: '20%', right: '10%', delay: 1 },
  { type: 'circle', size: 60, color: '#4ecdc4', bottom: '15%', left: '8%', delay: 2 },
  { type: 'donut', size: 100, color: '#9b5de5', top: '40%', right: '5%', delay: 0.5 },
  { type: 'donut', size: 50, color: '#ff8c42', bottom: '30%', right: '15%', delay: 1.5 },
  { type: 'squiggle', size: 70, color: '#6bcb77', top: '60%', left: '3%', delay: 1 },
  { type: 'squiggle', size: 40, color: '#ff6b9d', top: '5%', right: '25%', delay: 2 },
  { type: 'cross', size: 50, color: '#ffd93d', bottom: '10%', right: '8%', delay: 0 },
  { type: 'cross', size: 30, color: '#4ecdc4', top: '30%', left: '12%', delay: 1.5 },
  { type: 'circle', size: 25, color: '#9b5de5', top: '70%', right: '30%', delay: 2.5 },
  { type: 'donut', size: 35, color: '#ff6b9d', top: '85%', left: '20%', delay: 0.8 },
  { type: 'squiggle', size: 55, color: '#ffd93d', bottom: '40%', left: '85%', delay: 1.2 },
]

export default function MemphisBackground() {
  return (
    <div className="memphis-bg">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`shape ${shape.type} animate-float`}
          style={{
            width: shape.size,
            height: shape.size,
            background: shape.type === 'donut' ? 'transparent' : shape.color,
            borderColor: shape.color,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
