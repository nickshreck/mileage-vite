import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import { Main } from "./components/Main";
import "./index.scss";
import { URL } from "./constants";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: `${URL}/trpc`,
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Main></Main>
            </QueryClientProvider>
        </trpc.Provider>
    );
};

export default App;
