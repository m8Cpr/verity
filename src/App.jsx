import { useState } from "react";

import squareIcon from "./assets/icons/square.svg";
import viteLogo from "/vite.svg";


import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

import ShapeSelector from "./components/ShapeSelector";

function App() {
    const shapes = Object.keys(dictionary);

    const handleClick = () => {
        verity.main(); // Assuming 'verity' is an object with a 'main' function
      };

    return (
        <>
            <h1>Verity Encounter</h1>
                <button onClick={handleClick}>Lancia Verity.main</button>
            <div>
                <label htmlFor="textInput">Inserisci il testo:</label>
                <input type="text" id="textInput" />
            </div>
            <div className="card">
                <h2>3D Shapes</h2>
                <ShapeSelector shapes={shapes} />
            </div>
        </>
    );
}

export default App;
