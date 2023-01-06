import React from "react";
import { BusinessJourney } from "./BusinessJourney";
import moment from "moment";

export default function BusinessJourneys({ children }: any) {
    if (children !== undefined) {
        return children
            .sort(
                (a: any, b: any) =>
                    Number(moment(a.startTime).format("DD")) -
                    Number(moment(b.startTime).format("DD"))
            )
            .filter((trip: any) => trip.classification === "business")
            .map((trip: any, index: any) => {
                try {
                    return <BusinessJourney trip={trip} index={index} />;
                } catch (e) {
                    console.log("rendering journeys error", e);
                }
            });
    } else {
        return <></>;
    }
}
