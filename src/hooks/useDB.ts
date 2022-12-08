import { useEffect, useState } from "react";
import { trpc } from "../trpc";
const update = trpc.useMutation("updateTrip");
const updateTrip = async (id: string, classificaton: string) => {
    update.mutate({
        id: id,
        classification: "business",
    });

    return updateTrip;
};

// export const updateTrip = async (id: string, classification: string) => {
//     return "";
// };
