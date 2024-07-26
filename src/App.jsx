import { useEffect, useState } from "react";

import "./App.css";
import dictionary from "./constants/shapeDictionary";
import verity from "./scripts/verity";

import ResolutionSteps from "./components/ResolutionSteps";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import ShapeSelectorContainer from "./components/ShapeSelectorContainer";

function App() {

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

            <ShapeSelectorContainer />

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
