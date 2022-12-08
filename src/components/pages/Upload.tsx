import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import axios from "axios";

import { URL } from "../../constants";

const endpoint = `${URL}/upload/`;

export const Upload = () => {
    const profile = useUser();
    const [file, setFile] = useState({ selectedFile: null });
    const [progress, setProgress] = useState({ loaded: 0 });
    // this.state = { selectedFile: null, loaded: 0 };
    const handleselectedFile = (event: any) => {
        const newFile = event.target.files[0];
        newFile.googleId = profile.googleId;

        setFile({
            selectedFile: newFile,
        });
    };

    useEffect(() => {
        console.log("progress", progress.loaded);
    }, [progress.loaded]);

    console.log("googleId", profile);

    const handleUpload = () => {
        // Get the file from the event object
        // const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Create a FormData object to store the file in the request body
        const formData = new FormData();

        // formData.append("file", file.selectedFile);

        if (file.selectedFile !== null) {
            formData.append("file", file.selectedFile);
        } else {
            // Handle the case where the file.selectedFile variable is null
            console.error("The file.selectedFile variable is null");
            return;
        }

        axios
            .post(endpoint, formData, {
                params: {
                    googleId: profile.googleId,
                },
                onUploadProgress: (ProgressEvent: any) => {
                    if (ProgressEvent !== null) {
                        setProgress({
                            loaded:
                                (ProgressEvent.loaded / ProgressEvent.total) *
                                100,
                        });
                    }
                },
            })
            .then((res) => {
                console.log(
                    "This is the reply from the upload POST:",
                    res.statusText
                );
            });
    };

    if (!progress) {
        return <></>;
    } else {
        progress.loaded = Number(progress.loaded);
    }

    return (
        <>
            <div className="flex justify-center content-center mt-5">
                <input
                    type="file"
                    name=""
                    id=""
                    onChange={handleselectedFile}
                />
            </div>
            <div className="flex justify-center content-center mt-5">
                <button className="btn btn-wide" onClick={handleUpload}>
                    Upload
                </button>
            </div>
            <div className="flex justify-center content-center mt-5">
                Upload Progress: {Math.round(progress.loaded).toString()}%
                <progress
                    className="progress progress-secondary w-56"
                    value={Math.round(progress.loaded).toString()}
                    max="100"
                ></progress>
            </div>
        </>
    );
};
