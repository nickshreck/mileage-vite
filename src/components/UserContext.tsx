import React, { useContext, useState } from "react";
import { trpc } from "../trpc";
import { useGoogleProfile } from "./GoogleAuthContext";

const user = {
    email: "email",
    googleId: "googleId",
    imageUrl: "imageUrl",
    name: "name",
    id: "id",
};

const UserContext = React.createContext(user);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const googleProfile = useGoogleProfile();
    const user = trpc.useQuery([
        "getUser",
        {
            googleId: googleProfile.googleId,
            name: googleProfile.name,
            email: googleProfile.email,
            imageUrl: googleProfile.imageUrl,
        },
    ]);

    if (!user.data) {
        return null;
    }

    // if (user.data.imageUrl === null) {
    //     user.data.imageUrl = googleProfile.imageUrl;
    // }

    return (
        <>
            <UserContext.Provider value={user.data}>
                {children}
            </UserContext.Provider>
        </>
    );
}
