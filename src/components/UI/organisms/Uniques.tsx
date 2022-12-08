import React from "react";
import { getDuration } from "../../../helpers/getDuration";
import moment from "moment";
import Journeys from "./Journeys";

export default function Uniques({ updateTrip, children }: any) {
    const handleChange = (event: any, trip: any) => {
        console.log("checkAll Trips", trip);
    };

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
                                <div
                                    tabIndex={0}
                                    key={`${index}-trip`}
                                    className="collapse collapse-arrow border border-base-300 bg-zinc-700 rounded-md"
                                >
                                    <div className="collapse-title text-xl m-0 p-0 font-medium">
                                        <div
                                            key={`${index}-trip`}
                                            className="sm:container flex m-0 p-0 flex-row font-light "
                                        >
                                            <div className="stat">
                                                <div className="flex flex-row">
                                                    <div className="text-xl text-slate-300">
                                                        <div>
                                                            {trip.startLocation}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat">
                                                <div className="flex flex-row">
                                                    <div className="text-xl text-slate-300">
                                                        <div>
                                                            {trip.endLocation}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat">
                                                <div className="flex flex-row">
                                                    <div className="text-xl text-slate-300">
                                                        <div>{trip.count}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stat personal-input">
                                                <div className="">Personal</div>
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
                                            </div>
                                            <div className="stat business-input">
                                                <div className="">Business</div>
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collapse-content">
                                        <Journeys tabIndex={0}>
                                            {trip.trips}
                                        </Journeys>
                                    </div>
                                </div>
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
