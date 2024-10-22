'use client'
import { Grid } from '@mui/material'
import Link from 'next/link'
import { AppPathEnum, BaseButton, Icon, NavLink } from '@/shared'
import sx from '../style/main.module.scss'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

export const Navbar = () => {
  const t = useTranslations('Main')
  const local = useLocale()
  const [burger, setBurger] = useState(false)

  return (
    <Grid className={sx.navbar} container>
      <Grid alignItems={'center'} display={'flex'} justifyContent={'space-between'} item xs={1.5}>
        <Link href={`/${local}${AppPathEnum.HOME}`}><Icon.TmedLogo /></Link>
      </Grid>
      <div onClick={() => setBurger(true)} className={sx.burgerOpen}>
        <Icon.Burger />
      </div>
      <Grid className={sx.mobile + ` ${burger ? sx.active : ''}`}  display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'} item xs={10.5}>
        <div onClick={() => setBurger(false)} className={sx.burgerClose}>
          <Icon.BurgerClose />
        </div>

        <div className={sx.wrap}>
          <Link onClick={() => setBurger(false)} href={`/${local}${AppPathEnum.HOME}`}>
            <BaseButton
              text={t('medicalInstitution')}
              icon={
                <Icon.NavBuilding active={NavLink.isActiveNavLink(`/${local}`)} />}
              active={NavLink.isActiveNavLink(`/${local}`)}
            />
          </Link>
          <Link onClick={() => setBurger(false)} href={`/${local}${AppPathEnum.ABOUT}`}>
            <BaseButton
              text={t('aboutUs')}
              active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.ABOUT}`)}
              icon={
                <Icon.NavUserOctagon active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.ABOUT}`)} />} />
          </Link>
          <Link onClick={() => setBurger(false)} href={`/${local}${AppPathEnum.NEWS}/${AppPathEnum.INFO}`}>
            <BaseButton
              text={t('news')}
              active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.NEWS}${AppPathEnum.INFO}`)}
              icon={
                <Icon.NavPlay active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.NEWS}/${AppPathEnum.INFO}`)} />} />
          </Link>
          <Link onClick={() => setBurger(false)} href={`/${local}${AppPathEnum.STREAM}`}>
            <BaseButton
              text={t('stream')}
              active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.STREAM}`)}
              icon={
                <Icon.NavStream active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.STREAM}`)} />} />
          </Link>
          <Link onClick={() => setBurger(false)} href={`/${local}${AppPathEnum.DOCS}`}>
            <BaseButton
              text={t('docs')}
              active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.DOCS}`)}
              icon={
                <Icon.NavBase active={NavLink.isActiveNavLink(`/${local}${AppPathEnum.DOCS}`)} />} />
          </Link>
        </div>

        <div className={sx.mobileContent}>

          <div className={sx.socialWrap}>

            <div className={sx.iconWrap}><a target={'_blank'} rel={'noreferrer'}
                                            href={'https://www.instagram.com/nsurailway'}
            ><Icon.InstagramBold /></a>
              <a target={'_blank'} rel={'noreferrer'} href={'https://www.facebook.com/nsurailways'}
              ><Icon.FacebookBold /></a>
              <a target={'_blank'} rel={'noreferrer'} href={'https://twitter.com/nsurailway'}
              ><Icon.TwitterBold /></a>
              <a target={'_blank'} rel={'noreferrer'} href={'https://t.me/nsurailway'}
              ><Icon.TelegramBold /></a>
              <a target={'_blank'} rel={'noreferrer'} href={'https://www.youtube.com/@nsurailway'}
              ><Icon.YoutubeBold /></a>
            </div>

            <div className={sx.feedbackWrap}>
              <a target={'_blank'} rel={'noreferrer'}
                 href={'https://t.me/Medic_UTY'}><Icon.TelegramGradient /> {t('onlineConsultation')}</a>
              <a href={'tel: +998 (71) 299 98 27'}><Icon.PhoneGradient /> +998 (71) 299 98 27</a>
            </div>

          </div>
          <Icon.TmedLogo />
        </div>
      </Grid>
      {/* <Grid className={sx.profile} item xs={0.6}>
        <Link href={`/${local}${AppPathEnum.ADMIN}`}>
          <BaseButton
            active={true}
            icon={
              <Icon.NavProfile
                active={true}
              />} />
        </Link>
      </Grid> */}
      <div onClick={() => setBurger(false)} className={sx.blur}></div>
    </Grid>
  )
}