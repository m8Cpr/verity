import React, { useEffect, useState } from "react"

import ShapeSelector from "./ShapeSelector";
import ResolutionSteps from "./ResolutionSteps";
import checkHelper from "../scripts/helpers/checkHelper";
import verity from "../scripts/verity";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import confetti from 'canvas-confetti';

const initialState = {
    innerShapes: ['', '', ''],
    outerShapes: ['', '', ''],
    valid: false
};

const ShapeSelectorContainer = (props) => {

    // React states and hooks
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [steps, setSteps] = useState(false);
    const [shapeData, setShapeData] = useState(initialState);
    const [validity, setValidity] = useState(false);

     // TAILWIND CLASSES
    const containerClasses = 'container grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

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
            onValidityChange(validityCheck);

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

    const onValidityChange = (handledValidity) => {
        setValidity(handledValidity);
        return;
    }

    // Might want to put the result inside a useMemo() to recall these operations only if necesary

    useEffect(() => {

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

    // Function to print all shape electors

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

    return(
        <>
            <Button onPress={onOpen} 
                color="primary" 
                variant="shadow" 
                className="mt-4 hidden lg:inline-flex" 
                isDisabled={!shapeData.valid}>
                {!shapeData.valid ? 'Select all your shapes' : 'Start verity.main'}
            </Button>

            <div className={containerClasses}>
                {renderShapeSelectors()}
            </div>

            <Button onPress={onOpen} 
                color="primary" 
                variant="shadow" 
                className="lg:hidden"
                isDisabled={!shapeData.valid}>
                {!shapeData.valid ? 'Select all your shapes' : 'Start verity.main'}
            </Button>

            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                backdrop="blur"
                scrollBehavior="inside"
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">
                                Required steps
                            </ModalHeader>
                            <ModalBody>
                                {validity ? <ResolutionSteps steps={steps} /> : 'Why are you here?'}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
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