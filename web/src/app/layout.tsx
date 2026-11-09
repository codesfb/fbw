import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { FloatingMascot } from '@/components/Mascot/FloatingMascot'
import '@/index.css'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Fabio Santana — Projetos, ideias e tecnologia',
  description: 'Projetos, aprendizados e ideias de Fabio Santana sobre tecnologia e criação.',
  icons: {
    icon: '/favicon.svg',
  },
}

const themeScript = `(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={robotoMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <FloatingMascot />
        </ThemeProvider>
      </body>
    </html>
  )
}
