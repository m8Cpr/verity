import { useEffect, useState } from "react";

import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

import ShapeSelector from "./components/ShapeSelector";
import ResolutionSteps from "./components/ResolutionSteps";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

function App() {

    // Tailwind classes
    const containerClasses = 'container grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12';

    // React states and hooks
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [steps, setSteps] = useState(false);

    // This handleClick will be replaced by a function that will trigger when all shapes has been selected
    
    const handleClick = () => {
        const $shapeSelector = document.querySelectorAll('.shape-selector');
        var innerShapes = [];
        var outerShapes = [];

        for(let i= 0; i < $shapeSelector.length; i++) {
            var innerShape = $shapeSelector[i].getAttribute('data-inside');
            var outerShape = $shapeSelector[i].getAttribute('data-outside');
            innerShapes.push(innerShape);
            outerShapes.push(outerShape);
        }
        
        if (innerShapes.length === outerShapes.length && innerShapes.length === 3) {
            setSteps(verity.main());
        }
    };

    // Might want to put the result inside a useMemo() to recall these operations only if necesary

    useEffect(() => {

        if (!isOpen) return;

        const $shapeSelector = document.querySelectorAll('.shape-selector');
        var innerShapes = [];
        var outerShapes = [];

        for(let i= 0; i < $shapeSelector.length; i++) {
            var innerShape = $shapeSelector[i].getAttribute('data-inside');
            var outerShape = $shapeSelector[i].getAttribute('data-outside');
            innerShapes.push(innerShape);
            outerShapes.push(outerShape);
        }

        if (innerShapes.length === outerShapes.length && innerShapes.length === 3) {
            setSteps(verity.main(innerShapes, outerShapes));
        }

    }, [isOpen])

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

    return (
        <>
            <h1>Verity Encounter</h1>
            <Button onPress={onOpen} 
                color="primary" 
                variant="shadow" 
                className="mt-4 hidden lg:inline-flex" 
                isDisabled={false}>
                Lancia verity.main
            </Button>

            <div className={containerClasses}>
                {renderShapeSelectors()}
            </div>

            <Button onPress={onOpen} color="primary" variant="shadow" className="lg:hidden">
                Lancia verity.main
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
                                <ResolutionSteps steps={steps} />
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

export default App;
