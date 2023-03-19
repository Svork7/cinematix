import React, { useState } from 'react'
import { PropsWithChildren } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = { theme: Theme; toggleTheme: () => void }

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const backgroundColor = theme === 'light' ? '#dedede' : '#333333'
  document.body.style.backgroundColor = backgroundColor

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
