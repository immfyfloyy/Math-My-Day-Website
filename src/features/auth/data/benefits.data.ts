export interface SignupBenefit {
  icon: string
  title: string
  description: string
}

export interface SignupStat {
  number: string
  label: string
}

export const signupBenefits: SignupBenefit[] = [
  {
    icon: 'fa-infinity',
    title: 'เข้าถึงคอร์สเรียนไม่จำกัด',
    description: 'เรียนได้ทุกคอร์ส ทุกระดับชั้น ไม่จำกัดเวลา',
  },
  {
    icon: 'fa-robot',
    title: 'AI Tutor ส่วนตัว',
    description: 'ปรับการเรียนตามระดับของคุณด้วย AI',
  },
  {
    icon: 'fa-gamepad',
    title: 'เกมส์คณิตศาสตร์',
    description: 'เล่นเกมส์สนุกๆ พร้อมแข่งขันกับเพื่อน',
  },
  {
    icon: 'fa-certificate',
    title: 'ใบประกาศนียบัตร',
    description: 'รับใบรับรองเมื่อจบคอร์ส',
  },
  {
    icon: 'fa-chart-line',
    title: 'ติดตามความก้าวหน้า',
    description: 'ดูพัฒนาการการเรียนรู้แบบ Real-time',
  },
  {
    icon: 'fa-users',
    title: 'คอมมิวนิตี้นักเรียน',
    description: 'เข้ากลุ่มแชร์ความรู้กับเพื่อนๆ',
  },
]

export const signupStats: SignupStat[] = [
  { number: '50,000+', label: 'นักเรียน' },
  { number: '1,200+', label: 'บทเรียน' },
  { number: '98%', label: 'พึงพอใจ' },
]

export const educationOptions: Array<{ value: string; label: string }> = [
  { value: '', label: '-- เลือกระดับการศึกษา --' },
  { value: 'elementary', label: 'ประถมศึกษา (ป.1-ป.6)' },
  { value: 'junior', label: 'มัธยมศึกษาตอนต้น (ม.1-ม.3)' },
  { value: 'senior', label: 'มัธยมศึกษาตอนปลาย (ม.4-ม.6)' },
  { value: 'government', label: 'สอบ ก.พ.' },
  { value: 'other', label: 'อื่นๆ' },
]
