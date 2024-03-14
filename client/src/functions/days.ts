import {addDayAPIUrl, getDaysAPIUrl, removeDayAPIUrl} from "../config";
import {getTokenClientRequest} from "./auth";
import {IDay} from "../types/days";
const date = require('date-and-time')

export function dateFormat(dateValue: Date) {
    return date.format(dateValue, 'DD-MM-YYYY')
}

export function dateParse(dateValue: string) {
    dateValue = date.parse(dateValue, 'DD-MM-YYYY')
    return dateValue ? dateValue : new Date()
}

export function getMonthNameList() {
    const months = []
    for (let i = 1; i <= 12; i++) {
        months.push(getMonthName(i))
    }

    return months
}

export function getCurrentMonth() {
    const date = new Date()
    return date.getMonth() + 1
}

export function getCurrentYear() {
    const date = new Date()
    return date.getFullYear()
}

export function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', { month: 'long' });
}

function isWeekend(date: Date) {
    const day = date.getDay()
    return (day === 6 || day === 0)
}

function getMonthLastDay(month: number, year: number): Date {
    const date = new Date()
    return new Date(year, month, 0)
}

function getMonthFirstDay(month: number, year: number): Date {
    const date = new Date()
    return new Date(year, month - 1, 1)
}

export function getDates(month: number, year: number): Array<{ date: string, weekend: boolean }> {
    const dates: Array<{ date: string, weekend: boolean }> = []
    const firstDate = getMonthFirstDay(month, year)
    const lastDate = getMonthLastDay(month, year)

    while (firstDate <= lastDate) {
        dates.push({date: dateFormat(firstDate), weekend: isWeekend(firstDate)})
        firstDate.setDate(firstDate.getDate() + 1)
    }

    return dates
}

export function getHours(from: string, to: string) {
    if (!from || !to) return 0;

    const fromMinutes = parseInt(from.split(':')[0]) * 60 + parseInt(from.split(':')[1])
    const toMinutes = parseInt(to.split(':')[0]) * 60 + parseInt(to.split(':')[1])
    const diff = parseFloat(((toMinutes - fromMinutes) / 60).toFixed(2))
    return diff >= 0 ? diff : 0;
}

export async function addDayServerRequest(day: IDay, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(addDayAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ day }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}

export async function getDaysServerRequest(month: number, year: number, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(getDaysAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ month, year }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}

export async function removeDayServerRequest(id: number, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(removeDayAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}