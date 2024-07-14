import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

function App() {
    const shapes = Object.keys(dictionary);

    const handleClick = () => {
        verity.main(); // Assuming 'verity' is an object with a 'main' function
      };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Verity Encounter</h1>
                <button onClick={handleClick}>Lancia Verity.main</button>
            <div>
                <label htmlFor="textInput">Inserisci il testo:</label>
                <input type="text" id="textInput" />
            </div>
            <div className="card">
                <h2>3D Shapes</h2>
                <ul>
                    {shapes.map((shape) => (
                        <li key={shape}>
                            {shape} - {dictionary[shape].threeDimensionalShape}
                        </li>
                    ))}
                </ul>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
