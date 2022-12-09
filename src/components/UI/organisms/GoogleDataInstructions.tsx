import React from "react";
import { Link } from "react-router-dom";

function MyLink() {
    const handleClick = () => {
        window.open(
            "https://www.howtogeek.com/725241/how-to-download-your-google-maps-data/",
            "_blank"
        );
    };

    return (
        <button className="btn btn-info">
            <a onClick={handleClick}>
                Click here to visit the How-To Geek article on downloading your
                Google Maps data
            </a>
        </button>
    );
}

export function GoogleDataInstructions() {
    return (
        <div className="flex justify-center content-center mt-5">
            <div className="sm:container flex flex-col content-center justify-center bg-zinc-700 my-5 font-light rounded-md">
                <div className="my-5 font-light rounded-md text-xl text-center">
                    Step 1: Download your Google Data from Google
                </div>
                <div className="my-5 font-light rounded-md content-center text-lg text-center align-center">
                    <MyLink />
                </div>
                <div className="my-5 font-light rounded-md text-xl text-center">
                    Step 2: Upload your Google Data
                </div>
            </div>
        </div>
    );
}
