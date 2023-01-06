import React, { useEffect, useState } from "react";

import { DateHeader } from "./DateHeader";
import Journeys from "./Journeys";
import Uniques from "./Uniques";
import { trpc } from "../../../trpc";
import { useUser } from "../../UserContext";
import DropDown from "../atoms/DropDown";
import Loading from "../atoms/Loading";

export function JourneySearch({
    date,
    updateTrip,
}: {
    date: { year: number; month: number };
    updateTrip: any;
}) {
    const profile = useUser();

    // const [date, setDate] = useState({ month: 1, year: 2022 });
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

    const [filterByStart, setStartFilter] = useState(false);
    const [filterByDestination, setDestinationFilter] = useState(false);

    const [groupBy, setGroupBy] = useState("individual");
    const groupByUnique = true;
    useEffect(() => {
        console.log("filterByStart", filterByStart);
    }, [filterByStart]);

    if (!getLocations?.data) {
        return <Loading />;
    }

    if (data) {
        return (
            <>
                <div className="hero bg-base-200 py-10 flex justify-start">
                    <div className="mx-5">
                        <div className="mb-5 text-xs">Sort by:</div>

                        <ul className="menu bg-base-100 w-56 rounded-box">
                            <li className="hover-bordered">
                                {groupBy == "individual" ? (
                                    <a
                                        className="active"
                                        onClick={() => setGroupBy("individual")}
                                    >
                                        Date
                                    </a>
                                ) : (
                                    <a onClick={() => setGroupBy("individual")}>
                                        Date
                                    </a>
                                )}
                            </li>
                            <li className="hover-bordered">
                                {groupBy == "unique" ? (
                                    <a
                                        className="active"
                                        onClick={() => setGroupBy("unique")}
                                    >
                                        Unique
                                    </a>
                                ) : (
                                    <a onClick={() => setGroupBy("unique")}>
                                        Unique
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="mx-5">
                        <div className="mb-5 text-xs">Filter by:</div>
                        <div className="">
                            <div className="my-2 text-sm">Start:</div>
                            <div className="flex flex-row items-center mb-5">
                                <div className="mr-5">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-success"
                                        onChange={() => {
                                            setStartFilter(!filterByStart);
                                        }}
                                    />
                                </div>
                                <DropDown
                                    name="startLocation"
                                    startValue={0}
                                    data={getLocations?.data?.sL}
                                    setChange={setSLFilter}
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="my-2 text-sm">Destination:</div>
                            <div className="flex flex-row items-center">
                                <div className="mr-5">
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-success"
                                        onChange={() => {
                                            setDestinationFilter(
                                                !filterByDestination
                                            );
                                        }}
                                    />
                                </div>
                                <DropDown
                                    name="endLocation"
                                    startValue={0}
                                    data={getLocations?.data?.eL}
                                    setChange={setELFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-base-200 container my-5 p-5 mx-auto">
                    <div className="flex justify-end">
                        <div className="">Select All</div>
                    </div>
                </div>

                {groupBy == "unique" ? (
                    <div className="container mx-auto">
                        <div className="">
                            <Uniques updateTrip={updateTrip}>
                                {searchTrips.data}
                            </Uniques>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto">
                        <div className="">
                            <Journeys updateTrip={updateTrip}>
                                {data?.data?.data}
                            </Journeys>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return <></>;
    }
}
