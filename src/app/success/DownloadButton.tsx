'use client'

interface Props {
  sessionId: string
  file: string
}

const FILE_LABELS: Record<string, string> = {
  'estimation.xlsx': 'Estimation Spreadsheet (.xlsx)',
  'guide.pdf': 'Quick-Start Guide (.pdf)',
  'pricing_guide.pdf': 'Carpentry Pricing Guide (.pdf)',
}

export default function DownloadButton({ sessionId, file }: Props) {
  const label = FILE_LABELS[file] ?? file
  const href = `/api/download?session_id=${encodeURIComponent(sessionId)}&file=${encodeURIComponent(file)}`

  return (
    <a
      href={href}
      download
      className="flex items-center justify-between w-full px-5 py-3.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
      style={{ backgroundColor: '#4E342E', color: '#fff' }}
    >
      <span>{label}</span>
      <span style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '0.3px' }}>DOWNLOAD</span>
    </a>
  )
}
