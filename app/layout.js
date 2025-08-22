import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import dynamic from 'next/dynamic';
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), { ssr: false });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata = {
  title: "Proppo - One Product. Every Solution. Zero Headaches",
  description: "Effortlessly Manage your property from single software: update rates, manage inventory, prevent overbookings, and watch competition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <GoogleAnalytics GTM_ID="GTM-M2QT2W4N"/>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
