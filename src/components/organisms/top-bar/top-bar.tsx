import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import '@/styles/colors.css'
import { toggleLanguage } from '@/styles/Translation'
import { Link } from '@tanstack/react-router'
import styles from './topbar.module.scss'
import logo from '@/assets/gallery/logo.png'

export const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [rotation, setRotation] = useState<number>(0)
  const [languageSelected, setLanguageSelected] = useState<string>(
    i18n.language
  )
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleLanguageChange = useCallback(() => {
    const newLanguage = toggleLanguage(languageSelected, i18n)
    setLanguageSelected(newLanguage)
  }, [languageSelected, i18n])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const rotateLogo = () => {
    const screenWidth = window.innerWidth
    const rotation = screenWidth > 720 ? screenWidth / 12 + 232 : 360
    setRotation(rotation)
  }

  useEffect(() => {
    window.addEventListener('resize', rotateLogo)
    rotateLogo()
    return () => {
      window.removeEventListener('resize', rotateLogo)
    }
  }, [])

  return (
    <div className={styles.top_bar}>
      <img
        alt="logo"
        src={logo}
        className={styles.logo}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <h2 className={styles['logo-text']}>AutoBike Store</h2>
      <nav>
        <Link to="/">{t('home')}</Link>
        <button type="button" onClick={handleLanguageChange}>
          {t('language')}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className={styles['theme-toggle']}
        >
          <i className="bi bi-sun" />
        </button>
      </nav>
    </div>
  )
}
