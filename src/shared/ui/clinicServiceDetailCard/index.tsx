import sx from './clinic-service-card.module.scss'
import {ServiceType} from "@/entities/clinic-services";
import {FC} from "react";
import {BaseButton} from "@/shared";

type ClinicServiceCardDetailProps = {
    service: ServiceType,
}
export const ClinicServiceCardDetail: FC<ClinicServiceCardDetailProps> = ({service}) => {
    return (
        <div className={sx.card}>
            <BaseButton text={`${service.name}`}/>
        </div>
    )
}