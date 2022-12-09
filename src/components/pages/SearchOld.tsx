import React, { useEffect, useState } from "react";
import DateSelector from "../UI/molecules/DateSelector";
import Stats from "../UI/organisms/Stats";
import { DateHeader } from "../UI/organisms/DateHeader";
import Journeys from "../UI/organisms/Journeys";
import { trpc } from "../../trpc";
import { useUser } from "../UserContext";

export function Search({
    years,
}: {
    years: { year: number; months: { label: string; value: number }[] }[];
}) {
    const profile = useUser();
    useEffect(() => {
        console.log("profile", profile);
    }, [profile]);

    if (profile !== undefined) {
        return (
            <DisplayJourneys years={years} profile={profile}></DisplayJourneys>
        );
    } else {
        return <></>;
    }
}

export function DisplayJourneys({
    profile,
    years,
}: {
    profile: {
        id: string;
        email: string;
        googleId: string;
        imageUrl: string;
        name: string;
        // createdAt: string;
    };
    years: { year: number; months: { label: string; value: number }[] }[];
}) {
    const [date, setDate] = useState({ month: 1, year: 2022 });

    const data = trpc.useQuery([
        "getTrips",
        {
            userId: profile.id,
            year: date.year,
            month: date.month,
        },
    ]);

    useEffect(() => {
        console.log("rendering trips data", data.data);
    }, [data.data]);

    if (data) {
        return (
            <>
                <DateHeader
                    years={years}
                    date={date}
                    setDate={setDate}
                ></DateHeader>

                <div className="container mx-auto">
                    <div className="flex flex-col">
                        <Journeys>{data.data}</Journeys>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <DateHeader
                    years={years}
                    date={date}
                    setDate={setDate}
                ></DateHeader>
            </>
        );
    }
}
