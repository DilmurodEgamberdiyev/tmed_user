import {createEvent, createStore, sample,createEffect} from "effector";
import { InstitutionType } from "../types";
import { institutionApi } from "../api";
import { ApiListType,QueryParamsType } from "@/shared/api";
import { apiListDefaultData } from "@/shared/data/api";

export const fetchInstitutionInfinityListFx = createEffect({handler: institutionApi.fetchInstitutionList})
export const getInstitutionInfinityListEv = createEvent<QueryParamsType>()
export const $institutionList = createStore<ApiListType<InstitutionType>>(apiListDefaultData)
$institutionList
    .on(fetchInstitutionInfinityListFx.done, (state, {params, result: {data}}) => {
        return {...state, ...data, results: params.offset ? [...state.results, ...data.results] : data.results}
    })

sample({
    clock: getInstitutionInfinityListEv,
    target: fetchInstitutionInfinityListFx
})