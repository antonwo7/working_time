import React, {Component} from 'react'
import {connect} from "react-redux";
import {IState} from "../../types/main";
import LightCloseIcon from "../common/icons/LightCloseIcon";
import EditIcon from "../common/icons/EditIcon";
import Button from "../common/elements/Button";
import SectionLoading from "../common/SectionLoading";
import {IDay} from "../../types/days";
import {addDayAction, loadDaysAction, removeDayAction} from "../../actions/days";
import {
    dateFormat,
    dateParse,
    getCurrentMonth,
    getCurrentYear,
    getDates,
    getHours,
    getMonthNameList
} from "../../functions/days";
import Select from "../common/elements/Select";
import classNames from "classnames";
import store from '../../reducers';
import Input from "../common/elements/Input";
import DownloadIcon from "../common/icons/DownloadIcon";
import auth from "../../reducers/auth";
import {IUser} from "../../types/users";

const closeButton = {
    className: "text-sm focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}
const editButton = {
    className: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}

const th = {
    className: "border-b dark:border-slate-600 font-medium px-2 pt-3 pb-3 text-slate-800 dark:text-slate-200 text-left bg-gray-300"
}

const td = {
    className: "border-b border-slate-100 dark:border-slate-700 px-2 pt-2 pb-2 text-slate-500 dark:text-slate-400"
}

const table = {
    classNames: "border-collapse table-fixed w-full text-sm mt-3"
}

const headerNames = ['Dia', 'Total horas', 'Horas comp.', 'Horas extras', 'Horas a com', 'Entrada', 'Salida', 'Entrada', 'Salida', 'Firma']

const WeekendDay = ({ date }: {date: string}) => {
    const values = [date, '', '', '', '', '', '', '', '', '']
    return (
        <tr className="hover:bg-blue-200 bg-gray-200">
            {values.map(value => <td className={td.className}>{value}</td>)}
        </tr>
    )
}

const yearOptions = {
    2023: '2023',
    2024: '2024'
}

class Day extends Component<{ dayList: Array<IDay>, removeDayHandler: Function, addDayHandler: Function, date: { date: string, weekend: boolean } }, {editingDay: null | IDay, day: IDay}> {
    constructor(props: { dayList: Array<IDay>, removeDayHandler: Function, addDayHandler: Function, date: { date: string, weekend: boolean, day: IDay | null } }) {
        super(props)
        this.state = {
            editingDay: null,
            day: this.checkDate(this.props.date.date)
        }
    }

    removeDay = (id?: number) => {
        if (!id) return;
        this.props.removeDayHandler(id)
    }

    defaultDay() {
        return {id: 0, date: this.props.date.date, work_from: '', work_to: '', siesta_from: '', siesta_to: ''}
    }

    checkDate(dateString: string): IDay {
        const found = this.props.dayList.filter(day => String(day.date) === dateString)
        if (found.length === 0) return this.defaultDay()

        return found[0]
    }

    changeEditingDay(field: string, value: string) {
        let editingDay = this.state.editingDay
        if (!field || !editingDay || !(field in editingDay)) return;

        this.setState({editingDay: {...editingDay, [field]: value}})
    }

    saveDay() {
        this.props.addDayHandler(this.state.editingDay)
        this.setState({editingDay: null})
    }

    render() {
        const day = this.checkDate(this.props.date.date)
        const date = this.props.date

        if (date.weekend) {
            return <WeekendDay date={date.date}/>
        }

        let userHours = store.getState().auth?.authUser?.hours
        if (!userHours) userHours = 8

        const hoursTotal = !this.state.editingDay
            ? getHours(day.work_from, day.siesta_from) + getHours(day.siesta_to, day.work_to)
            : getHours(this.state.editingDay.work_from, this.state.editingDay.siesta_from) + getHours(this.state.editingDay.siesta_to, this.state.editingDay.work_to)

        let hoursExtra = Math.round((hoursTotal - userHours) * 100) / 100
        if (hoursExtra < 0 ) hoursExtra = 0

        let hoursWork = Math.round((hoursTotal < userHours ? hoursTotal : userHours) * 100) / 100

        return (
            <tr className={ classNames("hover:bg-blue-200", {'bg-gray-200': date.weekend}) }>
                <td className={td.className}>{date.date}</td>
                <td className={td.className}>{`${hoursWork}h`}</td>
                <td className={td.className}> </td>
                <td className={td.className}>{`${hoursExtra}h`}</td>
                <td className={td.className}> </td>
                <td className={td.className}>{this.state.editingDay ? <Input type="time" onChange={(v: string) => this.changeEditingDay('work_from', v)} value={this.state.editingDay.work_from} /> : day.work_from}</td>
                <td className={td.className}>{this.state.editingDay ? <Input type="time" onChange={(v: string) => this.changeEditingDay('siesta_from', v)} value={this.state.editingDay.siesta_from} /> : day.siesta_from}</td>
                <td className={td.className}>{this.state.editingDay ? <Input type="time" onChange={(v: string) => this.changeEditingDay('siesta_to', v)} value={this.state.editingDay.siesta_to} /> : day.siesta_to}</td>
                <td className={td.className}>{this.state.editingDay ? <Input type="time" onChange={(v: string) => this.changeEditingDay('work_to', v)} value={this.state.editingDay.work_to} /> : day.work_to}</td>

                <td className={td.className}>
                    {!this.state.editingDay ? (
                        !day.id
                            ? <button type="button" { ...editButton } onClick={() => this.setState({editingDay: day})} ><EditIcon width={3} height={3}/></button>
                            : <>
                                <button type="button" { ...editButton } onClick={() => this.setState({editingDay: day})} ><EditIcon width={3} height={3}/></button>
                                <button type="button" { ...closeButton } onClick={() => this.removeDay(day.id)} ><LightCloseIcon width={3} height={3}/></button>
                                <span>Firmado</span>
                            </>
                    ) : (
                        <>
                            <button type="button" { ...editButton } onClick={() => this.saveDay()} ><DownloadIcon width={3} height={3}/></button>
                            <button type="button" { ...closeButton } onClick={() => this.setState({editingDay: null})} ><LightCloseIcon width={3} height={3}/></button>
                        </>
                    )}

                </td>
            </tr>
        )
    }
}

class Days extends Component<
        { dayList: Array<IDay>, addDayAction: Function, removeDayAction: Function },
        { loading: boolean, month: number, year: number, monthNames: {[key: number]: string}, dateList: Array<{ date: string, weekend: boolean }> }
    > {
    constructor(props: { dayList: Array<IDay>, addDayAction: Function, removeDayAction: Function }) {
        super(props)

        const currentMonth = getCurrentMonth()
        const currentYear = getCurrentYear()
        const dateList = getDates(currentMonth, currentYear)

        this.state = {
            loading: false,
            month: currentMonth,
            year: currentYear,
            monthNames: this.getMonthOptions(),
            dateList: dateList
        }
    }

    getMonthOptions() {
        const monthNameOptions: {[key: number]: string} = {}
        getMonthNameList().forEach((monthName, index) => monthNameOptions[index + 1] = monthName)
        return monthNameOptions
    }

    addDay = (day: IDay) => {
        this.props.addDayAction(day)
    }

    removeDay = (id: number) => {
        this.props.removeDayAction(id)
    }

    changeMonth(monthNumber: number) {
        this.setState({ month: monthNumber })
    }

    changeYear(year: number) {
        this.setState({ year: year })
    }

    filter() {
        const dates = getDates(this.state.month, this.state.year)

        this.setState({ loading: true, month: this.state.month })

        setTimeout(() => {
            store.dispatch(loadDaysAction(this.state.month, this.state.year, () => {
                this.setState({ loading: false, dateList: dates })
            }))
        }, 1000)
    }

    render() {

        return (
            <>
                {this.state.loading && <SectionLoading opacity={true} />}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="flex">
                            <Select inputClassName="mr-2" options={yearOptions} onChange={(value: number) => this.changeYear(value)} value={this.state.year} />
                            <Select inputClassName="mr-2" options={this.state.monthNames} onChange={(value: number) => this.changeMonth(value)} value={this.state.month} />
                            <Button type="button" label="Filtrar" onClick={() => this.filter()} loading={this.state.loading} />
                        </div>
                        <table className="border-collapse table-fixed w-full text-sm mt-3">
                            <thead>
                                <tr>
                                    {headerNames.map((name, i) => <th key={i} {...th}>{name}</th>)}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                                {this.state.dateList && this.state.dateList.map((date: { date: string, weekend: boolean }, index: number) => {
                                    return (
                                        <Day removeDayHandler={this.removeDay} addDayHandler={this.addDay} date={date} dayList={this.props.dayList} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default connect((state: IState) => {
    return {
        dayList: state.days.dayList
    }
}, { removeDayAction, addDayAction })
(Days)