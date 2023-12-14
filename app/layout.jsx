import "@/styles/globals.css";

export const metadata = {
  title: 'Inspire Me',
  description: 'A collection of inspiring images',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet"/>
      
      </head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
