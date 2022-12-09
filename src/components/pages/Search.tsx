import React, { useEffect, useState } from "react";

import { DateHeader } from "../UI/organisms/DateHeader";
import Journeys from "../UI/organisms/Journeys";
import Uniques from "../UI/organisms/Uniques";
import { trpc } from "../../trpc";
import { useUser } from "../UserContext";
import DropDown from "../UI/atoms/DropDown";
import Loading from "../UI/atoms/Loading";

export function Search({
    years,
}: {
    years: { year: number; months: { label: string; value: number }[] }[];
}) {
    const profile = useUser();

    const [date, setDate] = useState({ month: 1, year: 2022 });
    const utils = trpc.useContext();

    const data = trpc.useQuery([
        "getTrips",
        {
            userId: profile.id,
            year: date.year,
            month: date.month,
        },
    ]);

    const searchTrips = trpc.useQuery([
        "searchTrips",
        {
            userId: profile.id,
            year: date.year,
            month: date.month,
            search: "all.unique",
        },
    ]);

    const getLocations: any = trpc.useQuery([
        "getLocations",
        {
            userId: profile.id,
            year: date.year,
            month: date.month,
            search: "all.unique",
        },
    ]);

    const update = trpc.useMutation("updateTrip");
    const updateTrip = async (id: string, classification: string) => {
        update.mutate(
            {
                id: id,
                classification: classification,
            },
            {
                onSuccess: () => {
                    utils.invalidateQueries();
                },
            }
        );

        return updateTrip;
    };

    useEffect(() => {
        console.log("rendering trips data", data.data);
    }, [data.data]);

    useEffect(() => {
        console.log("searchTrips", searchTrips.data);
    }, [searchTrips.data]);

    useEffect(() => {
        console.log("getLocations", getLocations.data);
    }, [getLocations.data]);

    const [startLocationFilter, setSLFilter] = useState(0);
    const [endLocationFilter, setELFilter] = useState(0);

    if (!getLocations?.data) {
        return <Loading />;
    }

    if (data) {
        return (
            <>
                <DateHeader
                    date={date}
                    years={years}
                    setDate={setDate}
                ></DateHeader>

                <div className="container mx-auto">
                    <div className="flex flex-row justify-center items-center mx-5">
                        <DropDown
                            name="startLocation"
                            startValue={0}
                            data={getLocations?.data?.sL}
                            setChange={setSLFilter}
                        />
                        <DropDown
                            name="endLocation"
                            startValue={0}
                            data={getLocations?.data?.eL}
                            setChange={setELFilter}
                        />
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="flex flex-col">
                        <Uniques updateTrip={updateTrip}>
                            {searchTrips.data}
                        </Uniques>
                        {/* <Journeys updateTrip={updateTrip}>{data.data}</Journeys> */}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <DateHeader
                    date={date}
                    years={years}
                    setDate={setDate}
                ></DateHeader>
            </>
        );
    }
}
