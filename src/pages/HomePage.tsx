import { Link } from 'react-router-dom'
import { useGuests } from '../App'
import MemphisBackground from '../components/MemphisBackground'

const EVENT_DETAILS = {
  date: '31 ธันวาคม 2568',
  time: '18.00 น.',
  venue: 'บ้านย่า พ้องพาน',
  address: '53 หมู่ 2 ตำบลนาจักร อำเภอเมือง จังหวัดแพร่ 54000',
  googleMapsUrl: 'https://maps.app.goo.gl/cVaKZXAufKvJDq4o6',
  appleMapsUrl: 'https://maps.apple.com/place?coordinate=18.102027,100.137271&name=52%20Ban%20Rong%20Kat%20Nuea-Na%20Chak%20Road&map=explore',
}

export default function HomePage() {
  const { guests } = useGuests()
  const checkedIn = guests.filter(g => g.checkedIn).length

  return (
    <div className="min-h-screen relative">
      <MemphisBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-10 z-10">
        <div className="text-center w-full max-w-4xl mx-auto">
          <div className="badge badge-pink mb-4 sm:mb-6 text-xs sm:text-sm">ขอเรียนเชิญร่วมงาน</div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-2 text-[#2d2d2d]">PARTY</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4">ฉลองปีใหม่</h2>
          <p className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#ff6b9d] text-shadow mb-6 sm:mb-8">2026</p>
          
          <p className="text-[#666] text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl mx-auto mb-8 sm:mb-12 px-4">
            มาร่วมส่งท้ายปีเก่าต้อนรับปีใหม่ไปด้วยกัน สร้างความทรงจำดีๆ ที่จะไม่มีวันลืม
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/register" className="btn-primary text-base sm:text-lg w-full sm:w-auto">ลงทะเบียนเข้าร่วม</Link>
            <Link to="/board" className="btn-secondary text-base sm:text-lg w-full sm:w-auto">ดูรายชื่อแขก</Link>
          </div>
          
          <div className="mt-10 sm:mt-16 flex justify-center gap-4 sm:gap-8">
            <div className="card px-4 sm:px-8 py-3 sm:py-4">
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff6b9d]">{guests.length}</p>
              <p className="text-[#666] text-xs sm:text-sm">ลงทะเบียนแล้ว</p>
            </div>
            <div className="card px-4 sm:px-8 py-3 sm:py-4">
              <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#6bcb77]">{checkedIn}</p>
              <p className="text-[#666] text-xs sm:text-sm">มาถึงแล้ว</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Details */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center">รายละเอียดงาน</h2>
          <p className="text-[#666] text-center mb-8 sm:mb-12 text-sm sm:text-base">ข้อมูลที่คุณต้องรู้</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="card text-center p-4 sm:p-5" style={{ borderColor: '#ff6b9d' }}>
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#ff6b9d] flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1">วันที่</h3>
              <p className="text-[#666] text-xs sm:text-base">{EVENT_DETAILS.date}</p>
            </div>
            <div className="card text-center p-4 sm:p-5" style={{ borderColor: '#ffd93d' }}>
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#ffd93d] flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-[#2d2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1">เวลาเริ่มงาน</h3>
              <p className="text-[#666] text-xs sm:text-base">{EVENT_DETAILS.time}</p>
            </div>
            <div className="card text-center p-4 sm:p-5" style={{ borderColor: '#6bcb77' }}>
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#6bcb77] flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1">สถานที่</h3>
              <p className="text-[#666] text-xs sm:text-base">{EVENT_DETAILS.venue}</p>
            </div>
            <div className="card text-center p-4 sm:p-5" style={{ borderColor: '#9b5de5' }}>
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#9b5de5] flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1">ที่อยู่</h3>
              <p className="text-[#666] text-xs sm:text-sm mb-2 sm:mb-3">{EVENT_DETAILS.address}</p>
              <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
                <a href={EVENT_DETAILS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="badge badge-green text-[10px] sm:text-xs">Google Maps</a>
                <a href={EVENT_DETAILS.appleMapsUrl} target="_blank" rel="noopener noreferrer" className="badge badge-purple text-[10px] sm:text-xs">Apple Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">พร้อมร่วมงานหรือยัง?</h2>
          <p className="text-[#666] text-base sm:text-lg mb-6 sm:mb-8">ลงทะเบียนตอนนี้เพื่อร่วมเฉลิมฉลองไปด้วยกัน</p>
          <Link to="/register" className="btn-primary text-base sm:text-lg inline-block">ลงทะเบียนเข้าร่วมงาน</Link>
        </div>
      </section>
      
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t-2 border-[#eee] relative z-10">
        <p className="text-center text-[#666] text-sm">งานฉลองปีใหม่ 2026</p>
      </footer>
    </div>
  )
}
