import React from "react";
import { Journey } from "./Journey";
import moment from "moment";

export default function Journeys({
    updateTrip,
    children,
    filterByStart,
    startLocationFilter,
    filterByDestination,
    endLocationFilter,
}: any) {
    const handleChange = (event: any, trip: any) => {
        if (
            trip.classification === "unclassified" ||
            trip.classification === "personal"
        ) {
            updateTrip(event.target.value, "business");
        } else {
            updateTrip(event.target.value, "personal");
        }
    };

    if (children !== undefined) {
        // console.log(
        //     "journeys",
        //     filterByStart,
        //     startLocationFilter,
        //     filterByDestination,
        //     endLocationFilter
        //     // children
        // );

        return children
            .sort(
                (a: any, b: any) =>
                    Number(moment(a.startTime).format("DD")) -
                    Number(moment(b.startTime).format("DD"))
            )
            .filter((trip: any) =>
                filterByStart
                    ? trip.startLocation === startLocationFilter
                    : true
            )
            .filter((trip: any) =>
                filterByDestination
                    ? trip.endLocation === endLocationFilter
                    : true
            )
            .map((trip: any, index: any) => {
                try {
                    return (
                        <Journey
                            trip={trip}
                            index={index}
                            key={`${index}-trip`}
                            handleChange={handleChange}
                        />
                    );
                } catch (e) {
                    console.log("rendering journeys error", e);
                }
            });
    } else {
        return <></>;
    }
}
