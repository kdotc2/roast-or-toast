import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative flex items-center justify-between">
      <div>Theme</div>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="h-[32px] w-[110px] rounded border-none bg-gray-200 py-[6px] text-sm font-semibold text-gray-700 focus:ring-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-100"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  )
}

export default ThemeSwitch
