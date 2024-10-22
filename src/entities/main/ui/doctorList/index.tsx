// @ts-nocheck
'use client'
import Image from 'next/image'
import doctor from '@/assets/images/shifokor.png'
import sx from './style.module.scss'
import { useEffect, useState } from 'react'
import httpClient from '@/shared/api/axios'
import { useLocale } from 'next-intl'
import { MiniLoader } from '@/shared'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { useUnit } from 'effector-react'
import { $orgSlug } from '@/entities/admin'

export const DoctorList = () => {
  const [orgSlug] = useUnit([$orgSlug])
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const getOrgService = async () => {
      setIsLoading(true)
      const { data } = await httpClient.get(`/${locale}/api/v1/organizations/${orgSlug}/specialists/`)
      setDoctors(data)
      setIsLoading(false)
    }
    getOrgService()
  }, [locale, orgSlug])

  return (
    <div>
      {isLoading && <MiniLoader />}
      <Swiper
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        slidesPerView={3}
        loop={false}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        className={sx.doctorList}>
        {doctors &&
          !isLoading &&
          doctors.map(item => (
            <SwiperSlide className={sx.swiperSlide} key={item.id}>
              <div className={sx.cards}>
                <Image src={doctor} alt='T MED Client Doctors' />
                <div className={sx.wrap}>
                  <p className={sx.name}>
                    {item.lastname} {item.name}
                  </p>
                  <p className={sx.title}>{item?.position?.title}</p>
                  <p className={sx.title}>
                    Ish tajribasi: <span>3 yil</span>
                  </p>
                  <p className={sx.title}>
                    Ish vaqti: <span>09:00-18:00</span>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
