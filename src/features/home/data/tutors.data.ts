export interface TutorStat {
  label: string
  value: string
}

export interface Tutor {
  id: string
  name: string
  nickname: string
  image: string
  smileImage: string
  badge: string
  education: string
  experience: string
  quote: string
  specialties: string[]
  achievements: string[]
  stats: TutorStat[]
}

export const tutors: Tutor[] = [
  {
    id: 'pi-bas',
    name: 'พี่บาส',
    nickname: 'BAS · Head Tutor',
    image: '/img/122.jpg',
    smileImage: '/img/123.png',
    badge: 'Top Tutor 2025',
    education:
      'คณะวิทยาศาสตร์ สาขาคณิตศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย (เกียรตินิยม)',
    experience: 'ประสบการณ์ติวเตอร์มากกว่า 10 ปี · นักเรียน 5,000+ คน',
    quote:
      'คณิตศาสตร์ไม่ใช่เรื่องยาก ถ้าเข้าใจหลักคิด ที่เหลือคือความสนุก',
    specialties: [
      'แคลคูลัส ม.ปลาย',
      'พีชคณิตและตรีโกณมิติ',
      'เตรียมสอบ TCAS / A-Level',
      'ติว สสวท. โอลิมปิก',
    ],
    achievements: [
      'ลูกศิษย์สอบติดคณะแพทย์ วิศวะ ครุศาสตร์ มากกว่า 800 คน',
      'รางวัล Best Math Tutor แห่งปี 2022',
      'วิทยากรพิเศษโรงเรียนชั้นนำทั่วประเทศ',
      'ผู้เขียนชุดหนังสือ "คณิตคิดได้ทันที"',
    ],
    stats: [
      { label: 'ปีประสบการณ์', value: '10+' },
      { label: 'นักเรียน', value: '5,000+' },
      { label: 'พึงพอใจ', value: '98%' },
    ],
  },
]
