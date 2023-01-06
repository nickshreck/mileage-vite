import React, { useEffect, useState } from "react";

import { DateHeader } from "../UI/organisms/DateHeader";
import Journeys from "../UI/organisms/Journeys";
import { JourneySearch } from "../UI/organisms/JourneySearch";
import BusinessJourneys from "../UI/organisms/BusinessJourneys";
// import Uniques from "../UI/organisms/Uniques";
import { trpc } from "../../trpc";
import { useUser } from "../UserContext";
// import DropDown from "../UI/atoms/DropDown";
// import Loading from "../UI/atoms/Loading";
import MonthReview from "../UI/organisms/MonthReview";
import Uniques from "../UI/organisms/Uniques";

export default function AllJourneys({
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

    // const [startLocationFilter, setSLFilter] = useState(0);
    // const [endLocationFilter, setELFilter] = useState(0);

    const [showJourneys, setShowJourneys] = useState(false);
    const [showBusinessTrips, setShowBusinessTrips] = useState(false);

    useEffect(() => {
        setShowJourneys(false);
    }, [date]);

    useEffect(() => {
        setShowJourneys(false);
    }, [showBusinessTrips]);

    if (data) {
        return (
            <>
                <DateHeader
                    date={date}
                    years={years}
                    setDate={setDate}
                ></DateHeader>

                <div className="container mx-auto">
                    <div className="flex flex-col">
                        {!showJourneys && (
                            <>
                                <MonthReview
                                    date={date}
                                    data={data}
                                    setShowBusinessTrips={setShowBusinessTrips}
                                    showBusinessTrips={showBusinessTrips}
                                ></MonthReview>
                                {!showBusinessTrips && (
                                    <div className="hero bg-base-200 my-0">
                                        <div className="my-10 flex flex-col">
                                            <button
                                                className="btn btn-active btn-info mx-1 my-1"
                                                onClick={() => {
                                                    setShowJourneys(true);
                                                }}
                                            >
                                                Edit Month
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {showJourneys && (
                            <>
                                <div className="hero bg-base-200 my-5">
                                    <div className="my-10 flex flex-col">
                                        <button
                                            className="btn btn-active btn-info mx-1 my-1"
                                            onClick={() => {
                                                setShowJourneys(false);
                                            }}
                                        >
                                            Monthly Review
                                        </button>
                                    </div>
                                </div>
                                <JourneySearch
                                    date={date}
                                    updateTrip={updateTrip}
                                ></JourneySearch>
                            </>
                        )}

                        {showBusinessTrips && (
                            <BusinessJourneys updateTrip={updateTrip}>
                                {data?.data?.data}
                            </BusinessJourneys>
                        )}
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
