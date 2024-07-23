import React, { useState } from 'react';
import dictionary from "../constants/shapeDictionary";
import "../assets/fonts/Verity-Icons.css"


const ShapeSelector = (props) => {

    // Position
    const position = props.position === '0' ? 'left' :
                     (props.position === '1' ? 'mid' : 'right');

    // Shapes
    const insideShapes = Object.keys(dictionary.inside);
    const outsideShapes = Object.keys(dictionary.outside);

    // Tailwind classes
    const liButtonClasses = 'p-4 border rounded bg-red-600 hover:bg-red-500';
    const ulClasses = 'grid grid-cols-3 gap-2 md:gap-4 my-4';
    const shapeSelectorClasses = 'shape-selector-' + position +
        (props.classes ? (' ' + props.classes) : '');

    return(
        <div className={shapeSelectorClasses}>
            <span className='text-xl'>Inside shapes</span>
            <ul className={ulClasses}>
                {insideShapes.map((shape) => (
                    <li key={shape}>
                        <button className={'item-' + dictionary.inside[shape].name + 
                            liButtonClasses}>
                            <i className={'icon-' + dictionary.inside[shape].name}></i>
                        </button>
                    </li>
                ))}
            </ul>
            
            <span className='text-xl'>Outside shapes</span>
            <ul className={ulClasses}>
                {outsideShapes.map((shape) => (
                    <li key={shape}>
                        <button className={'item-' + dictionary.outside[shape].threeDimensionalShape + 
                            liButtonClasses}>
                            <i className={'icon-' + dictionary.outside[shape].threeDimensionalShape}></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShapeSelector;