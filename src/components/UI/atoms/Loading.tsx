import React from "react";

export default function Loading() {
    return (
        <div className="flex justify-center content-center mt-5">
            <div className="sm:container flex flex-col content-center justify-center bg-zinc-700 my-5 font-light rounded-md text-lg text-center">
                <button className="btn loading">loading</button>
            </div>
        </div>
    );
}
