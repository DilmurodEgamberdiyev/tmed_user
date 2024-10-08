// @ts-nocheck
"use client";
import { Grid } from "@mui/material";
import { AdministrationsCard, MiniLoader } from "@/shared";
import sx from "./style.module.scss";
import { useTranslations } from "next-intl";
import { useUnit } from "effector-react";
import {
  $administrationDetail,
  $administrationList,
  AdminEnum,
  AdminTypes,
  fetchInfinityAdministrationFx,
  getInfiniteAdministrationEv,
} from "@/entities/admin";
import { useEffect, useState } from "react";

export const Managers = () => {
  const t = useTranslations("Main");
  const [{ results }, isLoading] = useUnit([
    $administrationList,
    fetchInfinityAdministrationFx.pending,
    $administrationDetail,
  ]);

  const [data, setData] = useState([]);

  const [activeBtn, setActiveBtn] = useState(AdminEnum.LEADERSHIP);

  useEffect(() => {
    getInfiniteAdministrationEv();
  }, []);

  useEffect(() => {
    const newData = results?.filter(
      (item: { administration_type: AdminEnum }) =>
        item.administration_type === activeBtn
    );
    setData(newData);
  }, [results, activeBtn]);
  return (
    <div className={sx.managers}>
      <h1 className={"title"}>{t("management")}</h1>

      <Grid marginTop={4} className={sx.gridWrap} container>
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item) => (
            <AdministrationsCard
              key={item.id}
              image={String(item.file)}
              name={item.full_name}
              phoneNumber={item.phone_number}
              email={item.email}
              admissionDay={item.reception_day}
              staj={item.role}
              permission={item.permission}
              jobTitle={item.job_description}
            />
          ))}

        {isLoading && <MiniLoader />}
      </Grid>
    </div>
  );
};
