import {EDaysActionTypes} from "../reducers/types";


export interface IDaysDefaultAction {
    type: TDaysActionType
    callback?: Function | undefined
}
export interface IDaysLoadDaysAction extends IDaysDefaultAction {
    month: number
    year: number
}
export interface IDaysSetDaysAction extends IDaysDefaultAction {
    days?: Array<IDay>
}
export interface IDaysAddDayAction extends IDaysDefaultAction {
    day: IDay
}
export interface IDaysRemoveDayAction extends IDaysDefaultAction {
    dayId: number
}


export type TDaysActionType = (typeof EDaysActionTypes)[keyof typeof EDaysActionTypes]
export type TDaysAction = IDaysDefaultAction | IDaysAddDayAction | IDaysRemoveDayAction | IDaysSetDaysAction | IDaysLoadDaysAction

export interface IDay {
    id?: number,
    date: Date | string | null,
    work_from: string,
    work_to: string,
    siesta_from: string,
    siesta_to: string
}

export interface IDaysState {
    dayList: Array<IDay>
}
export interface IDayProps {
    removeDayAction: Function
    addDayAction: Function
    dayList: Array<IDay>
}
