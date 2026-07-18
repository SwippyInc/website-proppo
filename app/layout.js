import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ClientGoogleAnalytics from "@/components/ClientGoogleAnalytics";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

export const metadata = {
  title: "Proppo - One Product. Every Solution. Zero Headaches",
  description: "Effortlessly Manage your property from single software: update rates, manage inventory, prevent overbookings, and watch competition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${fraunces.variable}`}>
        <ClientGoogleAnalytics GTM_ID="GTM-M2QT2W4N" />
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
