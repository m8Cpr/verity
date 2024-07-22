import React, { useState } from 'react';
import reactLogo from "../assets/react.svg";
import dictionary from "../constants/shapeDictionary";


const ShapeSelector = (props) => {

    const shapes = props.shapes;

    return(
        <div className='shape-selector'>
            <ul>
                {shapes.map((shape) => (
                    <li key={shape} className={'icon-' + dictionary[shape].threeDimensionalShape}>
                        {shape} - {dictionary[shape].threeDimensionalShape}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShapeSelector;