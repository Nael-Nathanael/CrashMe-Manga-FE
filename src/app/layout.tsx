import "bootstrap/dist/css/bootstrap.css"
import "./global.css"
import "bootstrap-icons/font/bootstrap-icons.css"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={'bg-dark text-light'}>
    {children}
    </body>
    </html>
  )
}
