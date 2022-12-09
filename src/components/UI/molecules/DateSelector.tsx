import React, { useState, useEffect } from "react";
import DropDown from "../atoms/DropDown";

export default function DateSelector({
    date,
    setDate,
    years,
}: {
    date: { month: number; year: number };
    setDate: any;
    years: { year: number; months: { label: string; value: number }[] }[];
}) {
    if (!date || !years) {
        return <></>;
    }
    const [year, setYear] = useState(date.year);
    const [month, setMonth] = useState(date.month);

    const yearsInCorrectFormat = years.map((year) => ({
        label: year.year.toString(),
        value: year.year,
    }));

    const [months, setMonths] = useState(
        years.find((y) => y.year === year)?.months || []
    );

    useEffect(() => {
        setMonths(years.find((y) => y.year === year)?.months || []);
    }, [year, years]);

    // useEffect(() => {
    //     // console.log("months", months);
    // }, [months]);

    useEffect(() => {
        setDate({ month, year });
    }, [month, year]);

    // useEffect(() => {
    //     console.log("years", yearsInCorrectFormat);
    // }, [years]);

    return (
        <>
            <DropDown
                name="months"
                startValue={month}
                data={months}
                setChange={setMonth}
            />
            <DropDown
                name="years"
                startValue={year}
                data={yearsInCorrectFormat}
                setChange={setYear}
            />
        </>
    );
}
