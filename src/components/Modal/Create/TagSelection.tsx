import Select, {
  DropdownIndicatorProps,
  components,
  MultiValueRemoveProps,
  ClearIndicatorProps,
  ActionMeta,
  MultiValue,
} from 'react-select'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type BaseStyleProps = {
  [key: string]: any
}

type ClassNameState = {
  isFocused: boolean
  menuIsOpen: boolean
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="h-4 w-4 stroke-[2.5]" />
    </components.DropdownIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <XMarkIcon className="h-3 w-3 stroke-[2.5] hover:text-[#262626] hover:dark:text-[#e5e5e5]" />
    </components.MultiValueRemove>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className="h-4 w-4 stroke-[2.5] hover:text-[#262626] hover:dark:text-[#e5e5e5]" />
    </components.ClearIndicator>
  )
}
const controlStyles = {
  base: 'min-h-[40px] rounded border bg-[#f7f7f7] pl-3 pr-2 text-sm text-[#a3a3a3] hover:cursor-pointer dark:bg-[#262626] dark:text-[#737373]',
  focus:
    'border-[#121212] dark:border-[#dcdcdc] bg-transparent dark:bg-transparent',
  nonFocus: 'border-[#d4d4d4] dark:border-[#525252]',
  menuOpen: 'rounded-b-none',
}

const menuStyles =
  'rounded rounded-t-none border border-t-0 border-[#121212] bg-[#fdfdfd] p-2 text-sm dark:border-[#dcdcdc] dark:bg-[#212121] dark:text-[#e5e5e5]'

const selectInputStyles = 'text-[#121212] dark:text-[#e5e5e5]'

const dropdownIndicatorStyles = 'hover:text-[#262626] hover:dark:text-[#e5e5e5]'

const noOptionsMessageStyles =
  'flex px-3 py-2 text-sm text-[#737373] dark:text-[#a3a3a3]'

const multiValueStyles =
  'my-1 mr-2 items-center gap-2 rounded bg-[#ededed] px-2 text-xs text-[#121212] dark:bg-[#151515] dark:text-[#e5e5e5]'

const multiValueLabelStyles = 'mr-1'

const multiValueRemoveStyles =
  '-mx-2 rounded-r p-1.5 hover:bg-[#dcdcdc] hover:dark:bg-[#333333]'

const indicatorSeparatorStyles = 'm-2 bg-[#d4d4d4] dark:bg-[#525252]'

const optionStyles =
  'rounded px-3 py-2 text-sm hover:cursor-pointer hover:bg-[#e5e5e5] hover:dark:bg-[#333333]'

const options = [
  { value: '🔥 Roast Me', label: '🔥 Roast Me' },
  { value: '🍺 Toast Me', label: '🍺 Toast Me' },
]

type TagSelectionProps = {
  onTagSelection: (
    // option: readonly Option[],
    // actionMeta: ActionMeta<Option>
    newValue: MultiValue<unknown>
  ) => void
}

export const TagSelection = ({ onTagSelection }: TagSelectionProps) => {
  return (
    <Select
      onChange={onTagSelection}
      placeholder="Select tag(s)"
      isMulti
      isSearchable={false}
      closeMenuOnSelect={false}
      options={options}
      unstyled
      styles={{
        input: (base: BaseStyleProps) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        multiValueLabel: (base: BaseStyleProps) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible',
        }),
        control: (base: BaseStyleProps) => ({
          ...base,
          transition: 'none',
        }),
      }}
      noOptionsMessage={() => 'No tags left...'}
      classNames={{
        control: ({ isFocused, menuIsOpen }: ClassNameState) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
            menuIsOpen && controlStyles.menuOpen
          ),
        menu: () => menuStyles,
        input: () => selectInputStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        noOptionsMessage: () => noOptionsMessageStyles,
        option: ({ isFocused }: { isFocused: boolean }) => optionStyles,
      }}
      components={{ DropdownIndicator, MultiValueRemove, ClearIndicator }}
    />
  )
}
