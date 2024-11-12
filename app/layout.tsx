import Navbar from "./components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import Script from "next/script"; // Import Next.js Script component

export const metadata: Metadata = {
  title: "Medic Chat",
  description:
    "Medic Chat, the ultimate healthcare communication platform designed to connect patients and medical professionals seamlessly. Our app offers a range of features to ensure you receive the best medical care and support whenever you need it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Medic Chat</title>
      </Head>
      <body className="relative bg-white">
        <Providers>
          <div className="flex flex-col">
            <Navbar /> <Sidebar />
          </div>
        </Providers>

        {/* Load Google Tag Manager script */}
        <Script
          strategy="afterInteractive" // Ensure the script loads after page is interactive
          src={`https://www.googletagmanager.com/gtag/js?id=AW-16748567566`}
        />
        <Script
          id="gtag-init" // ID helps identify the script in the DOM
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16748567566');
            `,
          }}
        />

        {/* Event snippet for Page view conversion */}
        <Script
          id="conversion-event"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                'send_to': 'AW-16748567566/WWYSCImL6N8ZEI64q7I-',
                'value': 1.0,
                'currency': 'RON'
              });
            `,
          }}
        />

        <main className="relative overflow-hidden z-0">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
