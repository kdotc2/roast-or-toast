import '@/css/tailwind.css'
import type { AppProps } from 'next/app'
import siteMetadata from '@/data/siteMetadata'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/Layout/Layout'
import '@fontsource/inter/variable-full.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  )
}
