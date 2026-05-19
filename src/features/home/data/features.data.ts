export interface FeatureCard {
  icon: string
  title: string
  description: string
  hoverItems: string[]
}

export const featureCards: FeatureCard[] = [
  {
    icon: 'fa-robot',
    title: 'AI Tutor ส่วนตัว',
    description: 'ปรับการเรียนตามระดับของคุณ พร้อมแนะนำเนื้อหาที่เหมาะสม',
    hoverItems: [
      'วิเคราะห์จุดอ่อน-จุดแข็ง',
      'แนะนำบทเรียนที่เหมาะสม',
      'ติดตามความก้าวหน้า',
    ],
  },
  {
    icon: 'fa-gamepad2',
    title: 'เกมส์คณิตศาสตร์',
    description: 'เรียนรู้ผ่านเกมส์สนุกๆ พร้อมแข่งขันกับเพื่อน',
    hoverItems: [
      'Math 24 Challenge',
      'Speed Calculate',
      'Leaderboard ระดับประเทศ',
    ],
  },
  {
    icon: 'fa-chalkboard-teacher',
    title: 'คลาสสดกับครูตัวจริง',
    description: 'เรียนสดกับครูผู้เชี่ยวชาญ ถามตอบได้ทันที',
    hoverItems: [
      'Interactive Whiteboard',
      'Screen Sharing',
      'บันทึกคลาสย้อนหลัง',
    ],
  },
  {
    icon: 'fa-chart-line',
    title: 'Progress Tracking',
    description: 'ติดตามพัฒนาการแบบ Real-time พร้อมรายงานละเอียด',
    hoverItems: [
      'Dashboard แบบ Interactive',
      'รายงานส่งผู้ปกครอง',
      'Achievement System',
    ],
  },
]
