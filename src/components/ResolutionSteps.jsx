import { Divider } from "@nextui-org/react";
import React from "react";

const ResolutionSteps = (props) => {
    const steps = props.tmp;
    console.log(steps)

    const dissectionStepClasses = "flex flex-col gap-2 pt-2"
    return (
        <ul className="step-list">
            {steps && steps.map((item, index) => (
                    <li key={index} className={'dissection-step-' + index + ' ' + dissectionStepClasses} >
                        <span>
                            {'Dissect ' + item.firstDissection.symbol} 
                            <i className={"px-2 icon-" + item.firstDissection.symbol}></i>
                            {'from' + ' '}
                            <strong>{item.firstDissection.shape + ' '}</strong>
                            {'on ' + item.firstDissection.position}
                        </span>
                        <span>
                            {'Dissect ' + item.secondDissection.symbol} 
                            <i className={"px-2 icon-" + item.secondDissection.symbol}></i>
                            {'from' + ' '}
                            <strong>{item.secondDissection.shape + ' '}</strong>
                            {'on ' + item.secondDissection.position}
                        </span>
                        <span>
                            Resulting shapes:
                            {item.currentShapes.map((shape, shapeIndex) => (
                                <i key={shapeIndex} className={'px-2 icon-' + shape.threeDimensionalShape}></i>
                            ))}
                        </span>
                        <Divider />
                    </li>
            ))}
        </ul>
    );
};

export default ResolutionSteps;
