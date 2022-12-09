import React, { useEffect, useState } from "react";
import DateSelector from "../molecules/DateSelector";

export const DateHeader = ({
    date,
    setDate,
    years,
}: {
    date: { month: number; year: number };
    setDate: any;
    years: { year: number; months: { label: string; value: number }[] }[];
}) => {
    return (
        <div className="navbar-center z-10">
            <div className="container mx-auto">
                <div className="flex justify-center content-center">
                    <DateSelector date={date} years={years} setDate={setDate} />
                </div>
            </div>
        </div>
    );
};
