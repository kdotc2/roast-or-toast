import { Html, Head, Main, NextScript } from 'next/document'
import siteMetadata from '@/data/siteMetadata'

export default function Document() {
  return (
    <Html lang={siteMetadata.language}>
      <Head />
      <body className="overflow-x-hidden overscroll-y-none bg-[#f5f2f2] text-gray-900 antialiased dark:bg-[#06080a] dark:text-[#dcdcdc]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
