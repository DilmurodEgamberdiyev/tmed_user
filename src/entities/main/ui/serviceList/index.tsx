// @ts-nocheck
'use client'
import { BaseButton, ClinicServiceCardDetail, Icon, MiniLoader, numberFormat } from '@/shared'
import sx from './style.module.scss'
import { useEffect, useState } from 'react'
// import { $serviceList, fetchServiceInfinityFx, getServiceInfinityListEv } from '@/entities/clinic-services'
// import { useUnit } from 'effector-react'
import { useLocale } from 'next-intl'
import httpClient from '@/shared/api/axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { useUnit } from 'effector-react'
import { $orgSlug, changeOrgSlugEv } from '@/entities/admin'

export const ServiceList = () => {
  const [orgs, setOrgs] = useState([])
  const [orgSlug] = useUnit([$orgSlug])
  const [services, setServices] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [servicesLoader, setServicesLoader] = useState(false)
  const locale = useLocale()

  const changeOrgSlug = (e: string) => {
    changeOrgSlugEv(e)
  }

  useEffect(() => {
    const getOrgService = async () => {
      setServicesLoader(true)
      const { data } = await httpClient.get(`/${locale}/api/v1/organizations/${orgSlug}/services/`)
      setServices(data)
      setServicesLoader(false)
    }
    getOrgService()
  }, [locale, orgSlug])

  useEffect(() => {
    const getOrganizations = async () => {
      setIsLoading(true)
      const { data } = await httpClient.get(locale + '/api/v1/organizations/')
      setOrgs(data)
      setIsLoading(false)
    }
    getOrganizations()
    // getServiceInfinityListEv({limit: 12})
  }, [locale])

  // const [{results}, isLoading] = useUnit([$serviceList, fetchServiceInfinityFx.pending])
  return (
    <div>
      {isLoading && <MiniLoader />}
      <Swiper
        className={sx.serviceList + ' clinicSwiper'}
        slidesPerView={5}
        spaceBetween={15}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        // className="mySwiper"
      >
        {orgs &&
          !isLoading &&
          orgs.map(item => (
            <SwiperSlide key={item.id}>
              <div onClick={() => changeOrgSlug(item.slug_name)} className={sx.cards}>
                <BaseButton active={item.slug_name === orgSlug} text={`${item.name}`} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* <Grid className={sx.serviceList} container spacing={2}>
        {orgs &&
          !isLoading &&
          orgs.map(item => (
            <div onClick={() => changeOrgSlug(item.slug_name)} key={item.id} className={sx.cards}>
              <BaseButton active={item.slug_name === orgSlug} text={`${item.name}`} />
            </div>
          ))}
      </Grid> */}

      {servicesLoader && <MiniLoader />}
      <Swiper
        className={sx.serviceList + ' serviceSwiper'}
        slidesPerView={3}
        spaceBetween={15}
        navigation={true}
        breakpoints={{
          0: {
            width: 640,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        modules={[Navigation]}>
        {services &&
          !servicesLoader &&
          services.map(item => (
            <SwiperSlide key={item.id} className={sx.gridWrap}>
              <div className={sx.card + ' cards'}>
                <div className={sx.top}>
                  <h5>{item.product__name}</h5>
                  <Icon.Cart />
                </div>

                <div className={sx.bottom}>
                  <h4>{numberFormat(item.table_price, item.currency_price)}</h4>
                  <div className={sx.wrap}>
                    <h3>Soni:</h3>
                    <h3>34 xizmat</h3>
                  </div>
                  <div className={sx.wrap}>
                    <h3>Davomiyligi:</h3>
                    <h3>20 daqiqa</h3>
                  </div>
                  <div className={sx.wrap}>
                    <h3>Xizmat turi:</h3>
                    <h3>Xizmat</h3>
                  </div>
                  {/* <div className={sx.wrap}>
                    <h3>Tashkilot:</h3>
                    <h3>Markaziy klinik shifoxonasi</h3>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
