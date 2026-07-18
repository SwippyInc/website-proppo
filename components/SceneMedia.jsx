'use client'

import MediaPlaceholder from './MediaPlaceholder'
import AnimatedCalendar from './AnimatedCalendar'
import { CaseStudyScene } from './SolutionScenes'
import {
  DragDropScene, SyncScene, OtaConnectScene, GuidebookScene,
  QrMenuScene, KitchenBoardScene, MultiDeptScene,
  HotelsOpsWide, VillasWide, HomestaysWide,
} from './ProductScenes'

// Registry from the spec's placeholder asset paths to animated scenes.
// Unknown paths fall back to MediaPlaceholder, so spec assets can be
// upgraded one by one without touching page code.
const SCENES_BY_PATH = {
  '/assets/product/reservations/calendar-demo.mp4': () => <AnimatedCalendar />,
  '/assets/product/reservations/drag-drop.gif': DragDropScene,
  '/assets/product/channel-manager/sync-diagram.mp4': SyncScene,
  '/assets/product/guidebook/guest-view-mobile.png': GuidebookScene,
  '/assets/product/restaurant/qr-menu-demo.mp4': QrMenuScene,
  '/assets/product/restaurant/kitchen-dashboard.png': KitchenBoardScene,
  '/assets/solutions/hotels/property-hero.jpg': HotelsOpsWide,
  '/assets/solutions/villas/property-hero.jpg': VillasWide,
  '/assets/solutions/homestays/property-hero.jpg': HomestaysWide,
  '/assets/solutions/hotels/dashboard-multi-dept.png': MultiDeptScene,
  '/assets/home/case-study-cedar-cottages.jpg': () => <CaseStudyScene />,
}

export default function SceneMedia({ label, path, aspect = 'aspect-video', className = '' }) {
  const ota = path?.match(/^\/assets\/product\/ota\/([^/]+)\/logo\.svg$/)
  if (ota) return <OtaConnectScene slug={ota[1]} aspect={aspect} />

  const Scene = path ? SCENES_BY_PATH[path] : null
  if (Scene) return <Scene aspect={aspect} />

  return <MediaPlaceholder label={label} path={path} aspect={aspect} className={className} />
}
