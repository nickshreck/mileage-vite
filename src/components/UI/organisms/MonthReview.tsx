import React, { useEffect } from "react";
import moment from "moment";

export default function MonthReview({
    date,
    data,
    setShowBusinessTrips,
    showBusinessTrips,
}: {
    date: { month: number; year: number };
    data: any;
    setShowBusinessTrips: any;
    showBusinessTrips: boolean;
}) {
    useEffect(() => {
        console.log("data", data.data);
    }, [data]);

    return (
        <>
            <div className="hero bg-base-200 my-10">
                <div className="hero-content text-center flex-col">
                    <div className="max-w-md flex">
                        <h1 className="text-5xl font-bold ">
                            {moment()
                                .month(date.month - 1)
                                .format("MMMM")}
                        </h1>
                        <div className="divider divider-horizontal"></div>
                        <h1 className="text-5xl font-bold">{date.year}</h1>
                    </div>
                    <div className="py-6">Month In Review</div>

                    <div>Business</div>
                    <div className="stats stats-horizontal shadow">
                        <div className="stat">
                            <div className="stat-value">
                                {data.data?.monthlyReview?.totalBusinessTrips}
                            </div>
                            <div className="stat-desc">Trips</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value">
                                {" "}
                                {(
                                    (data.data?.monthlyReview
                                        ?.totalBusinessDistance /
                                        1000) *
                                    0.621371
                                ).toFixed(2)}
                            </div>
                            <div className="stat-desc">miles</div>
                        </div>
                    </div>

                    <div>Total</div>
                    <div className="stats stats-horizontal shadow">
                        <div className="stat">
                            <div className="stat-value">
                                {data.data?.monthlyReview?.totalTrips}
                            </div>
                            <div className="stat-desc">Trips</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value">
                                {" "}
                                {(
                                    (data.data?.monthlyReview?.totalDistance /
                                        1000) *
                                    0.621371
                                ).toFixed(2)}
                            </div>
                            <div className="stat-desc">miles</div>
                        </div>
                    </div>

                    <button
                        className="btn btn-active btn-accent mx-1 my-5"
                        onClick={() => {
                            showBusinessTrips
                                ? setShowBusinessTrips(false)
                                : setShowBusinessTrips(true);
                        }}
                    >
                        {showBusinessTrips
                            ? "Hide Business Trips"
                            : "View Business Trips"}
                    </button>
                </div>
            </div>
        </>
    );
}
