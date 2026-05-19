export interface PortfolioCard {
  avatar: string
  achievement: string
  name: string
  school: string
  story: string
  lessons: number
  duration: string
}

export const portfolioCards: PortfolioCard[] = [
  {
    avatar: 'https://i.pravatar.cc/120?img=5',
    achievement: '🏆 เหรียญทอง',
    name: 'น.ส. สุดา ใจดี',
    school: 'ม.3 โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย',
    story: 'คว้าเหรียญทองการแข่งขันคณิตศาสตร์โอลิมปิกระดับชาติ ปี 2024',
    lessons: 120,
    duration: '6 เดือน',
  },
  {
    avatar: 'https://i.pravatar.cc/120?img=8',
    achievement: '⭐ 100 คะแนน',
    name: 'ด.ช. อรรถพล ขยัน',
    school: 'ม.6 โรงเรียนเตรียมอุดมศึกษา',
    story: 'ได้คะแนนเต็ม 100 คะแนนในข้อสอบ A-Level คณิตศาสตร์ติดตรงจุฬาฯ',
    lessons: 200,
    duration: '1 ปี',
  },
  {
    avatar: 'https://i.pravatar.cc/120?img=10',
    achievement: '🎯 ชนะเลิศ',
    name: 'น.ส. มาลี สดใส',
    school: 'ป.6 โรงเรียนสาธิตละอออุทิศ',
    story: 'ชนะเลิศอันดับ 1 การแข่งขัน Math 24 Challenge ระดับประเทศ',
    lessons: 80,
    duration: '4 เดือน',
  },
  {
    avatar: 'https://i.pravatar.cc/120?img=12',
    achievement: '🎓 ทุนการศึกษา',
    name: 'ด.ญ. วิมล เรียนดี',
    school: 'ม.3 โรงเรียนมหิดลวิทยานุสรณ์',
    story: 'ได้รับทุนการศึกษาเต็มจำนวนจากมหาวิทยาลัยชั้นนำในประเทศ',
    lessons: 150,
    duration: '8 เดือน',
  },
  {
    avatar: 'https://i.pravatar.cc/120?img=15',
    achievement: '🥈 เหรียญเงิน',
    name: 'ด.ช. สมชาย พยายาม',
    school: 'ม.1 โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ',
    story: 'คว้าเหรียญเงินการแข่งขันคณิตศาสตร์ระดับภาคกลาง',
    lessons: 90,
    duration: '5 เดือน',
  },
  {
    avatar: 'https://i.pravatar.cc/120?img=18',
    achievement: '🔥 Top 10',
    name: 'น.ส. น้ำฝน เก่ง',
    school: 'ม.5 โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย',
    story: 'ติด Top 10 ระดับประเทศในข้อสอบ PAT 1 คณิตศาสตร์',
    lessons: 180,
    duration: '10 เดือน',
  },
]
