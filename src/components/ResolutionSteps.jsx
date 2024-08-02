import { Divider } from "@nextui-org/react";
import React from "react";

const ResolutionSteps = (props) => {
    const { steps } = props;

    const dissectionStepClasses = "flex flex-col gap-2 pt-2"
    return (
        <ul className="step-list flex flex-col">
            {steps.length > 0 ? steps.map((item, index) => {
                if (!item) return null;

                const { firstDissection, secondDissection, currentShapes } = item;
                
                return (
                    <li key={index} className={'dissection-step-' + index + ' ' + dissectionStepClasses} >
                        <span>
                            {'Dissect'} 
                            <i className={"px-2 icon-" + firstDissection?.symbol}></i>
                            {'(' + firstDissection?.symbol + ') from' + ' '}
                            <strong>{firstDissection?.shape + ' '}</strong>
                            {'on ' + firstDissection?.position}
                        </span>
                        <span>
                            {'Dissect'} 
                            <i className={"px-2 icon-" + secondDissection?.symbol}></i>
                            {'(' + secondDissection?.symbol + ') from' + ' '}
                            <strong>{secondDissection?.shape + ' '}</strong>
                            {'on ' + secondDissection?.position}
                        </span>
                        <span>
                            Resulting shapes:
                            {currentShapes?.map((shape, shapeIndex) => (
                                <i key={shapeIndex} className={'px-2 icon-' + shape.threeDimensionalShape}></i>
                            ))}
                        </span>
                        {index < steps.length -1 && <Divider />}
                    </li>
                );
            }) : <>
                    <span className="text-xl font-bold text-center uppercase">Lucky!</span>
                    <span className="pt-8">Every outside shape is already a final shape, that's a 1/120 chance!</span>
                </>}
        </ul>
    );
};

export default ResolutionSteps;
