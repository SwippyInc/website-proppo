import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ClientGoogleAnalytics from "@/components/ClientGoogleAnalytics";
import ClarityInit from "@/components/ClarityInit";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata = {
  title: "Proppo - One Product. Every Solution. Zero Headaches",
  description: "Effortlessly Manage your property from single software: update rates, manage inventory, prevent overbookings, and watch competition.",
  metadataBase: new URL('https://proppo.in'),
  openGraph: {
    title: "Proppo - One Product. Every Solution. Zero Headaches",
    description: "Effortlessly Manage your property from single software: update rates, manage inventory, prevent overbookings, and watch competition.",
    url: 'https://proppo.in',
    siteName: 'Proppo',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Proppo',
  url: 'https://proppo.in',
  description: 'All-in-one property management software for hotels, hostels, homestays, and vacation rentals. Manage rates, inventory, bookings, and channel distribution from a single platform.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    url: 'https://proppo.in/pricing',
  },
  provider: {
    '@type': 'Organization',
    name: 'Proppo',
    url: 'https://proppo.in',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.className}`}>
        <ClientGoogleAnalytics GTM_ID="GTM-M2QT2W4N" />
        <ClarityInit />
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
