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
        className="h-[32px] w-[110px] rounded-md border-none bg-[#e5e5e5] py-[6px] text-sm font-semibold text-[#404040] focus:ring-[#121212] dark:bg-[#383838] dark:text-[#d4d4d4] dark:focus:ring-[#dcdcdc]"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  )
}

export default ThemeSwitch
