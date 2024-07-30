import React, { useEffect, useState } from 'react';
import dictionary from "../constants/shapeDictionary";
import "../assets/fonts/Verity-Icons.css";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const ShapeSelector = (props) => {

    // Props
    const { index, onShapeChange } = props;

    const initialState = {
        position: index,
        innerShape: '',
        outerShape: ''
    }

    const shapeSides = {
        inside: 'innerShape',
        outside: 'outerShape',
    };

    // Position
    const position = props.position === '0' ? 'Left' :
                     (props.position === '1' ? 'Mid' : 'Right');
    const INSIDE = "inside";
    const OUTSIDE = "outside";

    // Shapes
    const insideShapes = Object.keys(dictionary.inside);
    const outsideShapes = Object.keys(dictionary.outside);
    const [shapeData, setShapeData] = useState(initialState);

    const selectShape = (event) => {
        
        const button = event.target.closest('button');
        if (!button) return;

        const shape = button.getAttribute('data-shape');
        const side = button.getAttribute('data-side');
        side === INSIDE ? 'innerShape' : 'outerShape';

        setShapeData((prevData) => {
            const newShapeData = {
              ...prevData,
              [shapeSides[side]]: shape,
            };
            onShapeChange(newShapeData); // Chiama la callback del padre
            return newShapeData;
        });
          
    }

    // Tailwind classes
    const liButtonClasses = '';
    const ulClasses = 'grid grid-cols-3 gap-2 md:gap-4 my-4';
    const shapeSelectorClasses = 'shape-selector shape-selector-' + position +
        (props.classes ? (' ' + props.classes) : '');

    return(
        <Card className={shapeSelectorClasses}
            data-inside={shapeData.innerShape} data-outside={shapeData.outerShape}>
            <CardHeader className="justify-center">
                <span className='text-xl font-bold'>{position}</span>
            </CardHeader>
            <Divider />
            <CardBody className=" items-center">
                <span className='text-xl'>Inside shapes</span>
                <ul id={'inner-selector-' + position} className={ulClasses}>
                    {insideShapes.map((shape) => (
                        <li key={shape}>
                            <Button className={'item-' + dictionary.inside[shape].name + ' ' +
                                liButtonClasses  + ' ' + (shapeData.innerShape === shape ?  ' is-selected  bg-slate-400' : '')}
                                onPress={selectShape}
                                data-side={INSIDE}
                                data-shape={shape}>
                                <i className={'icon-' + dictionary.inside[shape].name}></i>
                            </Button>
                        </li>
                    ))}
                </ul>
            <Divider />
                <span className='text-xl pt-3'>Outside shapes</span>
                <ul id={'outer-selector-' + position} className={ulClasses}>
                    {outsideShapes.map((shape) => (
                        <li key={shape}>
                            <Button className={'item-' + dictionary.outside[shape].threeDimensionalShape + ' ' +
                                liButtonClasses + ' ' + (shapeData.outerShape === shape ?  ' is-selected bg-slate-400' : '')}
                                onPress={selectShape}
                                data-side={OUTSIDE}
                                data-shape={shape}>
                                <i className={'icon-' + dictionary.outside[shape].threeDimensionalShape}></i>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardBody>
            
        </Card>
    )
}

export default ShapeSelector;