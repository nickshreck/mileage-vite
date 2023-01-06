import React from "react";
import { getDuration } from "../../../helpers/getDuration";
import moment from "moment";
import Journeys from "./Journeys";

export default function Uniques({ updateTrip, children }: any) {
    const handleChange = (event: any, trip: any) => {
        console.log("checkAll Trips", trip);
    };

    const [showTrips, setShowTrips] = React.useState(false);

    if (children !== undefined) {
        return (
            children
                // .sort(
                //     (a: any, b: any) =>
                //         Number(moment(a.startTime).format("DD")) -
                //         Number(moment(b.startTime).format("DD"))
                // )
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
                                        <div className="text-xl m-0 py-5 font-medium">
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
                                                {trip.count > 1 && (
                                                    <div className="stat flex justify-end">
                                                        <input
                                                            type="checkbox"
                                                            className="toggle"
                                                            checked
                                                        />
                                                    </div>
                                                )}

                                                <div className="stat business-input w-0 flex justify-end">
                                                    {/* <div className="">Business</div> */}
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            trip.classification ==
                                                            "business"
                                                                ? true
                                                                : false
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                trip
                                                            )
                                                        }
                                                        className="checkbox"
                                                        value={trip.id}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {showTrips ? (
                                            <div>
                                                <Journeys>
                                                    {trip.trips}
                                                </Journeys>
                                            </div>
                                        ) : (
                                            <div className="hidden">
                                                <Journeys>
                                                    {trip.trips}
                                                </Journeys>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Journeys updateTrip={updateTrip}>
                                        {trip.trips}
                                    </Journeys>
                                )}
                            </>
                        );
                    } catch (e) {
                        console.log("rendering journeys error", e);
                    }
                })
        );
    } else {
        return <></>;
    }
}
