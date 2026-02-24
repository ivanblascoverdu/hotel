import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Lumière Hotels — Colección de Hoteles de Lujo",
    template: "%s | Lumière Hotels",
  },
  description:
    "Descubre una colección exclusiva de hoteles de lujo en los destinos más emblemáticos de España. Experiencias únicas, gastronomía Michelin y bienestar holístico.",
  keywords: [
    "hoteles de lujo",
    "hoteles premium España",
    "reservas hotel",
    "hotel boutique",
    "spa resort",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Lumière Hotels",
    title: "Lumière Hotels — Colección de Hoteles de Lujo",
    description:
      "Descubre una colección exclusiva de hoteles de lujo en los destinos más emblemáticos de España.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Lumière Hotels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
