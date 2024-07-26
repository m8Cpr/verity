import React, { useEffect, useState } from "react"
import ShapeSelector from "./ShapeSelector";
import checkHelper from "../scripts/helpers/checkHelper";

const initialState = {
    innerShapes: ['', '', ''],
    outerShapes: ['', '', ''],
    valid: false
}

const ShapeSelectorContainer = (props) => {

     // Tailwind classes
     const containerClasses = 'container grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

     const [shapeData, setShapeData] = useState(initialState);
     const { onValidityChange } = props;

     const handleShapeChange = (data) => {
        const { position, innerShape, outerShape } = data;

        setShapeData((prevData) => {
            const newInnerShapes = [...prevData.innerShapes];
            const newOuterShapes = [...prevData.outerShapes];

            newInnerShapes[position] = innerShape;
            newOuterShapes[position] = outerShape;

            const validityCheck = checkHelper.validityCheck(newInnerShapes, newOuterShapes);
            onValidityChange(validityCheck);

            return {
                ...prevData,
                innerShapes: newInnerShapes,
                outerShapes: newOuterShapes,
                valid: validityCheck
            };
        });
        
    };

    const renderShapeSelectors = () => {
        const shapeSelectors = [];
        for (let i = 0; i < 3; i++) {
          shapeSelectors.push(
            <ShapeSelector 
            key={i}
            index={i}
            position={i.toString()} 
            classes={`flex flex-col ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            onShapeChange={handleShapeChange}
            />
          );
        }
        return shapeSelectors;
    };

    // useEffect(() => {
    //     onValidityChange(shapeData.valid);
    // },
    // [shapeData.valid])

    return(
        <div className={containerClasses}>
            {renderShapeSelectors()}
        </div>
    );
}

export default ShapeSelectorContainer;