import React, { useEffect, useState } from 'react';
import dictionary from "../constants/shapeDictionary";
import "../assets/fonts/Verity-Icons.css"


const ShapeSelector = (props) => {

    // Position
    const position = props.position === '0' ? 'Left' :
                     (props.position === '1' ? 'Mid' : 'Right');
    const INSIDE = "inside";
    const OUTSIDE = "outside";

    // Shapes
    const insideShapes = Object.keys(dictionary.inside);
    const outsideShapes = Object.keys(dictionary.outside);
    const [innerShape, setInnerShape] = useState('');
    const [outerShape, setOuterShape] = useState('');

    const selectShape = (event) => {
        
        const button = event.target.closest('button');
        if (!button) return;

        const shape = button.getAttribute('data-shape');
        const side = button.getAttribute('data-side');
        side === INSIDE ? setInnerShape(shape) : setOuterShape(shape);
    }

    // Tailwind classes
    const liButtonClasses = 'border rounded bg-red-600 hover:bg-slate-400';
    const ulClasses = 'grid grid-cols-3 gap-2 md:gap-4 my-4';
    const shapeSelectorClasses = 'shape-selector shape-selector-' + position +
        (props.classes ? (' ' + props.classes) : '');

    return(
        <div className={shapeSelectorClasses}
        data-inside={innerShape} data-outside={outerShape}>
            <span className='text-xl font-bold'>{position}</span>
            <span className='text-xl'>Inside shapes</span>
            <ul id={'inner-selector-' + position} className={ulClasses}>
                {insideShapes.map((shape) => (
                    <li key={shape}>
                        <button className={'item-' + dictionary.inside[shape].name + ' ' +
                            liButtonClasses  + ' ' + (innerShape === shape ?  ' is-selected  bg-slate-400' : '')}
                            onClick={selectShape}
                            data-side={INSIDE}
                            data-shape={shape}>
                            <i className={'icon-' + dictionary.inside[shape].name}></i>
                        </button>
                    </li>
                ))}
            </ul>
            
            <span className='text-xl'>Outside shapes</span>
            <ul id={'outer-selector-' + position} className={ulClasses}>
                {outsideShapes.map((shape) => (
                    <li key={shape}>
                        <button className={'item-' + dictionary.outside[shape].threeDimensionalShape + ' ' +
                            liButtonClasses + ' ' + (outerShape === shape ?  ' is-selected bg-slate-400' : '')}
                            onClick={selectShape}
                            data-side={OUTSIDE}
                            data-shape={shape}>
                            <i className={'icon-' + dictionary.outside[shape].threeDimensionalShape}></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShapeSelector;