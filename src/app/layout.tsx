import './globals.css'
import React from "react";

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
    <body className={ "bg-dark text-[white]" }>
      { children }
    </body>
    </html>
  )
}
