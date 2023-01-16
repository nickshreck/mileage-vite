import React, { useEffect } from "react";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";

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
    const [businessData, setBusinessData] = React.useState<any>([]);
    const businessDataHeaders = [
        "Date",
        "Distance",
        "Start",
        "Destination",
        "Notes",
    ];
    useEffect(() => {
        // console.log("data", data.data);

        if (data.data !== undefined) {
            setBusinessData(() => {
                console.log("checking data", data.data);
                let nick = data.data.data;
                let businessArray = nick
                    .sort(
                        (a: any, b: any) =>
                            Number(moment(a.startTime).format("DD")) -
                            Number(moment(b.startTime).format("DD"))
                    )
                    .filter((trip: any) => trip.classification === "business")
                    .map((trip: any, index: any) => {
                        try {
                            return [
                                moment(trip.startTime).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                ),
                                ((trip.distance / 1000) * 0.621371).toFixed(2) +
                                    " miles",
                                // calculate total duration

                                // moment
                                //     .duration(trip.endTime.diff(trip.startTime)),
                                //     .asHours(),
                                // // duration in hours
                                // var hours = parseInt(duration.asHours());

                                // // duration in minutes
                                // var minutes = parseInt(duration.asMinutes()) % 60;,

                                trip.startLocationId.address,
                                trip.endLocationId.address,
                                // trip.classification,
                                // trip.purpose,
                                trip.notes,
                            ];
                        } catch (e) {
                            console.log("rendering journeys error", e);
                        }
                    });

                businessArray.unshift(businessDataHeaders);
                return businessArray;
            });
        }
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

                    <div className="">
                        <CSVLink
                            filename={"business-mileage.csv"}
                            className="btn btn-primary"
                            data={businessData}
                        >
                            <>
                                Download CSV
                                {
                                    // if(data !== undefined){
                                    console.log("data", businessData)
                                    // }
                                }
                            </>
                        </CSVLink>
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
