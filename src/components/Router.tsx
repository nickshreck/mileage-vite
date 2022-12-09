import React from "react";

import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AllJourneys from "./pages/AllJourneys";
import { ReviewData } from "./ReviewData";
import { ReviewDataSearch } from "./ReviewDataSearch";
import { Settings } from "./pages/Settings";
import { Upload } from "./pages/Upload";
import { Search } from "./pages/Search";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ReviewData />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/search" element={<ReviewDataSearch />} />
            </Routes>
        </BrowserRouter>
    );
}
