"use client";
import { ManagersCard, NoData } from "@/shared";
import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { useUnit } from "effector-react";
import {
  $administrationDetail,
  $administrationList,
  AdminEnum,
  fetchInfinityAdministrationFx,
  getInfiniteAdministrationEv,
} from "@/entities";
import { useEffect, useState } from "react";
import AboutLayout from "@/widgets/layout/ui/about";

const ManagementPage = () => {
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
          (item) => item.administration_type === activeBtn
      );
      setData(newData);
  }, [results, activeBtn]);
  return (
    <AboutLayout title={t("management")}>
      <Grid style={{ flexDirection: "column" }} gap={3} container>
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item) => (
            <ManagersCard
              key={item.id}
              image={String(item.file)}
              name={item.full_name}
              phoneNumber={item.phone_number}
              email={item.email}
              admissionDay={item.reception_day}
              staj={item.job_description}
              permission={item.permission}
              jobTitle={item.role}
            />
          ))}
      </Grid>

      <NoData show={data?.length === 0 || isLoading} loading={isLoading} />
    </AboutLayout>
  );
};
export default ManagementPage;
