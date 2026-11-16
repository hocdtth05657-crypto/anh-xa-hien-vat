'use client'

import { useMemo, useState } from 'react'
import { Archive, ArrowDownToLine, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, Database, FileText, Layers3, MapPin, MoreHorizontal, Search, Settings2, ShieldCheck, Sparkles, Upload, X } from 'lucide-react'

type Mapping = { source: string; target: string; confidence: number; required?: boolean }

const initialMappings: Mapping[] = [
  { source: 'Tên hiện vật', target: 'Tên gọi', confidence: 98, required: true },
  { source: 'Mã kiểm kê', target: 'Mã định danh', confidence: 100, required: true },
  { source: 'Chất liệu', target: 'Chất liệu chính', confidence: 96 },
  { source: 'Niên đại', target: 'Thời kỳ / niên đại', confidence: 94 },
  { source: 'Nơi phát hiện', target: 'Địa điểm phát hiện', confidence: 91 },
  { source: 'Tình trạng', target: 'Tình trạng bảo quản', confidence: 87 },
]

const targets = ['Tên gọi', 'Mã định danh', 'Chất liệu chính', 'Thời kỳ / niên đại', 'Địa điểm phát hiện', 'Tình trạng bảo quản', 'Kích thước', 'Mô tả', 'Nơi lưu trữ', 'Số bản ghi', 'Số nguồn', 'Chưa ánh xạ']

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return <button type="button" aria-label={label} className="grid size-9 place-items-center rounded-lg text-[#72756e] transition hover:bg-[#f0f1ea] hover:text-[#292e27]">{children}</button>
}

export function ArtifactMappingWorkspace() {
  const [mappings, setMappings] = useState(initialMappings)
  const [saved, setSaved] = useState(false)
  const [query, setQuery] = useState('')
  const mappedCount = mappings.filter((item) => item.target !== 'Chưa ánh xạ').length
  const filtered = useMemo(() => mappings.filter((item) => `${item.source} ${item.target}`.toLowerCase().includes(query.toLowerCase())), [mappings, query])

  function changeTarget(index: number, target: string) {
    setMappings((items) => items.map((item, i) => i === index ? { ...item, target } : item))
    setSaved(false)
  }

  function exportMapping() {
    const payload = {
      bo_truong_chuan: 'Di sản văn hóa — phiên bản 1.2',
      ban_ghi: 'BTLS-2024-0186',
      so_nguon: 'SRC-2024-031',
      noi_luu_tru: 'Kho Bảo tàng Lịch sử · Tủ A-03 · Ngăn 2',
      anh_xa: mappings.map(({ source, target }) => ({ truong_nguon: source, truong_chuan: target })),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'anh-xa-hien-vat.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#292e27]">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[236px] flex-col border-r border-[#e7e8e0] bg-[#fbfbf8] px-4 py-5 lg:flex">
        <a className="mb-9 flex items-center gap-3 px-2" href="#" aria-label="Di sản số, trang chủ">
          <span className="grid size-9 place-items-center rounded-xl bg-[#344c3a] text-white"><Archive size={18} /></span>
          <span><span className="block text-[14px] font-semibold tracking-tight">Di sản số</span><span className="text-[11px] text-[#85877f]">Quản lý bộ sưu tập</span></span>
        </a>
        <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.15em] text-[#a1a39b]">Không gian làm việc</div>
        <nav className="flex flex-col gap-1" aria-label="Điều hướng chính">
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#6d7169] hover:bg-[#f0f1ea]"><Layers3 size={16} /> Bộ sưu tập</a>
          <a href="#" className="flex items-center gap-3 rounded-lg bg-[#e9eee6] px-3 py-2.5 text-[13px] font-medium text-[#344c3a]"><Database size={16} /> Ánh xạ dữ liệu</a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#6d7169] hover:bg-[#f0f1ea]"><FileText size={16} /> Bản ghi</a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#6d7169] hover:bg-[#f0f1ea]"><MapPin size={16} /> Kho lưu trữ</a>
        </nav>
        <div className="mt-9 mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.15em] text-[#a1a39b]">Quản trị</div>
        <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#6d7169] hover:bg-[#f0f1ea]"><Settings2 size={16} /> Cài đặt</a>
        <div className="mt-auto rounded-xl border border-[#e9e9e1] bg-white p-3.5">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#485447]"><ShieldCheck size={14} /> Dữ liệu được kiểm soát</div>
          <p className="text-[11px] leading-relaxed text-[#85877f]">Bộ trường chuẩn Di sản văn hóa · phiên bản 1.2</p>
        </div>
        <button className="mt-4 flex items-center gap-2 rounded-lg p-2 text-left hover:bg-[#f0f1ea]" type="button"><span className="grid size-8 place-items-center rounded-full bg-[#e7e9dd] text-[11px] font-semibold text-[#4e5c49]">NT</span><span className="flex-1"><span className="block text-xs font-medium">Nguyễn Thu</span><span className="text-[10px] text-[#92948c]">Chuyên viên dữ liệu</span></span><MoreHorizontal size={16} className="text-[#888b83]" /></button>
      </aside>

      <div className="lg:pl-[236px]">
        <header className="flex h-[62px] items-center justify-between border-b border-[#e9e9e2] bg-[#fbfbf8] px-5 md:px-9">
          <div className="flex items-center gap-2 text-xs text-[#898c84]"><span className="hidden sm:inline">Bộ sưu tập</span><span className="hidden sm:inline">/</span><span className="font-medium text-[#454b43]">Ánh xạ dữ liệu</span></div>
          <div className="flex items-center gap-2"><span className="hidden items-center gap-1.5 rounded-full bg-[#edf2e9] px-2.5 py-1 text-[10px] font-medium text-[#4e6c4d] sm:flex"><span className="size-1.5 rounded-full bg-[#6d9662]" /> Đã kết nối</span><IconButton label="Trợ giúp"><CircleHelp size={17} /></IconButton></div>
        </header>

        <div className="mx-auto max-w-[1240px] px-5 py-7 md:px-9 md:py-9">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[.14em] text-[#71816e]"><span className="size-1.5 rounded-full bg-[#748c6b]" /> Chuẩn hóa bộ sưu tập</div><h1 className="text-[26px] font-semibold tracking-[-.04em] sm:text-[30px]">Ánh xạ dữ liệu hiện vật</h1><p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[#85877f]">Đối chiếu các trường dữ liệu nguồn với bộ trường chuẩn trước khi nhập vào kho lưu trữ.</p></div>
            <button onClick={() => setSaved(true)} type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#344c3a] px-4 text-[12px] font-medium text-white shadow-sm transition hover:bg-[#293d2e]"><Check size={15} /> {saved ? 'Đã lưu ánh xạ' : 'Lưu ánh xạ'}</button>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e9e9e2] bg-white p-4"><div className="flex items-center justify-between"><span className="text-[11px] text-[#83867d]">Bản ghi hiện tại</span><FileText size={15} className="text-[#858a7d]" /></div><div className="mt-2 text-[17px] font-semibold tracking-tight">BTLS-2024-0186</div><div className="mt-1 text-[10px] text-[#9a9c95]">Hiện vật · 1 trong 248 bản ghi</div></div>
            <div className="rounded-xl border border-[#e9e9e2] bg-white p-4"><div className="flex items-center justify-between"><span className="text-[11px] text-[#83867d]">Nơi lưu trữ</span><MapPin size={15} className="text-[#858a7d]" /></div><div className="mt-2 text-[14px] font-semibold tracking-tight">Kho Bảo tàng Lịch sử</div><div className="mt-1 text-[10px] text-[#9a9c95]">Tủ A-03 <span className="mx-1">·</span> Ngăn 2</div></div>
            <div className="rounded-xl border border-[#e9e9e2] bg-white p-4"><div className="flex items-center justify-between"><span className="text-[11px] text-[#83867d]">Nguồn tư liệu</span><Database size={15} className="text-[#858a7d]" /></div><div className="mt-2 text-[17px] font-semibold tracking-tight">SRC-2024-031</div><div className="mt-1 text-[10px] text-[#9a9c95]">Sổ kiểm kê hiện vật · trang 42</div></div>
          </div>

          <section className="overflow-hidden rounded-xl border border-[#e6e7df] bg-white shadow-[0_2px_8px_rgba(38,44,35,0.025)]" aria-labelledby="mapping-heading">
            <div className="flex flex-col justify-between gap-4 border-b border-[#edeee8] px-5 py-4 md:flex-row md:items-center md:px-6">
              <div><h2 id="mapping-heading" className="text-[14px] font-semibold">Ánh xạ trường dữ liệu</h2><p className="mt-1 text-[11px] text-[#92948c]">{mappedCount} / {mappings.length} trường nguồn đã được đối chiếu</p></div>
              <div className="flex flex-wrap items-center gap-2"><label className="relative"><span className="sr-only">Tìm trường dữ liệu</span><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a29b]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm trường..." className="h-9 w-[180px] rounded-lg border border-[#e8e9e2] bg-[#fdfdfb] pl-9 pr-3 text-[11px] outline-none placeholder:text-[#a0a29b] focus:border-[#879b80]" /></label><button type="button" onClick={() => setMappings((items) => [...items, { source: `Trường nguồn ${items.length + 1}`, target: 'Chưa ánh xạ', confidence: 0 }])} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e8e9e2] px-3 text-[11px] font-medium text-[#565c53] hover:bg-[#f7f8f3]"><Upload size={13} /> Thêm trường</button></div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] gap-3 bg-[#fafaf7] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#92948c] md:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)_120px] md:px-6"><div>Trường dữ liệu nguồn</div><div /><div>Bộ trường chuẩn</div><div className="hidden md:block">Độ tin cậy</div></div>
            <div className="divide-y divide-[#f0f0eb]">
              {filtered.map((mapping) => {
                const originalIndex = mappings.indexOf(mapping)
                return <div key={`${mapping.source}-${originalIndex}`} className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-center gap-3 px-5 py-3.5 md:grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)_120px] md:px-6">
                  <div className="min-w-0"><div className="truncate text-[12px] font-medium">{mapping.source}</div><div className="mt-1 text-[10px] text-[#a0a29b]">CSV · cột {String.fromCharCode(65 + originalIndex)}</div></div>
                  <div className="flex justify-center text-[#a1a79b]"><ArrowRight size={15} /></div>
                  <label className="relative min-w-0"><span className="sr-only">Trường chuẩn tương ứng với {mapping.source}</span><select value={mapping.target} onChange={(e) => changeTarget(originalIndex, e.target.value)} className="h-9 w-full appearance-none rounded-lg border border-[#e9eae3] bg-[#fff] px-3 pr-8 text-[11px] text-[#4b5048] outline-none focus:border-[#879b80]">{targets.map((target) => <option key={target} value={target}>{target}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#969990]" /></label>
                  <div className="hidden items-center gap-2 md:flex"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef0e9]"><div className={`h-full rounded-full ${mapping.confidence >= 90 ? 'bg-[#7f9b72]' : 'bg-[#c3a16b]'}`} style={{ width: `${mapping.confidence}%` }} /></div><span className="w-8 text-right text-[10px] text-[#85877f]">{mapping.confidence}%</span></div>
                </div>
              })}
              {filtered.length === 0 && <div className="px-6 py-10 text-center text-xs text-[#888b83]">Không tìm thấy trường phù hợp.</div>}
            </div>
            <div className="flex flex-col gap-3 border-t border-[#edeee8] bg-[#fdfdfb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-6">
              <div className="flex items-center gap-2 text-[10px] text-[#777b72]"><Sparkles size={14} className="text-[#8c9d77]" /><span>Gợi ý ánh xạ dựa trên tên trường và ngữ cảnh dữ liệu.</span></div>
              <button onClick={exportMapping} type="button" className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2 text-[11px] font-medium text-[#596154] hover:bg-[#f1f2ec]"><ArrowDownToLine size={14} /> Xuất JSON</button>
            </div>
          </section>

          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-[10px] text-[#93958e]"><span className="grid size-5 place-items-center rounded-full bg-[#ebefe7] text-[#61745b]"><Check size={11} /></span> Bản ghi, nơi lưu trữ và số nguồn được gắn với ánh xạ này.</div><div className="flex items-center gap-2"><button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e7e8e0] bg-white px-3 text-[11px] text-[#666b62] hover:bg-[#fafaf7]"><ArrowLeft size={13} /> Bản trước</button><button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e7e8e0] bg-white px-3 text-[11px] text-[#666b62] hover:bg-[#fafaf7]">Bản tiếp theo <ArrowRight size={13} /></button></div></div>
          <div className="mt-7 rounded-xl border border-[#ebece5] bg-[#f0f2eb] px-4 py-3 text-[10px] leading-relaxed text-[#74796f]"><span className="font-semibold text-[#596453]">Lưu ý chuẩn hóa:</span> Giữ nguyên giá trị gốc của nguồn; ánh xạ chỉ xác định trường đích. Số bản ghi và số nguồn giúp truy xuất xuất xứ dữ liệu.</div>
        </div>
      </div>
    </main>
  )
}
