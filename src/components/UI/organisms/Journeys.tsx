import React from "react";
import { Journey } from "./Journey";
import moment from "moment";

export default function Journeys({ updateTrip, children }: any) {
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
        return children
            .sort(
                (a: any, b: any) =>
                    Number(moment(a.startTime).format("DD")) -
                    Number(moment(b.startTime).format("DD"))
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
