import React, { useRef, useContext } from "react";

import "./App.css";
import ShapeSelectorContainer from "./components/ShapeSelectorContainer";
import InfoPanel from "./components/InfoPanel";
import Header from "./components/Header";
import { ThemeContext } from "./components/context/ThemeContext";
import { Chip } from "@nextui-org/react";
import Footer from "./components/Footer";

function App() {
    const title = useRef(null);
    const { isDark } = useContext(ThemeContext);

    return (
        <>
            <main id="main" className={"text-foreground bg-background " + (isDark ? "dark" : "light")}>
                <Header />
                <div className="verity-main flex flex-col w-full min-h-screen align-middle">
                    <h1 ref={title} className="text-5xl p-4 capitalize">Dissection helper</h1>
                    <span className="text-lg px-8">
                        Select all your shapes to dissect, check <Chip color="primary">i</Chip> for details
                    </span>

                    <ShapeSelectorContainer reference={title}/>
                </div>
                <InfoPanel />
                <Footer />
            </main>
        </>
    );
}

export default App;
