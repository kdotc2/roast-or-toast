import Link from 'next/link'

import ModalWrapper from '../ModalWrapper'

type Props = {
  close: () => void
}

export default function AboutModal({ close }: Props) {
  const content = (
    <>
      <div className="space-y-6 pt-6">
        <h3 className="text-lg font-semibold">About</h3>
        <div className="space-y-5 text-sm">
          <p className="">
            Roast or Toast is a place where users can share their content and
            get feedback. Content can be in the form of a copy of text, an
            image, or a website link.{' '}
          </p>
          <p>
            If you have any feedback, suggestions, or comments, feel free to
            send us an email at{' '}
            <a href="mailto: hello@roastortoast.me" className="hover:underline">
              hello@roastortoast.me
            </a>
            .
          </p>
        </div>

        <div className="flex justify-between pb-6">
          <div className="flex items-center justify-start gap-5 text-xs font-medium text-[#a3a3a3] dark:text-[#737373]">
            <Link
              className="hover:underline"
              href="/privacy"
              onClick={() => close()}
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:underline"
              href="/terms"
              onClick={() => close()}
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="primaryButton"
              type="button"
              onClick={() => close()}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return <ModalWrapper child={content} close={close} width={500} />
}
