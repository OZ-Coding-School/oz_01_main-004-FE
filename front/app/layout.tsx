import Footer from "@/shared/components/footer/footer"
import Nav from "@/shared/components/nav/nav"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CookBap",
  description: "자취러들의 요리 레시피",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
