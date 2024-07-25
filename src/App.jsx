import { useState } from "react";

import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

import ShapeSelector from "./components/ShapeSelector";

function App() {

    const containerClasses = 'container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

    // This handleClick will be replaced by a function that will trigger when all shapes has been selected
    
    const handleClick = () => {
        const $shapeSelector = document.querySelectorAll('.shape-selector');
        var innerShapes = [];
        var outerShapes = [];

        for(let i= 0; i < $shapeSelector.length; i++) {
            var innerShape = $shapeSelector[i].getAttribute('data-inside');
            var outerShape = $shapeSelector[i].getAttribute('data-outside');
            innerShapes.push(innerShape);
            outerShapes.push(outerShape);
        }
        
        verity.main(innerShapes, outerShapes);
      };

    return (
        <>
            <h1>Verity Encounter</h1>
            <button onClick={handleClick}>Lancia Verity.main</button>

            <div className={containerClasses}>
                <ShapeSelector position="0" classes="flex flex-col"/>
                <ShapeSelector position="1" classes="flex flex-col"/>
                <ShapeSelector position="2" classes="flex flex-col md:col-span-2 lg:col-span-1"/>
            </div>

        </>
    );
}

export default App;
