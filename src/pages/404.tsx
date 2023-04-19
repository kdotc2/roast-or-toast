import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function FourZeroFour() {
  return (
    <>
      <div className="flex items-center justify-center supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] sm:h-screen">
        <div className="item-start flex flex-col md:items-center">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-center md:space-x-6">
            <div className="space-x-2 pt-4 pb-8 md:space-y-5">
              <h1 className="text-6xl font-extrabold leading-9 text-gray-900 dark:text-gray-200 md:px-6 md:text-8xl md:leading-14">
                404
              </h1>
            </div>
            <div className="max-w-md">
              <p className="py-4 text-xl font-bold leading-normal md:text-2xl">
                Secret page unlocked!
              </p>
              <p className="mb-8">Just kidding, this page doesn't exist.</p>
            </div>
          </div>
          <div className="py-4">
            <button>
              <Link
                href="/"
                className="relative flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium hover:rounded-md hover:bg-gray-200 hover:py-2 hover:px-3 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <ArrowLongLeftIcon className="h-6 w-6" /> Back to posts
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
