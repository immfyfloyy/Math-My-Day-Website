import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@shared/components/layout'
import { ProgramResultCard } from './ProgramResultCard'
import { FilterSortBar } from './FilterSortBar'
import { CompareDrawer } from './CompareDrawer'
import { ScoreEditorModal } from './ScoreEditorModal'
import { StatsGrid } from './StatsGrid'
import { useUserScores } from '../hooks/useUserScores'
import { useFavorites } from '../hooks/useFavorites'
import { useCompare } from '../hooks/useCompare'
import { useShareLink } from '../hooks/useShareLink'
import { calculatePrograms } from '../services/tcas.api'
import type {
  CalculateResponse,
  ProgramFilters,
  ProgramSortKey,
} from '../services/tcas.api'
import type { UserScores } from '../domain/types'

type Tab = 'search' | 'favorites'

function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(t)
  }, [value, delay])
  return debounced
}

interface ResultsViewProps {
  tab: Tab
  scores: UserScores
  favorites: string[]
  compareIds: string[]
  onToggleFavorite: (id: string) => void
  onToggleCompare: (id: string) => void
  query: string
  filters: ProgramFilters
  sort: ProgramSortKey
  onData: (data: CalculateResponse) => void
}

function ResultsView({
  tab,
  scores,
  favorites,
  compareIds,
  onToggleFavorite,
  onToggleCompare,
  query,
  filters,
  sort,
  onData,
}: ResultsViewProps) {
  const isFavoritesTab = tab === 'favorites'

  const { data, isFetching, isError } = useQuery({
    queryKey: [
      'tcas',
      isFavoritesTab ? 'favorites' : 'search',
      isFavoritesTab ? favorites : query,
      scores,
      filters,
      sort,
    ],
    queryFn: () =>
      calculatePrograms({
        ...(isFavoritesTab
          ? { programIds: favorites }
          : { query }),
        scores,
        filters,
        sort,
        limit: isFavoritesTab ? 100 : 30,
      }),
    enabled: !isFavoritesTab || favorites.length > 0,
    staleTime: 60_000,
  })

  useEffect(() => {
    if (data) onData(data)
  }, [data, onData])

  if (isFavoritesTab && favorites.length === 0) {
    return (
      <div className="tcas-empty">
        <i className="far fa-heart" />
        <h3>ยังไม่มีสาขาที่บันทึก</h3>
        <p>กดไอคอนหัวใจที่สาขาในแท็บ "ค้นหา" เพื่อบันทึกไว้</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="tcas-empty">
        <i className="fas fa-circle-exclamation" />
        <h3>โหลดข้อมูลไม่สำเร็จ</h3>
        <p>กรุณาลองใหม่อีกครั้ง</p>
      </div>
    )
  }

  if (data && data.results.length === 0) {
    return (
      <div className="tcas-empty">
        <i className="fas fa-folder-open" />
        <h3>ไม่พบสาขาที่ตรง</h3>
        <p>ลองล้างตัวกรอง หรือใช้คำค้นอื่น</p>
      </div>
    )
  }

  return (
    <>
      <div className="tcas-results-meta">
        พบ {data?.filtered.toLocaleString() ?? '...'}{' '}
        {data && data.filtered !== data.total
          ? `/ ${data.total.toLocaleString()} `
          : ''}
        สาขา
        {isFetching ? <span> · กำลังโหลด...</span> : null}
      </div>

      <div className="tcas-result-list">
        {data?.results.map((item) => (
          <ProgramResultCard
            key={item.program.program_id}
            item={item}
            isFavorite={favorites.includes(item.program.program_id)}
            onToggleFavorite={onToggleFavorite}
            isCompared={compareIds.includes(item.program.program_id)}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </>
  )
}

export function TcasCalculatorPage() {
  const { scores, setScore, reset, applyAll } = useUserScores()
  const { favorites, toggle: toggleFavorite, applyAll: applyFavorites } =
    useFavorites()
  const { compareIds, toggle: toggleCompare, clear: clearCompare } = useCompare()

  const [tab, setTab] = useState<Tab>('search')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<ProgramFilters>({})
  const [sort, setSort] = useState<ProgramSortKey>('my_score_desc')
  const [showCompare, setShowCompare] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [latestData, setLatestData] = useState<CalculateResponse | null>(null)
  const { generateShareLink, applyShareFromUrl } = useShareLink()
  const [copied, setCopied] = useState(false)

  const debouncedScores = useDebouncedValue(scores, 400)
  const debouncedQuery = useDebouncedValue(query, 300)

  // Apply ?share= payload from URL on first mount.
  useEffect(() => {
    const payload = applyShareFromUrl()
    if (!payload) return
    if (payload.scores) applyAll(payload.scores)
    if (payload.favorites) applyFavorites(payload.favorites)
  }, [applyShareFromUrl, applyAll, applyFavorites])

  const handleShare = async () => {
    const link = generateShareLink(scores, favorites)
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('คัดลอกลิงก์นี้:', link)
    }
  }

  const hasScores = Object.keys(scores).length > 0
  const hasAnything = hasScores || favorites.length > 0

  return (
    <MainLayout>
      <div className="tcas-page tcas-page-bento">
        <header className="tcas-hero">
          <h1>
            <i
              className="fas fa-calculator"
              style={{ marginRight: 12, color: 'var(--primary)' }}
            />
            เช็กคะแนนยื่นมหาลัย
          </h1>
          <p>
            กรอกคะแนน → ค้นหาสาขา → ดูโอกาสติด · ครอบคลุม 4,500+ สาขา ทุกมหาวิทยาลัย ในรอบ 3 Admission
          </p>
          <div className="tcas-hero-actions">
            <span className="tcas-meta-tag">
              <i className="fas fa-database" />
              ข้อมูลจาก myTCAS · TCAS69
            </span>
            <button
              type="button"
              className="tcas-share-btn"
              onClick={handleShare}
              disabled={!hasAnything}
            >
              <i className={`fas ${copied ? 'fa-check' : 'fa-share-nodes'}`} />
              {copied ? 'คัดลอกแล้ว!' : 'แชร์ลิงก์'}
            </button>
          </div>
        </header>

        <StatsGrid
          scores={scores}
          results={latestData?.results ?? []}
          filteredCount={latestData?.filtered ?? 0}
          totalCount={latestData?.total ?? 0}
          favoritesCount={favorites.length}
          compareCount={compareIds.length}
          onOpenEditor={() => setShowEditor(true)}
        />

        <div className="tcas-bento-main">
          <div className="tcas-tabs">
            <button
              type="button"
              className="tcas-tab"
              data-active={tab === 'search'}
              onClick={() => setTab('search')}
            >
              <i className="fas fa-magnifying-glass" /> ค้นหาสาขา
            </button>
            <button
              type="button"
              className="tcas-tab"
              data-active={tab === 'favorites'}
              onClick={() => setTab('favorites')}
            >
              <i className="fas fa-heart" /> รายการที่บันทึก
              <span className="tcas-tab-count">({favorites.length})</span>
            </button>
          </div>

          {tab === 'search' ? (
            <div className="tcas-search-bar">
              <i className="fas fa-search" aria-hidden />
              <input
                type="search"
                placeholder='ค้นหา ชื่อมหาวิทยาลัย / คณะ / สาขา (เช่น "จุฬา วิศวกรรม")'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          ) : null}

          <FilterSortBar
            filters={filters}
            onFiltersChange={setFilters}
            sort={sort}
            onSortChange={setSort}
            universities={latestData?.availableUniversities ?? []}
            hasScores={hasScores}
          />

          <ResultsView
            tab={tab}
            scores={debouncedScores}
            favorites={favorites}
            compareIds={compareIds}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            query={debouncedQuery}
            filters={filters}
            sort={sort}
            onData={setLatestData}
          />

          <div className="tcas-disclaimer">
            <i className="fas fa-triangle-exclamation" />{' '}
            <strong>หมายเหตุ:</strong>{' '}
            การประเมินเป็นการเทียบกับคะแนนต่ำสุด-สูงสุดของปีที่แล้ว (TCAS68)
            ไม่ใช่ตัวเลขรับประกัน ตรวจสอบรายละเอียดล่าสุดที่เว็บไซต์ของมหาวิทยาลัย
            และ myTCAS ก่อนยื่นเสมอ
          </div>
        </div>

        {compareIds.length > 0 ? (
          <button
            type="button"
            className="tcas-compare-fab"
            onClick={() => setShowCompare(true)}
          >
            <i className="fas fa-scale-balanced" />
            เทียบ {compareIds.length} สาขา
          </button>
        ) : null}

        <ScoreEditorModal
          open={showEditor}
          onClose={() => setShowEditor(false)}
          scores={scores}
          onChange={setScore}
          onReset={reset}
        />

        <CompareDrawer
          open={showCompare}
          onClose={() => setShowCompare(false)}
          compareIds={compareIds}
          scores={debouncedScores}
          onRemove={toggleCompare}
          onClearAll={clearCompare}
        />
      </div>
    </MainLayout>
  )
}
