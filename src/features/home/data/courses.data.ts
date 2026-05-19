export interface CourseLevel {
  icon: string
  title: string
  range: string
  count: string
  featured?: boolean
}

export const courseLevels: CourseLevel[] = [
  {
    icon: 'fa-child',
    title: 'ประถม',
    range: 'ป.1 - ป.6',
    count: '45 คอร์ส',
  },
  {
    icon: 'fa-user-graduate',
    title: 'มัธยมต้น',
    range: 'ม.1 - ม.3',
    count: '82 คอร์ส',
    featured: true,
  },
  {
    icon: 'fa-graduation-cap',
    title: 'มัธยมปลาย',
    range: 'ม.4 - ม.6',
    count: '96 คอร์ส',
    featured: true,
  },
  {
    icon: 'fa-file-alt',
    title: 'สอบ ก.พ.',
    range: 'ติวสอบ ก.พ.',
    count: '28 คอร์ส',
  },
]
