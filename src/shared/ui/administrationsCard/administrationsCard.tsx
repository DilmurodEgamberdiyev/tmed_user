import { Grid } from "@mui/material";
import Image from "next/image";
import sx from "./administration.module.scss";
import { FC } from "react";
import { Manager } from "@/shared";
import { useTranslations } from "next-intl";

export const AdministrationsCard: FC<Manager> = ({
  image,
  name,
  phoneNumber,
  admissionDay,
  jobTitle,
  email,
}) => {
  const t = useTranslations("Main");
  return (
    <Grid className={sx.card} item xs={3.82}>
      <div className={sx.myWrap}>
        <Image
          src={image}
          alt="T MED"
          width={0}
          height={0}
          className={sx.image}
        />
        {/* <p className={sx.head}>{jobTitle}</p> */}
        <p className={sx.name}>{name}</p>
        <p className={sx.head}>{t('phone')}:</p>
        <a className={sx.a} href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </a>
        {admissionDay ? (
          <div style={{ marginBottom: "12px" }}>
            <p className={sx.gray}>{t('receptionDays')}:</p>
            <p className={sx.a}>{admissionDay}</p>
          </div>
        ) : null}
        <p className={sx.gray}>{t('mailingAddress')}:</p>
        <p className={sx.a}>{email}</p>
      </div>
    </Grid>
  );
};
