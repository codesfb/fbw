import type { Metadata } from 'next'
import { Roboto_Mono, Newsreader } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import { MascotProvider } from '@/context/MascotContext'
import { FloatingMascot } from '@/components/Mascot/FloatingMascot'
import '@/index.css'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-serif-elegant',
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
    <html lang="pt-BR" suppressHydrationWarning className={`${robotoMono.variable} ${newsreader.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <MascotProvider>
            {children}
            <FloatingMascot />
          </MascotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
