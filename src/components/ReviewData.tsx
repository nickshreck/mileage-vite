import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";

import AllJourneys from "./pages/AllJourneys";
import { Upload } from "./pages/Upload";
import Loading from "./UI/atoms/Loading";
import { trpc } from "../trpc";

export function ReviewData() {
    // if (checkData.data === false) return <Upload />;
    const profile = useUser();

    const checkData: any = trpc.useQuery([
        "checkData",
        {
            userId: profile.id,
        },
    ]);

    useEffect(() => {
        console.log("checkData", checkData.data);
    }, [checkData.data]);

    if (!checkData.data?.years) {
        return <Loading />;
    }

    if (checkData.data?.years.length == 0) return <Upload />;

    return <AllJourneys years={checkData.data.years} />;
}
