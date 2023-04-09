import PostFeed from '@/components/Posts/PostFeed'
import { PageSEO } from '@/data/SEO'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <PostFeed />
    </>
  )
}
