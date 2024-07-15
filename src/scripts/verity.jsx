import checkHelper from "./helpers/checkHelper";
import dissectionHelper from "./helpers/dissectionHelper";

import dictionary from "../constants/shapeDictionary";

function dissectionStep(startingShapes, finalShapes) {
    console.log("starting dissection step");
    // while dissecting != final
    console.log(
        "starting 3D shape: " + startingShapes[0].threeDimensionalShape
    );
    //console.log('finalShape: ' + finalShapes[0].threeDimensionalShape);
    console.log(
        "starting 2D shapes: " + startingShapes[0].twoDimensionalShapes
    );
    var res = dissection(startingShapes, finalShapes);
    var isFinalShape = false;
    var i = 0;
    do {
	    res = dissection(res, finalShapes);
		isFinalShape = checkHelper.isFinalShape(res);
		i++;
    } while(!isFinalShape && i < 5)
	dissectionHelper.printShapes(res);
	console.log(i);
}

function dissection(startingShapes, finalShapes) {
    console.log("---INITIALIZE---");
    console.log(startingShapes);
    // STEP 0 - INITIALIZE dissectingShapes array
    var dissectingShapes = [];

    var currentShape;
    var finalShape;
    var currentShapeArray;
    var finalShapeArray;
    var isFinalShape;

    // for each shape checks which symbols are to be given away and if there are final shapes ready
    dissectingShapes = dissectionHelper.initializeDissection(startingShapes, finalShapes);

    if (dissectingShapes.length === 0) {
        // BENE! TUTTE LE FORME SONO ULTIME E IL RPOGRAMMA FINISCE.
        return startingShapes;
    }

    // STEP 1 - DISSECTION of the previously calculated element.
    var i = 0;
    var oob = false;

    // ATTENTO QUI A CORREGGERE DOPO
    // SCOVA IL PROBLEMA: L'AGGIORNAMENTO DELLA DISSECTING IN DISSECTED
    // VIENE SOVRASCRITTO IN DISSECTING IL VALORE DEGLI OGGETTI
    // RISCRIVI IN FUNZIONE ESTERNA DISSECTIONHELPER
    while (i < dissectingShapes.length && !oob) {
        dissectingShapes = dissectedShapes ? dissectedShapes : dissectingShapes;

        currentShape = dissectingShapes[i];
        finalShape = finalShapes[i];
        currentShapeArray = currentShape && currentShape.twoDimensionalShapes;
        finalShapeArray = finalShape && finalShape.twoDimensionalShapes;

        // check if final shape | deploy error if there are no arrays
        isFinalShape = checkHelper.finalCheck(
            currentShapeArray,
            finalShapeArray
        );
        console.log(
            currentShape.threeDimensionalShape +
                " in position " +
                currentShape.position +
                " isFinalShape: " +
                isFinalShape
        );

        var poppedIndex = !isFinalShape && currentShape.symbolToGive.index;
        var currentlyPopped = !isFinalShape && currentShapeArray[poppedIndex];

        if (!isFinalShape) {
            currentShapeArray.splice(poppedIndex, 1);
        }

        var j = 0;
	    var dissectedShapes = [];
	    var otherShape;
        var otherShapeArray;

        while (j < dissectingShapes.length && !isFinalShape) {
			otherShape = dissectingShapes[j];
            if (otherShape !== currentShape) {
                console.log(
                    currentShape.threeDimensionalShape +
                        " " +
                        currentShape.position +
                        " is giving: " +
                        currentlyPopped
                );
                if (
                    otherShape.needsForFinalShape.includes(currentlyPopped) &&
                    otherShape.symbolToGive &&
					dissectedShapes.length === 0
                ) {
                    console.log(
                        "candidate: " +
                            otherShape.threeDimensionalShape +
                            " " +
                            otherShape.position
                    );
                    otherShapeArray = otherShape.twoDimensionalShapes;

                    otherShapeArray.push(currentlyPopped);
                    currentShapeArray.push(otherShape.symbolToGive.symbol);

                    otherShapeArray.splice(otherShape.symbolToGive.index, 1);

                    dissectedShapes.push(otherShape);
                }
            }
            j++;
        }
        dissectedShapes.push(currentShape);

        if (!isFinalShape) {
            //console.log('Dissect ' + currentlyPopped + ' from ' + currentShape.position);
            //console.log('Dissect ' + otherShape.symbolToGive.symbol + ' from ' + otherShape.position);

            // updateShapes and print step
            dissectedShapes = updateDissection(
                dissectedShapes,
                dissectingShapes,
                finalShapes
            );
            console.log("---DISSECTED---");
            console.log(dissectedShapes);
            //dissectedShapes = dissection(dissectedShapes, finalShapes)
        }

		// CHECK OOB
		oob = dissectedShapes.length !== dissectingShapes.length;

        i++;
    }

    return dissectingShapes;
}

function updateDissection(newShapes, oldShapes, finalShapes) {
    // Ordina newShapes in ordine crescente basandoti su newShapes[i].position
    newShapes.sort((a, b) => a.position - b.position);

    var combinedShapes = [];

    console.log("-- oldShapes --");
    console.log(oldShapes);
    console.log("-- oldShapes --");

    console.log("-- newShapes --");
    console.log(newShapes);
    console.log("-- newShapes --");

    // Crea una mappa delle posizioni modificate
    let modifiedPositions = new Set(newShapes.map((shape) => shape.position));

    for (let index in newShapes) {
        var newShape = {};
        var shapeCheck;
        newShape.position = newShapes[index].position;
        newShape.threeDimensionalShape = dissectionHelper.mapThreeDimensionalShape(
            newShapes[index].twoDimensionalShapes,
            dictionary
        );
        newShape.twoDimensionalShapes = newShapes[index].twoDimensionalShapes;

        combinedShapes.push(newShape);
    }

    // Aggiungi gli elementi di oldShapes che non sono stati modificati
    for (let i = 0; i < oldShapes.length; i++) {
        if (!modifiedPositions.has(oldShapes[i].position)) {
            combinedShapes.push(oldShapes[i]);
        }
    }

    // Ordina di nuovo il nuovo array in base alla posizione per garantire l'ordine corretto
    combinedShapes.sort((a, b) => a.position - b.position);

    combinedShapes = dissectionHelper.updateArrayForFinalShapes(combinedShapes, finalShapes);

    // Stampa gli elementi del nuovo array combinato
    for (let i in combinedShapes) {
        console.log(combinedShapes[i]);
    }

    return combinedShapes;
}

// CODE STARTS HERE
// c'è un problema con le 2Dshapes al termine del primo ciclo. non vengono impostate correttamente

function main() {
    var insideCallouts = ["C", "T", "S"];
    var outsideCallouts = ["sphere", "prism", "prism"];
    var objectDictionary = JSON.parse(JSON.stringify(dictionary));

    console.log(objectDictionary.sphere)


    var startingShapes = dissectionHelper.mapCallouts(outsideCallouts, objectDictionary);
    var complementaryShapes = dissectionHelper.getComplementaryShapes(insideCallouts);

    console.log("------START");

    if (startingShapes.status !== "OK" || startingShapes.status !== "OK") {
        console.log("MESSAGGIO DI ERRORE");
    } else {
        complementaryShapes = dissectionHelper.mapCallouts(complementaryShapes.shapes, objectDictionary);

        startingShapes.shapes = dissectionHelper.updateArrayForFinalShapes(
            startingShapes.shapes,
            complementaryShapes.shapes,
            startingShapes.shapTests,
            complementaryShapes.shapTests
        );

        //console.log(startingShapes);
        dissectionStep(startingShapes.shapes, complementaryShapes.shapes);
    }
}

const verity = {
    main: main,
};

export default verity;
