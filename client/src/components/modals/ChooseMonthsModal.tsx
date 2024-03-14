import React, {Component} from 'react'
import CloseIcon from "../common/icons/CloseIcon";
import Button from "../common/elements/Button";
import {getCurrentYear, getMonthName} from "../../functions/days";
import Select from "../common/elements/Select";

const yearOptions = {
    2023: '2023',
    2024: '2024'
}

const currentYear = getCurrentYear()

class ChooseMonthsModal extends Component<{ executeHandle: Function, closeHandle: Function, userId: number }, { months: Array<number>, generating: boolean, year: number }> {
    constructor(props: { executeHandle: Function, closeHandle: Function, userId: number }) {
        super(props)

        this.state = {
            months: [],
            generating: false,
            year: currentYear
        }
    }

    execute = () => {
        this.setState({ generating: true })
        this.props.executeHandle(this.state.months, this.state.year, () => this.setState({ generating: false }))
    }

    monthChoose(i: number) {
        if (this.state.months.includes(i)) {
            this.setState({ months: this.state.months.filter(m => m !== i) })
        } else {
            this.setState({ months: [ ...this.state.months, i ] })
        }
    }

    yearChange(value: number) {
        this.setState({ year: value })
    }

    render() {
        return (
            <div id="authentication-modal" aria-hidden="true" className="flex items-center justify-center bg-white fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={() => this.props.closeHandle()} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <CloseIcon />
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-2" action="#">
                                <Select inputClassName="mr-2" options={yearOptions} onChange={(value: number) => this.yearChange(value)} value={this.state.year} />
                                {Array.from(Array(12)).map((_, i: number) => (
                                    <div key={i}>
                                        <label>
                                            <input id={`month-checkbox-${i}`} type="checkbox" className="h-4 mr-3" checked={this.state.months.includes(i + 1)} onChange={() => this.monthChoose(i + 1)} />
                                            {getMonthName(i + 1)}
                                        </label>
                                    </div>
                                ))}
                                <div className="mb-4 mt-3">
                                    <Button type="button" label="Generar PDF" onClick={() => this.execute()} loading={this.state.generating} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseMonthsModal