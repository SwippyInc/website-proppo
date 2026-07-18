import homestay from './public/icons/homestay.png'
import hotel_managers from './public/icons/hotel_managers.png'
import hotel_owners from './public/icons/hotel_owners.png'
import vacation_rentals from './public/icons/vacation_rentals.png'
import affordable from './public/icons/affordable.png'
import all_in_one from './public/icons/all_in_one.png'
import booking_engine from './public/icons/booking_engine.png'
import channel_manager from './public/icons/channel_manager.png'
import pms from './public/icons/pms.png'
import profits from './public/icons/profits.png'
import qr_menu from './public/icons/qr_menu.png'
import sync from './public/icons/sync.png'
import virtual_inventory from './public/icons/virtual_inventory.png'
import web_checkin from './public/icons/web_checkin.png'
import hotels from './public/icons/hotels.png'
import homestays from './public/icons/homestays.png'
import guest_house from './public/icons/guest_house.png'
import villas from './public/icons/villas.png'
import payment_gateway from './public/icons/payment_gateway.png'
import kitchen_management from './public/icons/kitchen_management.png'
import kitchen_pos from './public/icons/kitchen_pos.png'
import whatsapp from './public/icons/whatsapp.png'
import hotel_website from './public/icons/hotel_website.png'
import hero_bg_img from './public/images/hero_bg_img.webp'
import electronic_ticket from './public/icons/electronic-ticket.png'

// images
import wdpd from './public/images/wdpd.png'
import proppo_logo from './public/images/proppo_logo.png'
import member_image from './public/images/member.png'
import proppo_screenshots from './public/images/proppo_screenshots.png'

export const IMAGES = {
    homestay, hotel_managers, hotel_owners, vacation_rentals, affordable, all_in_one, booking_engine, channel_manager, pms, profits, qr_menu, sync, virtual_inventory, web_checkin, wdpd, member_image, proppo_logo, electronic_ticket, hotels, homestays, guest_house, villas, proppo_screenshots, hero_bg_img, payment_gateway, kitchen_management, kitchen_pos, whatsapp, hotel_website
}

// v2 nav/IA data (proppo-site-spec.md Section 2) — shared by NavBar mega-menu and the /product overview page
import { CalendarDays, Layers, TrendingUp, ConciergeBell, ChefHat, Briefcase, Building2, Home, TreePalm, Newspaper, Award, LifeBuoy } from 'lucide-react'

export const PRODUCT_CATEGORIES = [
    { name: 'Property Management', desc: 'Reservations, front office, availability', href: '/product/property-management', icon: CalendarDays },
    { name: 'Inventory & Distribution', desc: 'Rooms, virtual inventory, channel manager', href: '/product/inventory-distribution', icon: Layers },
    { name: 'Revenue & Booking', desc: 'Rate plans, direct booking engine, website builder', href: '/product/revenue-booking', icon: TrendingUp },
    { name: 'Guest Experience', desc: 'Web check-in, guidebook, communication', href: '/product/guest-experience', icon: ConciergeBell },
    { name: 'Operations', desc: 'Restaurant, housekeeping, vendors & procurement', href: '/product/operations', icon: ChefHat },
    { name: 'Business & Admin', desc: 'Finance, reports, roles, multi-property', href: '/product/business-admin', icon: Briefcase },
]

export const SOLUTIONS = [
    { name: 'Hotels & Resorts', href: '/solutions/hotels-resorts', desc: 'Full-service operations, run from one system', asset: '/assets/home/solutions-hotels.jpg', icon: Building2 },
    { name: 'Vacation Rentals & Villas', href: '/solutions/vacation-rentals-villas', desc: 'Sell it whole. Sell it by the room. Never sell it twice.', asset: '/assets/home/solutions-villas.jpg', icon: TreePalm },
    { name: 'Homestays & BnBs', href: '/solutions/homestays-bnbs', desc: 'Run it like a pro. Still just you.', asset: '/assets/home/solutions-homestays.jpg', icon: Home },
]

export const RESOURCES = [
    { name: 'Blog', desc: 'Guides and notes on running a property', icon: Newspaper },
    { name: 'Case Studies', desc: 'Real properties, real outcomes', href: '/resources/case-studies', icon: Award },
    { name: 'Help Center', desc: 'Getting started guides and FAQs', icon: LifeBuoy },
]

// OTA pages (proppo-site-spec.md Section 6.4) — slug doubles as the route segment and asset folder name
export const OTAS = [
    { slug: 'booking-com', name: 'Booking.com', line: 'Typically the highest-volume channel for independent Indian properties.' },
    { slug: 'airbnb', name: 'Airbnb', line: 'Bookings sync through virtual inventory, whole-property and per-room combinations included.' },
    { slug: 'goibibo', name: 'Goibibo', line: 'Major domestic channel, often paired with MakeMyTrip under GoMMT.' },
    { slug: 'makemytrip', name: 'MakeMyTrip', line: "India's largest domestic OTA by volume for many property types." },
    { slug: 'expedia', name: 'Expedia', line: "International reach across Expedia's group of brands." },
    { slug: 'agoda', name: 'Agoda', line: 'Strong for Southeast Asian and broader Asian demand.' },
    { slug: 'yatra', name: 'Yatra', line: 'Established domestic Indian OTA, strong corporate travel ties.' },
    { slug: 'easemytrip', name: 'EaseMyTrip', line: 'Fast-growing domestic Indian OTA.' },
    { slug: 'cleartrip', name: 'Cleartrip', line: 'Domestic Indian OTA, mobile-first booking base.' },
    { slug: 'travelguru', name: 'Travelguru', line: 'Domestic Indian OTA.' },
]