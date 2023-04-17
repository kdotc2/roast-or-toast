import Select, {
  DropdownIndicatorProps,
  components,
  MultiValueRemoveProps,
  ClearIndicatorProps,
  ActionMeta,
} from 'react-select'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

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
      <XMarkIcon className="h-3 w-3 stroke-[2.5] hover:text-gray-800 hover:dark:text-gray-200" />
    </components.MultiValueRemove>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <XMarkIcon className="h-4 w-4 stroke-[2.5] hover:text-gray-800 hover:dark:text-gray-200" />
    </components.ClearIndicator>
  )
}
const controlStyles = {
  base: 'min-h-[40px] rounded border border-gray-300 bg-gray-50 pl-3 pr-2 text-sm text-gray-400 hover:cursor-pointer dark:border-gray-600 dark:bg-[#2b2b2b] dark:text-gray-500',
  focus: 'border border-gray-900 dark:border-[#f5f5f4]',
  nonFocus: 'border-gray-300 dark:border-gray-600',
  menuOpen: 'rounded-b-none',
}

const menuStyles =
  'rounded rounded-t-none border border-t-0 border-gray-900 bg-gray-50 p-2 text-sm dark:border-gray-100 dark:bg-[#2b2b2b] dark:text-gray-200'

const selectInputStyles = 'text-gray-900 dark:text-gray-200'

const dropdownIndicatorStyles = 'hover:text-gray-800 hover:dark:text-gray-200'

const noOptionsMessageStyles =
  'flex px-3 py-2 text-sm text-gray-500 dark:text-gray-400'

const multiValueStyles =
  'my-1 mr-2 items-center gap-2 rounded-[2px] bg-gray-200 px-2 text-xs text-gray-900 dark:bg-gray-700 dark:text-gray-200'

const multiValueLabelStyles = 'mr-1'

const multiValueRemoveStyles =
  '-mx-2 rounded-r-[2px] py-1.5 px-1.5 hover:bg-gray-300 hover:dark:bg-gray-600'

const indicatorSeparatorStyles = 'm-2 bg-gray-300 dark:bg-gray-600'

const optionStyles = {
  base: 'rounded px-3 py-2 text-sm hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700',
  focus: 'hover:bg-gray-200 active:bg-gray-200 dark:bg-gray-900',
}

type SelectOptionType = { label: string; value: string }

const options = [
  { value: 'Roast Me', label: 'Roast Me' },
  { value: 'Toast Me', label: 'Toast Me' },
]

type TagSelectionProps = {
  onTagSelection: (
    // option: readonly Option[],
    // actionMeta: ActionMeta<Option>
    event: any
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
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none',
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible',
        }),
        control: (base) => ({
          ...base,
          transition: 'none',
        }),
      }}
      noOptionsMessage={() => 'No tags left...'}
      classNames={{
        control: ({ isFocused, menuIsOpen }) =>
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
        option: ({ isFocused }) => optionStyles.base,
      }}
      components={{ DropdownIndicator, MultiValueRemove, ClearIndicator }}
    />
  )
}
