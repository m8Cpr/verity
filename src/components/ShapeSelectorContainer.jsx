import React from "react"
import ShapeSelector from "./ShapeSelector";


const ShapeSelectorContainer = (props) => {

     // Tailwind classes
     const containerClasses = 'container grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

    const renderShapeSelectors = () => {
        const shapeSelectors = [];
        for (let i = 0; i < 3; i++) {
          shapeSelectors.push(
            <ShapeSelector 
            key={i}
            index={i}
            position={i.toString()} 
            classes={`flex flex-col ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`} 
            />
          );
        }
        return shapeSelectors;
      };

    return(
        <div className={containerClasses}>
            {renderShapeSelectors()}
        </div>
    );
}

export default ShapeSelectorContainer;