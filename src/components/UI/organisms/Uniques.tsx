import React, { useState } from "react";
import { getDuration } from "../../../helpers/getDuration";
import moment from "moment";
import Journeys from "./Journeys";
import { map } from "zod";

export default function Uniques({
    updateTrip,
    children,
    filterByStart,
    startLocationFilter,
    filterByDestination,
    endLocationFilter,
}: any) {
    const handleChange = (event: any, trip: any) => {
        console.log("checkAll Trips", trip.trips);
        // trip.trips.map((tripx: any, index: any) => {
        //     // if (
        //     //     trip.classification === "unclassified" ||
        //     //     trix.classification === "personal"
        //     // ) {
        //     updateTrip(tripx.id, "business");
        //     // } else {
        //     //     updateTrip(event.target.value, "personal");
        //     // }
        // });
    };

    const handleShowTrips = (event: any, trip: any) => {
        setShowTrips({
            ...showTrips,
            [trip.startLocationId + trip.endLocationId]: event.target.checked,
        });
    };

    const [showTrips, setShowTrips] = useState(
        children
            .sort((trip: any) => (trip.count > 1 ? false : true))
            .map((trip: any, index: any) => {
                return { [trip.startLocationId + trip.endLocationId]: false };
            })
    );

    if (children !== undefined) {
        // console.log("uniques", filterByStart, startLocationFilter, children);

        return children
            .sort(
                (a: any, b: any) =>
                    Number(moment(a.startTime).format("DD")) -
                    Number(moment(b.startTime).format("DD"))
            )
            .filter((trip: any) =>
                filterByStart
                    ? trip.startLocationId === startLocationFilter
                    : true
            )
            .filter((trip: any) =>
                filterByDestination
                    ? trip.endLocationId === endLocationFilter
                    : true
            )
            .map((trip: any, index: any) => {
                try {
                    return (
                        <>
                            {trip.count > 1 ? (
                                <div
                                    tabIndex={0}
                                    key={`${index}-grouped-trip`}
                                    className="border border-base-300 bg-zinc-700 my-5 rounded-md"
                                >
                                    <div
                                        key={`trip-extra-${trip.count}`}
                                        className="text-xl m-0 py-5 font-medium"
                                    >
                                        <div
                                            key={`${index}-trip`}
                                            className="sm:container flex m-0 p-0 flex-row font-light "
                                        >
                                            <div className="flex flex-col justify-center items-center mx-5 py-0">
                                                <div className="text-4xl font-extralight">
                                                    {trip.count}
                                                </div>
                                                <div className="text-xs">
                                                    trips
                                                </div>
                                            </div>
                                            <div className="min-w-max stat">
                                                <div className="flex flex-row">
                                                    <div className="text-xl text-slate-300">
                                                        {trip.startLocation}
                                                    </div>
                                                    <div className="text-xs text-slate-400 px-2 self-center">
                                                        to{" "}
                                                    </div>
                                                    <div className="text-xl text-slate-300">
                                                        {trip.endLocation}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* // */}
                                            {/* This is where you show multiple unique trips in one block: */}
                                            {trip.count > 1 && (
                                                <div
                                                    key={`trip-${trip.count}`}
                                                    className="stat flex justify-end"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="toggle"
                                                        onChange={(e) =>
                                                            handleShowTrips(
                                                                e,
                                                                trip
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {/* // */}

                                            {/* This is the checkbox which presumably will change based on if it's a single or multiple block */}
                                            {/* <div
                                                key={`trip-x-${trip.count}`}
                                                className="stat business-input w-0 flex justify-end"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        trip.classification ==
                                                        "business"
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(e, trip)
                                                    }
                                                    className="checkbox"
                                                    value={trip.id}
                                                />
                                            </div> */}
                                        </div>
                                    </div>

                                    {showTrips[
                                        trip.startLocationId +
                                            trip.endLocationId
                                    ] ? (
                                        <div
                                            key={`trip-show-${trip.startLocationId}-${trip.endLocationId}`}
                                        >
                                            <Journeys updateTrip={updateTrip}>
                                                {trip.trips}
                                            </Journeys>
                                        </div>
                                    ) : (
                                        <div
                                            key={`trip-hidden-${trip.count}`}
                                            className="hidden"
                                        >
                                            <Journeys>{trip.trips}</Journeys>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Show the individual journeys which don't have multiple entries
                                <Journeys updateTrip={updateTrip}>
                                    {trip.trips}
                                </Journeys>
                            )}
                        </>
                    );
                } catch (e) {
                    console.log("rendering journeys error", e);
                }
            });
    } else {
        return <></>;
    }
}
