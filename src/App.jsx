import React, { useRef } from "react";

import "./App.css";
import ShapeSelectorContainer from "./components/ShapeSelectorContainer";
import InfoPanel from "./components/InfoPanel";

function App() {
    const subHeader = useRef(null);

    return (
        <div className="verity-main flex flex-col w-full align-middle">
            <h1 className="text-5xl">Verity Encounter</h1>
            <h2 ref={subHeader} className="text-3xl py-6">Dissection helper</h2>

            <ShapeSelectorContainer reference={subHeader}/>
            <InfoPanel />

        </div>
    );
}

export default App;
