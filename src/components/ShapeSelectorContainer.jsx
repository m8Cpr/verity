import React, { useEffect, useState, useRef, useContext } from "react"

import ShapeSelector from "./ShapeSelector";
import ResolutionSteps from "./ResolutionSteps";
import checkHelper from "../scripts/helpers/checkHelper";
import verity from "../scripts/verity";
import { ThemeContext } from "./context/ThemeContext";


import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider } from "@nextui-org/react";
import confetti from 'canvas-confetti';

const initialContainerState = {
    innerShapes: ['', '', ''],
    outerShapes: ['', '', ''],
    valid: false
};

const initialState = {
    innerShapes: ['', '', ''],
    outerShapes: ['', '', ''],
    valid: false
};

const ShapeSelectorContainer = (props) => {

    // REACT STATES AND HOOKS

    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [steps, setSteps] = useState(false);
    const [shapeData, setShapeData] = useState(initialContainerState);
    const [resetShape, setReset] = useState(false);
    const { reference } = props;
    const { isDark } = useContext(ThemeContext)

    // Might want to put the result inside a useMemo() to recall these operations only if necesary
    useEffect(() => {

        if (!isOpen && steps) {
            const resetButton = document.querySelector('#modalResetButton');
        
            const handleClick = () => {
              setShapeData(initialContainerState);
              handleShapeChange(initialState);
              setSteps(false);
              setReset(!resetShape);
              reference.current.scrollIntoView({ behavior: 'smooth' });
            };
        
            resetButton.addEventListener('click', handleClick);
        
            return () => {
              resetButton.removeEventListener('click', handleClick);
            };

        }

        if (!isOpen) return;

        const { innerShapes, outerShapes, valid } = shapeData;

        if (innerShapes.length === outerShapes.length && valid) {
            setSteps(verity.main(innerShapes, outerShapes));
        }

    }, [isOpen])

    useEffect(() => {
        if (steps && steps.length === 0) {
            handleConfetti();
        }

    }, [steps]);

     // TAILWIND CLASSES

    const containerClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

    // HANDLERS

    // This handleClick is here for debugging/testing purposes only
    const handleClick = () => {
        setSteps(verity.main());
    };

    // This function handles the shape data changes, re-rendering the component 
    const handleShapeChange = (data) => {
        const { position, innerShape, outerShape } = data;

        setShapeData((prevData) => {
            const newInnerShapes = [...prevData.innerShapes];
            const newOuterShapes = [...prevData.outerShapes];

            newInnerShapes[position] = innerShape;
            newOuterShapes[position] = outerShape;

            const validityCheck = checkHelper.validityCheck(newInnerShapes, newOuterShapes);

            return {
                ...prevData,
                innerShapes: newInnerShapes,
                outerShapes: newOuterShapes,
                valid: validityCheck
            };
        });
        
    };

    // This function triggers the confetti easter-egg
    const handleConfetti = () => {
        confetti();
    };

    // Function to print all shape electors
    const renderShapeSelectors = () => {
        const shapeSelectors = [];
        for (let i = 0; i < 3; i++) {
          shapeSelectors.push(
            <ShapeSelector 
                key={i}
                index={i}
                position={i.toString()} 
                classes={`flex flex-col p-4 lg-p-6 ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                onShapeChange={handleShapeChange}
                resetShape={resetShape}
            />
          );
        }
        return shapeSelectors;
    };

    // Function to reset the shapes, duplicated code will uniform later
    const handleReset = () => {
        setShapeData(initialContainerState);
        handleShapeChange(initialState);
        setSteps(false);
        setReset(!resetShape);
        reference.current.scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <>
            <div className="container my-4 lg:w-full 2xl:w-2/3 self-center px-8 lg:px-16 2xl:px-0">
                <div className="button-container hidden lg:inline-flex gap-4 mb-6">
                    <Button onPress={handleReset} 
                        color="danger" 
                        variant="light" 
                        className="w-48 font-bold">
                        {'Reset shapes'}
                    </Button>
                    <Button onPress={onOpen} 
                        color="primary" 
                        variant="shadow" 
                        className="w-48 font-bold"
                        isDisabled={!shapeData.valid}>
                        {'Start dissection'}
                    </Button>

                </div>

                <div className={containerClasses}>
                    {renderShapeSelectors()}
                </div>

                <div className="button-container inline-flex flex-col md:flex-row md:gap-6 mt-4 md:mt-8 lg:hidden">
                    <Button onPress={handleReset} 
                        color="danger" 
                        variant="light" 
                        className="w-48 mb-4">
                        {'Reset shapes'}
                    </Button>
                    <Button onPress={onOpen} 
                        color="primary" 
                        variant="shadow" 
                        className="w-48 mb-4"
                        isDisabled={!shapeData.valid}>
                        {'Start dissection'}
                    </Button>
                </div>

            </div>

            <Modal
                className={'text-foreground ' + (isDark ? "dark" : "light")}
                isOpen={isOpen}
                placement="bottom-center"
                backdrop="blur"
                scrollBehavior="inside"
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-start pb-2">
                                <span className="text-2xl font-bold">Required steps</span>
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                {shapeData.valid ? <ResolutionSteps steps={steps} /> : 'Why are you here?'}
                            </ModalBody>
                            <Divider />
                            <ModalFooter>
                                {/* <Button id="feedbackButton" color="primary" variant="light" onPress={onClose}>
                                    Done? <br/> Send me a feedback!
                                </Button> */}
                                <Button id="modalResetButton" className="font-bold" color="danger" variant="light" onPress={onClose}>
                                    Reset shapes
                                </Button>
                            </ModalFooter>
                        </>
                    )} 
                </ModalContent>
            </Modal>
        </>
    );
}

export default ShapeSelectorContainer;