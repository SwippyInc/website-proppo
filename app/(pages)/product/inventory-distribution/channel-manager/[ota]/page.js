import { notFound } from 'next/navigation'
import { OTAS } from '@/constants'
import OtaPage from './OtaPage'

// OTA pages (proppo-site-spec.md Section 6.4) — one static page per entry in OTAS
export function generateStaticParams() {
  return OTAS.map((o) => ({ ota: o.slug }))
}

export const dynamicParams = false

export default async function Page({ params }) {
  const { ota: slug } = await params
  const data = OTAS.find((o) => o.slug === slug)
  if (!data) notFound()
  return <OtaPage ota={data} />
}
