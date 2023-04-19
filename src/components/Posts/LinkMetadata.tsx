import { MetadataLoader } from '@/components/Posts/Loader'
import useSWR from 'swr'

type Metadata = {
  title?: string
  description?: string
  images?: string[]
  domain: string
  url: string
}

const LinkMetadata = ({ url }: any) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const {
    data: metadata,
    error,
    isLoading,
  } = useSWR<Metadata>(
    `https://jsonlink.io/api/extract?url=https://${url}`,
    fetcher
  )
  return (
    <>
      {isLoading && <MetadataLoader />}
      {metadata && (
        <>
          <div className="space-y-2 text-xs">
            <span className="flex justify-center pb-3">
              <img
                src={
                  (metadata.images
                    ? metadata.images[0]
                    : '/images/no-image.png') ||
                  (!metadata.images
                    ? '/images/no-image.png'
                    : '/images/no-image.png')
                }
                alt="Preview image"
              />
            </span>
            <div className="space-y-2 px-4">
              <div className="flex justify-between gap-3">
                <h3 className=" font-semibold">{metadata.title}</h3>
                <a
                  href={`${metadata.url}`}
                  className="group pointer-events-auto lowercase hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <span>
                    <div className="flex items-center gap-0.5">
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
                          d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
                        />
                      </svg>
                      {metadata.domain}
                    </div>
                  </span>
                </a>
              </div>
              <p>{metadata.description}</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LinkMetadata
