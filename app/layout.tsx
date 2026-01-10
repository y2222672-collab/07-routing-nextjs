import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub - Your Personal Notes",
  description: "Organize your life with NoteHub",
};

export default function RootLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          margin: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TanStackProvider>
          <Header />

          <div
            className="layout-wrapper"
            style={{
              display: "flex",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {sidebar}
            <main
              style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </main>
          </div>

          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
