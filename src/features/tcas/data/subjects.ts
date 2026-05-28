// Subject codes used by myTCAS for Admission (Round 3) score formulas.
// Only the subjects the user is asked to enter are listed here — special
// keys like `cal_*` and `priority_score` are handled by the calculator engine.

export type SubjectKey =
  | 'gpax'
  | 'gpax5_score'
  | 'gpa21'
  | 'gpa22'
  | 'gpa23'
  | 'gpa24'
  | 'gpa25'
  | 'gpa26'
  | 'gpa27'
  | 'gpa28'
  | 'gpa29'
  | 'tgat1'
  | 'tgat2'
  | 'tgat3'
  | 'tpat1'
  | 'tpat11'
  | 'tpat12'
  | 'tpat13'
  | 'tpat2'
  | 'tpat21'
  | 'tpat22'
  | 'tpat23'
  | 'tpat3'
  | 'tpat4'
  | 'tpat5'
  | 'a_lv_61'
  | 'a_lv_62'
  | 'a_lv_63'
  | 'a_lv_64'
  | 'a_lv_65'
  | 'a_lv_66'
  | 'a_lv_70'
  | 'a_lv_81'
  | 'a_lv_82'
  | 'a_lv_83'
  | 'a_lv_84'
  | 'a_lv_85'
  | 'a_lv_86'
  | 'a_lv_87'
  | 'a_lv_88'
  | 'a_lv_89'
  | 'toefl_ibt'
  | 'ielts'
  | 'toeic'
  | 'ged_score'

export interface SubjectMeta {
  key: SubjectKey
  label: string
  shortLabel: string
  maxValue: number
  step: number
  placeholder?: string
}

export const SUBJECTS: Record<SubjectKey, SubjectMeta> = {
  gpax: { key: 'gpax', label: 'GPAX (เกรดเฉลี่ยสะสม 6 ภาคเรียน)', shortLabel: 'GPAX', maxValue: 4, step: 0.01, placeholder: '0.00 - 4.00' },
  gpax5_score: { key: 'gpax5_score', label: 'GPAX 5 ภาคเรียน', shortLabel: 'GPAX5', maxValue: 4, step: 0.01, placeholder: '0.00 - 4.00' },

  gpa21: { key: 'gpa21', label: 'GPA กลุ่มสาระภาษาไทย', shortLabel: 'GPA ไทย', maxValue: 4, step: 0.01 },
  gpa22: { key: 'gpa22', label: 'GPA กลุ่มสาระคณิตศาสตร์', shortLabel: 'GPA คณิต', maxValue: 4, step: 0.01 },
  gpa23: { key: 'gpa23', label: 'GPA กลุ่มสาระวิทยาศาสตร์', shortLabel: 'GPA วิทย์', maxValue: 4, step: 0.01 },
  gpa24: { key: 'gpa24', label: 'GPA กลุ่มสาระสังคมศึกษา', shortLabel: 'GPA สังคม', maxValue: 4, step: 0.01 },
  gpa25: { key: 'gpa25', label: 'GPA กลุ่มสาระสุขศึกษา-พละ', shortLabel: 'GPA สุข-พละ', maxValue: 4, step: 0.01 },
  gpa26: { key: 'gpa26', label: 'GPA กลุ่มสาระศิลปะ', shortLabel: 'GPA ศิลปะ', maxValue: 4, step: 0.01 },
  gpa27: { key: 'gpa27', label: 'GPA กลุ่มสาระการงานอาชีพ', shortLabel: 'GPA การงาน', maxValue: 4, step: 0.01 },
  gpa28: { key: 'gpa28', label: 'GPA กลุ่มสาระภาษาต่างประเทศ', shortLabel: 'GPA ภาษา', maxValue: 4, step: 0.01 },
  gpa29: { key: 'gpa29', label: 'GPA การศึกษาค้นคว้าด้วยตนเอง (IS)', shortLabel: 'GPA IS', maxValue: 4, step: 0.01 },

  tgat1: { key: 'tgat1', label: 'TGAT1 ภาษาอังกฤษ', shortLabel: 'TGAT1', maxValue: 100, step: 0.01 },
  tgat2: { key: 'tgat2', label: 'TGAT2 การคิดอย่างมีเหตุผล', shortLabel: 'TGAT2', maxValue: 100, step: 0.01 },
  tgat3: { key: 'tgat3', label: 'TGAT3 สมรรถนะการทำงาน', shortLabel: 'TGAT3', maxValue: 100, step: 0.01 },

  tpat1: { key: 'tpat1', label: 'TPAT1 ความถนัดแพทย์ (กสพท)', shortLabel: 'TPAT1', maxValue: 100, step: 0.01 },
  tpat11: { key: 'tpat11', label: 'TPAT1.1 เชาวน์ปัญญา', shortLabel: 'TPAT1.1', maxValue: 100, step: 0.01 },
  tpat12: { key: 'tpat12', label: 'TPAT1.2 จริยธรรมทางการแพทย์', shortLabel: 'TPAT1.2', maxValue: 100, step: 0.01 },
  tpat13: { key: 'tpat13', label: 'TPAT1.3 การเชื่อมโยงความหมาย', shortLabel: 'TPAT1.3', maxValue: 100, step: 0.01 },

  tpat2: { key: 'tpat2', label: 'TPAT2 ความถนัดศิลปกรรมศาสตร์', shortLabel: 'TPAT2', maxValue: 100, step: 0.01 },
  tpat21: { key: 'tpat21', label: 'TPAT2.1 ทัศนศิลป์', shortLabel: 'TPAT2.1', maxValue: 100, step: 0.01 },
  tpat22: { key: 'tpat22', label: 'TPAT2.2 ดนตรี', shortLabel: 'TPAT2.2', maxValue: 100, step: 0.01 },
  tpat23: { key: 'tpat23', label: 'TPAT2.3 นาฏศิลป์', shortLabel: 'TPAT2.3', maxValue: 100, step: 0.01 },

  tpat3: { key: 'tpat3', label: 'TPAT3 ความถนัดวิทยาศาสตร์ เทคโนโลยี วิศวกรรม', shortLabel: 'TPAT3', maxValue: 100, step: 0.01 },
  tpat4: { key: 'tpat4', label: 'TPAT4 ความถนัดสถาปัตยกรรม', shortLabel: 'TPAT4', maxValue: 100, step: 0.01 },
  tpat5: { key: 'tpat5', label: 'TPAT5 ความถนัดครุศาสตร์-ศึกษาศาสตร์', shortLabel: 'TPAT5', maxValue: 100, step: 0.01 },

  a_lv_61: { key: 'a_lv_61', label: 'A-Level คณิตศาสตร์ประยุกต์ 1', shortLabel: 'คณิต 1', maxValue: 100, step: 0.01 },
  a_lv_62: { key: 'a_lv_62', label: 'A-Level คณิตศาสตร์ประยุกต์ 2', shortLabel: 'คณิต 2', maxValue: 100, step: 0.01 },
  a_lv_63: { key: 'a_lv_63', label: 'A-Level วิทยาศาสตร์ประยุกต์', shortLabel: 'วิทยาศาสตร์ทั่วไป', maxValue: 100, step: 0.01 },
  a_lv_64: { key: 'a_lv_64', label: 'A-Level ฟิสิกส์', shortLabel: 'ฟิสิกส์', maxValue: 100, step: 0.01 },
  a_lv_65: { key: 'a_lv_65', label: 'A-Level เคมี', shortLabel: 'เคมี', maxValue: 100, step: 0.01 },
  a_lv_66: { key: 'a_lv_66', label: 'A-Level ชีววิทยา', shortLabel: 'ชีววิทยา', maxValue: 100, step: 0.01 },
  a_lv_70: { key: 'a_lv_70', label: 'A-Level สังคมศาสตร์', shortLabel: 'สังคม', maxValue: 100, step: 0.01 },
  a_lv_81: { key: 'a_lv_81', label: 'A-Level ภาษาไทย', shortLabel: 'ไทย', maxValue: 100, step: 0.01 },
  a_lv_82: { key: 'a_lv_82', label: 'A-Level ภาษาอังกฤษ', shortLabel: 'อังกฤษ', maxValue: 100, step: 0.01 },
  a_lv_83: { key: 'a_lv_83', label: 'A-Level ภาษาฝรั่งเศส', shortLabel: 'ฝรั่งเศส', maxValue: 100, step: 0.01 },
  a_lv_84: { key: 'a_lv_84', label: 'A-Level ภาษาเยอรมัน', shortLabel: 'เยอรมัน', maxValue: 100, step: 0.01 },
  a_lv_85: { key: 'a_lv_85', label: 'A-Level ภาษาญี่ปุ่น', shortLabel: 'ญี่ปุ่น', maxValue: 100, step: 0.01 },
  a_lv_86: { key: 'a_lv_86', label: 'A-Level ภาษาเกาหลี', shortLabel: 'เกาหลี', maxValue: 100, step: 0.01 },
  a_lv_87: { key: 'a_lv_87', label: 'A-Level ภาษาจีน', shortLabel: 'จีน', maxValue: 100, step: 0.01 },
  a_lv_88: { key: 'a_lv_88', label: 'A-Level ภาษาบาลี', shortLabel: 'บาลี', maxValue: 100, step: 0.01 },
  a_lv_89: { key: 'a_lv_89', label: 'A-Level ภาษาสเปน', shortLabel: 'สเปน', maxValue: 100, step: 0.01 },

  toefl_ibt: { key: 'toefl_ibt', label: 'TOEFL iBT', shortLabel: 'TOEFL iBT', maxValue: 120, step: 1 },
  ielts: { key: 'ielts', label: 'IELTS', shortLabel: 'IELTS', maxValue: 9, step: 0.5 },
  toeic: { key: 'toeic', label: 'TOEIC', shortLabel: 'TOEIC', maxValue: 990, step: 5 },
  ged_score: { key: 'ged_score', label: 'GED Score (สำหรับผู้เรียนต่างประเทศ)', shortLabel: 'GED', maxValue: 800, step: 5 },
}

export interface SubjectGroup {
  id: string
  title: string
  icon: string
  subjects: SubjectKey[]
  defaultOpen: boolean
}

export const SUBJECT_GROUPS: SubjectGroup[] = [
  {
    id: 'gpax',
    title: 'GPAX',
    icon: 'fa-graduation-cap',
    subjects: ['gpax', 'gpax5_score'],
    defaultOpen: true,
  },
  {
    id: 'tgat',
    title: 'TGAT (ความถนัดทั่วไป)',
    icon: 'fa-brain',
    subjects: ['tgat1', 'tgat2', 'tgat3'],
    defaultOpen: true,
  },
  {
    id: 'tpat_main',
    title: 'TPAT (ความถนัดวิชาชีพ)',
    icon: 'fa-flask',
    subjects: ['tpat1', 'tpat2', 'tpat3', 'tpat4', 'tpat5'],
    defaultOpen: true,
  },
  {
    id: 'tpat_sub',
    title: 'TPAT1/TPAT2 ย่อย (กสพท + ศิลปกรรม)',
    icon: 'fa-list-ul',
    subjects: ['tpat11', 'tpat12', 'tpat13', 'tpat21', 'tpat22', 'tpat23'],
    defaultOpen: false,
  },
  {
    id: 'a_lv_math_sci',
    title: 'A-Level คณิตศาสตร์/วิทยาศาสตร์',
    icon: 'fa-square-root-variable',
    subjects: ['a_lv_61', 'a_lv_62', 'a_lv_63', 'a_lv_64', 'a_lv_65', 'a_lv_66'],
    defaultOpen: false,
  },
  {
    id: 'a_lv_thai_eng_soc',
    title: 'A-Level สังคม / ไทย / อังกฤษ',
    icon: 'fa-book-open',
    subjects: ['a_lv_70', 'a_lv_81', 'a_lv_82'],
    defaultOpen: false,
  },
  {
    id: 'a_lv_lang',
    title: 'A-Level ภาษาที่ 3',
    icon: 'fa-language',
    subjects: ['a_lv_83', 'a_lv_84', 'a_lv_85', 'a_lv_86', 'a_lv_87', 'a_lv_88', 'a_lv_89'],
    defaultOpen: false,
  },
  {
    id: 'gpa_group',
    title: 'GPA รายกลุ่มสาระ (ใช้บางสาขา)',
    icon: 'fa-layer-group',
    subjects: ['gpa21', 'gpa22', 'gpa23', 'gpa24', 'gpa25', 'gpa26', 'gpa27', 'gpa28', 'gpa29'],
    defaultOpen: false,
  },
  {
    id: 'english',
    title: 'ภาษาอังกฤษมาตรฐาน (TOEFL/IELTS/TOEIC)',
    icon: 'fa-globe',
    subjects: ['toefl_ibt', 'ielts', 'toeic', 'ged_score'],
    defaultOpen: false,
  },
]

export const ALL_SUBJECT_KEYS: SubjectKey[] = Object.keys(SUBJECTS) as SubjectKey[]

export function getSubject(key: string): SubjectMeta | undefined {
  return SUBJECTS[key as SubjectKey]
}

// Some criteria use the rolled-up TGAT key — we compute it from the 3 parts.
export const COMPOSITE_KEYS = {
  tgat: ['tgat1', 'tgat2', 'tgat3'] as const,
}
