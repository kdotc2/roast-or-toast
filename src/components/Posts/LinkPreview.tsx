import { MetadataLoader } from '@/components/Posts/Loader'
import useSWR from 'swr'
import { LinkIcon } from '@heroicons/react/24/outline'

type Metadata = {
  title?: string
  description?: string
  image?: string
  // domain: string
  url: string
}

const LinkPreview = ({ url }: any) => {
  const getDomainName = (url: string) => {
    // run against regex
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
    // extract hostname (will be null if no match is found)
    return matches && matches[1]
  }
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const {
    data: metadata,
    error,
    isLoading,
  } = useSWR<Metadata>(
    `https://metainfo.vercel.app/api?url=https://${url}`,
    fetcher,
    { errorRetryCount: 1 }
  )

  if (!metadata || error) {
    return (
      <div className="flex items-center overflow-hidden rounded-md border border-[#e5e5e5] dark:border-[#333333]">
        <LinkIcon className="mx-6 h-6 w-6" />
        <div className="flex w-full flex-row bg-[#f8f8f8] py-4 px-6 dark:bg-[#292929] ">
          <a
            href={`https://${url}`}
            className="group pointer-events-auto flex items-center gap-0.5 lowercase hover:underline"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <span className="text-xs line-clamp-1">{url}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="hidden h-3 w-3 group-hover:flex"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && <MetadataLoader />}
      {metadata && (
        <>
          <div className="overflow-hidden rounded-md border border-[#e5e5e5] text-xs dark:border-[#333333]">
            <span className="flex justify-center">
              <img
                src={metadata.image ? metadata.image : '/images/no-image.png'}
                alt="Preview image"
                className=""
              />
            </span>
            <div className="space-y-[6px] border-t border-[#e5e5e5] bg-[#f8f8f8] px-4 py-3 dark:border-[#333333] dark:bg-[#292929]">
              <h3 className="font-semibold">{metadata.title}</h3>
              <p className="font-medium line-clamp-2">{metadata.description}</p>
              <div>
                <a
                  href={`${metadata.url}`}
                  className="group pointer-events-auto lowercase hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <div className="flex items-center gap-0.5">
                    {getDomainName(metadata.url)?.replace('www.', '')}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="hidden h-3 w-3 group-hover:flex"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LinkPreview
