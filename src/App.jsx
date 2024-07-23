import { useState } from "react";

import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

import ShapeSelector from "./components/ShapeSelector";

function App() {

    const containerClasses = 'container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';
    
    const handleClick = () => {
        verity.main(); // Assuming 'verity' is an object with a 'main' function
      };

    return (
        <>
            <h1>Verity Encounter</h1>
            <button onClick={handleClick}>Lancia Verity.main</button>

            <div className={containerClasses}>
                <ShapeSelector position="0"/>
                <ShapeSelector position="1"/>
                <ShapeSelector position="2" classes="md:col-span-2 lg:col-span-1"/>
            </div>

        </>
    );
}

export default App;
