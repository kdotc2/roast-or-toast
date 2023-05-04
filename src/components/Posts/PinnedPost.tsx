import {
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'

export const PinnedPost = () => {
  return (
    <div className="space-y-5 rounded border border-[#e5e5e5] bg-[#fdfdfd] p-4 text-sm font-medium dark:border-[#333333] dark:bg-[#212121]">
      <div className="font-bold">
        <span className="text-xs">📌</span> <span>How to Roast or Toast</span>
        <p className="pt-1 font-normal">
          Share content and get feedback from others. Use tags to specify the
          type of feedback you want or the feedback you're providing.
        </p>
      </div>

      <ul className="list-inside list-decimal">
        <div className="mb-1 text-xs font-bold uppercase text-[#737373] dark:text-[#8c8c8c]">
          Creating a post
        </div>
        <li>
          Select content type
          <div className="flex gap-2 py-2">
            <div className="flex items-center justify-center gap-0.5 rounded bg-[#ededed] px-1.5 py-1 text-xs dark:bg-[#151515]">
              <DocumentTextIcon className="h-4 w-4" />
              Text
            </div>
            <div className="flex items-center justify-center gap-0.5 rounded bg-[#ededed] px-1.5 py-1 text-xs dark:bg-[#151515]">
              <PhotoIcon className="h-4 w-4" />
              Image
            </div>
            <div className="flex items-center justify-center gap-0.5 rounded bg-[#ededed] px-1.5 py-1 text-xs dark:bg-[#151515]">
              <LinkIcon className="h-4 w-4" />
              Link
            </div>
          </div>
        </li>
        <li>
          Select one or both tags
          <div className="flex gap-2 py-2 text-xs">
            <div className="flex rounded-md bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
              🔥 Roast Me
            </div>
            <div className="flex rounded-md bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
              🍺 Toast Me
            </div>
          </div>
        </li>
        <li>Add a title and post content</li>
      </ul>

      <ul className="list-inside list-decimal space-y-1">
        <div className="text-xs font-bold uppercase text-[#737373] dark:text-[#8c8c8c]">
          Leaving a comment
        </div>
        <li>Add feedback comment</li>
        <li>
          Select optional tag(s)
          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="flex rounded-md bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
              🔥 Roast
            </div>
            <div className="flex rounded-md bg-[#ededed] px-1.5 py-1 dark:bg-[#151515]">
              🍺 Toast
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default PinnedPost
