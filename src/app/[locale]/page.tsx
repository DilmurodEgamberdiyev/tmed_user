// @ts-nocheck  
"use client";
import { Grid, SxProps } from "@mui/material";
import Link from "next/link";
import { AppPathEnum, BaseButton } from "@/shared";
import { FeedbackForm } from "@/entities/main/ui/feedbackForm";
import Image from "next/image";
import railwayLogo from "@/assets/images/railwayLogo.svg";
import {
  $infoList,
  CentralHospital,
  DoctorList,
  getInfoListEv,
  HeaderBanner,
  Institution,
  ServiceList,
  Statistics,
} from "@/entities";
import sx from "./style/style.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { NewsNavbar } from "@/widgets/layout/ui/news/organisms";
import { useEffect } from "react";
import { useUnit } from "effector-react";

export default function Home() {
  const t = useTranslations("Main");
  const locale = useLocale();

  useEffect(() => {
    getInfoListEv();
  }, []);
  const [results] = useUnit([$infoList]);

  return (
    <div>
      <div className="container">
        <HeaderBanner />

        <Grid marginTop={"56px"} className={sx.wrap}>
          <p className={"title"}>
            <Image src={railwayLogo} alt="T MED Client Institution" />
            {t("institution")}
          </p>
          <Link href={`${locale + AppPathEnum.INSTITUTION}`}>
            <BaseButton text={t("seeAll")} active={true} />
          </Link>
        </Grid>

        <Institution />
      </div>

      <CentralHospital />

      <div className="container">
        {/* <Managers/> */}
        <div style={{ marginTop: "40px" }}></div>

        <Grid className={sx.wrap}>
          <p className={"title"}>{t("clinicService")}</p>
          {/* <Link
            className={sx.link}
            href={`/${locale + AppPathEnum.CLINIC_SERVICE}`}
          >
            <BaseButton text={t("seeAll")} active={true} />
          </Link> */}
        </Grid>

        <ServiceList />

        <Grid className={sx.wrap}>
          <p className={"title"}>{t("clinicDoctors")} </p>
          {/* <Link className={sx.link} href={"/"}>
            <BaseButton text={t("seeAll")} active={true} />
          </Link> */}
        </Grid>

        <DoctorList />

        {/* <Grid className={sx.wrap}>
                    <p className={'title'}>{t('news')}</p>
                    <Link className={sx.link} href={`/${locale + AppPathEnum.NEWS}`}>
                        <BaseButton text={t('seeAll')} active={true}/>
                    </Link>
                </Grid> */}

        {/* <News/> */}

        <NewsNavbar title={t("news")} />
        <Grid sx={sxProps} container spacing={4}>
          {results?.results && results?.results.length > 3 && results?.results?.slice(0,3)?.map((item) => (
            <Grid className="card" key={item.id} item xs={12} md={4}>
              <Link href={`/${locale}/news/info/${item.id}`}>
                <Image
                  width={100}
                  height={100}
                  src={item.main_photo}
                  alt="TMED CLIENT"
                />
                <h3>{item?.title}</h3>
                <p>
                  {item?.short_description.length > 200
                    ? item?.short_description.substring(0, 200) + "..."
                    : item?.short_description}
                </p>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Statistics />

        <Grid className={sx.wrap}>
          <p className={"title"}>{t("sendFeedback")}</p>
        </Grid>

        <FeedbackForm />
      </div>
    </div>
  );
}

const sxProps: SxProps = {
  marginTop: "20px",
  ".card": {
    transition: "all 0.1s ease-in-out",

    "&:hover": {
      translate: "0 -10px",

      a: {
        color: "#10338c",
      },
    },
  },
  img: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },

  h3: {
    margin: "12px 0 !important",
  },
};
