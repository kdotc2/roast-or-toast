import Link from 'next/link'

import ModalWrapper from '../ModalWrapper'

type Props = {
  close: () => void
}

export default function AboutModal({ close }:Props) {
  const content = (
    <>
      <div className="pt-5">
        <h3 className="text-xl font-semibold">
          About
        </h3>
      </div>
      <div className="space-y-5 pt-5 text-sm">
        <p className="">
          Roast or Toast is a place where users can share their
          content and get feedback. Content can be in the form of
          a copy of text, an image, or a website link.{' '}
        </p>
        <p>
          If you have any feedback, suggestions, or comments, feel
          free to{' '}
          <a
            href="mailto: hello@roastortoast.me"
            className="hover:underline"
          >
            send us an email
          </a>
          .
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-5 text-gray-400 dark:text-gray-500">
          <Link
            className="text-xs font-medium hover:underline"
            href="/privacy"
            onClick={() => close()}
          >
            Privacy Policy
          </Link>
          <Link
            className="text-xs font-medium hover:underline"
            href="/terms"
            onClick={() => close()}
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex justify-end gap-3 py-6">
          <button
            className="primaryButton"
            type="button"
            onClick={() => close()}
          >
            Done
          </button>
        </div>
      </div>
    </>
  )

  return (
    <ModalWrapper child={content} close={close} width={500} />
  )
}

