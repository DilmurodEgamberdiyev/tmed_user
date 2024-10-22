'use client'
import sx from '@/widgets/layout/ui/main/style/main.module.scss'
// import { Icon } from '@/shared'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { changeLanguageEv } from '@/entities'
import Cookies from 'js-cookie'
import Image from 'next/image'
import uz from '@/assets/images/uzb.png'
import ru from '@/assets/images/ru.png'
import en from '@/assets/images/en.png'

export const NavbarSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const local = useLocale()
  const handleChange = (e: string) => {
    const lang = e + pathname.substring(3)
    router.replace(`/${lang}`)
    changeLanguageEv(e)
    Cookies.set('TMED_LOCALE', e)
  }
  return (
    <div className={sx.wrap}>
      <Image src={local === 'en' ? en : local === 'ru' ? ru : uz} alt='' />
      {/* <Icon.Lang /> */}
      <h5>{local === 'en' ? 'En' : local === 'ru' ? 'Ру' : "O'z"}</h5>
      <div className={sx.selectWrap}>
        <span onClick={() => handleChange('ru')}>Ру</span>
        <span onClick={() => handleChange('uz')}>O'z</span>
        <span onClick={() => handleChange('en')}>En</span>
      </div>
      {/*<select defaultValue={local} onChange={handleChange} className={sx.select}>*/}
      {/*    <option value="uz">Uz</option>*/}
      {/*    <option value="ru">Ru</option>*/}
      {/*    <option value="en">En</option>*/}
      {/*</select>*/}
    </div>
  )
}
