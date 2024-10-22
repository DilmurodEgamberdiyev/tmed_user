"use client";
import { BaseButton, Icon, ManagersCard, MiniLoader, NoData } from "@/shared";
import sx from "./style/main.module.scss";
import { AdministrationModal } from "@/entities/admin/ui/administrationModal";
import {
  $administrationDetail,
  $administrationList,
  AdminEnum,
  AdminTypes,
  deleteAdministrationEv,
  fetchInfinityAdministrationFx,
  getAdministrationEv,
  getInfiniteAdministrationEv,
  toggleAdministrationModalEv,
} from "@/entities";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";

const DashboardPage = () => {
  const [results, isLoading, administrationDetail] = useUnit([
    $administrationList,
    fetchInfinityAdministrationFx.pending,
    $administrationDetail,
  ]);
  const [data, setData] = useState<AdminTypes[]>([]);

  const handleEdit = (id: string) => {
    getAdministrationEv(id);
    // console.log(administrationDetail);
  };
  const handleDelete = (id: string) => {
    deleteAdministrationEv(id);
  };

  const [activeBtn, setActiveBtn] = useState<AdminEnum>(AdminEnum.LEADERSHIP);

  const handleChange = (id: AdminEnum) => {
    setActiveBtn(id);
    const newResults = results.filter((item) => item.administrationType === id);
    setData(newResults);
  };

  useEffect(() => {
    getInfiniteAdministrationEv();
  }, []);
  

  useEffect(() => {
    const newData = results.filter((item) => item.administrationType === activeBtn);
    setData(newData);
  }, [results, activeBtn]);
  return (
    <div className={sx.dashboardPage}>
      <div className={sx.topWrap}>
        <h2>Employees</h2>
        <button
          onClick={() => toggleAdministrationModalEv()}
          className="button"
        >
          <BaseButton
            active={true}
            icon={<Icon.AddIcon />}
            text={"Create employee"}
          />
        </button>
      </div>

      <div style={{width: '25%'}} className={sx.wrap}>
        <button className="button" onClick={() => handleChange(AdminEnum.ADMINISTRATION)}>
          <BaseButton active={activeBtn === AdminEnum.ADMINISTRATION} text="Administration" />
        </button>
        <button
          className="button"
          onClick={() => handleChange(AdminEnum.LEADERSHIP)}
        >
          <BaseButton
            active={activeBtn === AdminEnum.LEADERSHIP}
            text="Leadership"
          />
        </button>
      </div>

      <div className={sx.bottomWrap}>
        {data.length > 0 && !isLoading &&
          data.map((item) => (
            <ManagersCard
              key={item.id}
              image={String(item.image)}
              name={item.fullName}
              phoneNumber={item.phoneNumber}
              email={item.email}
              admissionDay={item.receptionDay}
              staj={item.jobDescription}
              permission={item.permission}
              jobTitle={item.role}
              type={item.administrationType}
              editManager={() => handleEdit(String(item.id))}
              deleteManager={() => handleDelete(String(item.id))}
            />
          ))}
      </div>
      <NoData show={data.length === 0 || isLoading} loading={isLoading} />
      <AdministrationModal />
    </div>
  );
};

export default DashboardPage;
