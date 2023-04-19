import type { NextPage } from 'next'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  title?: string
  desc?: string
  imageURL?: string
  url?: string
}

const Meta:NextPage<Props> = ({
  title = siteMetadata.title,
  desc = siteMetadata.description,
  imageURL = `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
  url = siteMetadata.siteUrl
}) => (
      <Head>
        <title key='title'>{title}</title>
        <meta key='desc' name="description" content={desc}/>
        <meta key='og-type' property="og:type" content="website"/>
        <meta key='og-title' property="og:title" content={title}/>
        <meta key='og-desc' property="og:description" content={desc}/>
        <meta key='og-image' property="og:image" content={imageURL}/>
        <meta key='og-url' property="og:url" content={url}/>

        <meta key='twitter-card' name="twitter:card" content="summary_large_image"/>
        <meta key='twitter-domain' property="twitter:domain" content={url.split('//')[1]}/>
        <meta key='twitter-url' property="twitter:url" content={url}/>
        <meta key='twitter-title' name="twitter:title" content={title}/>
        <meta key='twitter-desc' name="twitter:description" content={desc}/>
        <meta key='twitter-image' name="twitter:image" content={imageURL}/>

{/* TODO figure out why i made this key='' */}
        <link key='' rel="canonical" href={url}/>
      </Head>
)

export default Meta
