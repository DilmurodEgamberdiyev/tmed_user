// @ts-nocheck
"use client";
import { $infoDetail, getInfoDetailEv } from "@/entities";
import { NewsLayout } from "@/widgets/layout";
import { Box, SxProps } from "@mui/material";
import { useUnit } from "effector-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { TimeFormatter } from "@/shared";
import { NewsLayoutWithoutNavbar } from "@/widgets/layout/ui/news/newsLayoutWithoutNavbar";

export default function InfoDetail() {
  const t = useTranslations("News");
  const params = useParams();

  const [results] = useUnit([$infoDetail]);

  useEffect(() => {
    getInfoDetailEv(params.id);
  }, [params.id]);

  return (
    <NewsLayoutWithoutNavbar>
      <Box sx={sx}>
      <h1>{results?.title}</h1>
        <div className="image">
          <Image
            width={100}
            height={100}
            src={results?.main_photo}
            alt="TMED NEWS"
          />
        </div>

        <i
          style={{
            display: "block",
            textAlign: "right",
            marginTop: "10px",
            opacity: 0.7,
          }}
        >
          {TimeFormatter.timeFormatterFn(results?.created_at, "uz")}
        </i>
        <div>{parse(String(results?.content))}</div>

        {results?.images && (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination]}
            className="headerSwiper"
          >
            {results.images.map((item) => (
              <SwiperSlide key={item?.id}>
                <Image
                  src={item?.url}
                  alt="T MED"
                  width={0}
                  height={0}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </NewsLayoutWithoutNavbar>
  );
}

const sx: SxProps = {
  margin: "12px 0",
  overflow: "hidden",

  ".image": {
    textAlign: 'center',

    'img': {
      width: "60%",
      height: "400px",
      objectFit: 'contain',
    }
  },

  figure: {
    img: {
      width: "100%",
      height: "100%",
    },
  },

  h1: {
    margin: "20px 0 !important",
    lineHeight: "43px",
  },

  ".swiper": {
    height: "500px",
  },

  ".swiper-pagination": {
    bottom: "0px !important",
  },

  ".headerSwiper": {
    marginTop: "20px",
  },
};
