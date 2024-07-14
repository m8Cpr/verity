import checkHelper from "./helpers/checkHelper";

import dictionary from "../constants/shapeDictionary";


function mapCallouts(callouts) {
    var res = {
        status: "OK",
        shapes: [],
    };
    var position;

    var objectDictionary = JSON.parse(JSON.stringify(dictionary));

    if (callouts.length !== 3) {
        res.status = "KO";
        res.message = "Not enough callouts";

        return res;
    }

    for (let index in callouts) {
        if (objectDictionary.hasOwnProperty(callouts[index].toLowerCase())) {
            var shape = Object.assign({}, objectDictionary[callouts[index]]);

            //position = parseInt(index) === 0 ? 'left' : (parseInt(index) === 1 ? 'mid' : 'right');
            shape.position = index;
            res.shapes.push(shape);
        } else {
            res.status = "KO";
            res.message = "callout: '" + callouts[index] + "' not found";

            return res;
        }
    }

    res.message = mapCallouts.name + " successful";

    return res;
}

function updateArrayForFinalShapes(shapes, finalShapes) {
    var updatedArray = [];

    for (let index = 0; index < shapes.length; index++) {
		var currentShape = shapes[index]
		var currentShapePosition = currentShape.position;
        var currentShapeArray = currentShape.twoDimensionalShapes;
        var finalShape = finalShapes.filter(function(shape) {
			return shape.position === currentShapePosition;
		  })[0];
		var finalShapeArray = finalShape.twoDimensionalShapes;
        var checkCurrent = checkHelper.check(
            currentShapeArray,
            finalShapeArray
        );

        var shape = Object.assign({}, shapes[index]);

        if (checkCurrent.hasSomeShapes) {
            shape.hasForFinalShape = checkCurrent.foundMatches;
        }

        shape.needsForFinalShape = checkCurrent.neededShapes;

        updatedArray.push(shape);
    }

    return updatedArray;
}

function getComplementaryShapes(shapesArray) {
    var res = {
        status: "OK",
        shapes: [],
    };

    if (shapesArray.length !== 3) {
        (res.status = "KO"),
            (res.message = "Impossible amount of shapes. Check input");

        return res;
    }

    for (let index in shapesArray) {
        switch (shapesArray[index]) {
            case "C":
                res.shapes.push("prism");
                break;
            case "T":
                res.shapes.push("cilinder");
                break;
            case "S":
                res.shapes.push("cone");
                break;
            default:
                res.status = "KO";
                res.message = shapesArray[index] + "is not a valid 2D shape.";
                break;
        }
    }

    res.message = res.message
        ? res.message
        : getComplementaryShapes.name + " succesful.";

    return res;
}

function printShapes(shapeObjects) {
    for (let index in shapeObjects) {
        var shapeObject = shapeObjects[index];
        console.log(
            parseInt(index) +
                1 +
                "° shape on " +
                shapeObject.position +
                ": " +
                shapeObject.threeDimensionalShape
        );
        console.log(
            "made of: " +
                shapeObject.twoDimensionalShapes[0] +
                " | " +
                shapeObject.twoDimensionalShapes[1]
        );
    }
}

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
	printShapes(res);
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
    var symbolToGive;

    // for each shape checks which symbols are to be given away and if there are final shapes ready
    for (let index = 0; index < startingShapes.length; index++) {
        currentShape = startingShapes[index];
        finalShape = finalShapes[index];
        currentShapeArray = currentShape.twoDimensionalShapes;
        finalShapeArray = finalShape.twoDimensionalShapes;

        isFinalShape = checkHelper.finalCheck(
            currentShapeArray,
            finalShapeArray
        );

        // if (isFinalShape) {
        //     continue;
        // }

        if (
            currentShape.hasForFinalShape &&
            currentShapeArray[0] === currentShape.hasForFinalShape[0]
        ) {
            symbolToGive = {
                symbol: currentShapeArray[1],
                index: 1,
            };
        } else {
            symbolToGive = {
                symbol: currentShapeArray[0],
                index: 0,
            };
        }

        var shape = Object.assign({}, currentShape);

        shape.symbolToGive = symbolToGive;

        console.log(
            "Shape: '" +
                currentShape.threeDimensionalShape +
                "' needs to give " +
                symbolToGive.symbol
        );

        dissectingShapes.push(shape);
    }

    if (dissectingShapes.length === 0) {
        // BENE! TUTTE LE FORME SONO ULTIME E IL RPOGRAMMA FINISCE.
        return startingShapes;
    }

    // STEP 1 - DISSECTION of the previously calculated element.
    var i = 0;
    var oob = false;

    // ATTENTO QUI A CORREGGERE DOPO
    // SCOVA IL PROBLEMA: L'AGGIORNAMENTO DELLA DISSECTING IN DISSECTED
    while (i < dissectingShapes.length && !oob) {
        dissectingShapes = i === 0 ? dissectingShapes : dissectedShapes;

        currentShape = dissectingShapes[i];
        currentShapeArray = currentShape && currentShape.twoDimensionalShapes;
        finalShapeArray = finalShapes[i] && finalShapes[i].twoDimensionalShapes;

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
        newShape.threeDimensionalShape = mapThreeDimensionalShape(
            newShapes[index].twoDimensionalShapes
        );
        newShape.twoDimensionalShapes = newShapes[index].twoDimensionalShapes;

        combinedShapes.push(newShape);
    }

    combinedShapes = updateArrayForFinalShapes(combinedShapes, finalShapes);

    // Aggiungi gli elementi di oldShapes che non sono stati modificati
    for (let i = 0; i < oldShapes.length; i++) {
        if (!modifiedPositions.has(oldShapes[i].position)) {
            combinedShapes.push(oldShapes[i]);
        }
    }

    // Ordina di nuovo il nuovo array in base alla posizione per garantire l'ordine corretto
    combinedShapes.sort((a, b) => a.position - b.position);

    // Stampa gli elementi del nuovo array combinato
    for (let i in combinedShapes) {
        console.log(combinedShapes[i]);
    }

    return combinedShapes;
}

function mapThreeDimensionalShape(shapeCombination) {
    const objectDictionary = JSON.parse(JSON.stringify(dictionary));

    for (let key in objectDictionary) {
        if (
            arraysHaveSameElements(
                objectDictionary[key].twoDimensionalShapes,
                shapeCombination
            )
        ) {
            var res = objectDictionary[key].threeDimensionalShape;
            return res;
        }
    }
}

function arraysHaveSameElements(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const countMap = new Map();

    for (const item of arr1) {
        countMap.set(item, (countMap.get(item) || 0) + 1);
    }

    for (const item of arr2) {
        if (!countMap.has(item)) {
            return false;
        }
        countMap.set(item, countMap.get(item) - 1);
        if (countMap.get(item) === 0) {
            countMap.delete(item);
        }
    }

    return countMap.size === 0;
}

// CODE STARTS HERE
// c'è un problema con le 2Dshapes al termine del primo ciclo. non vengono impostate correttamente

function main() {
    var insideCallouts = ["C", "T", "S"];
    var outsideCallouts = ["sphere", "prism", "prism"];

    var startingShapes = mapCallouts(outsideCallouts);
    var complementaryShapes = getComplementaryShapes(insideCallouts);

    console.log("------START");

    if (startingShapes.status !== "OK" || startingShapes.status !== "OK") {
        console.log("MESSAGGIO DI ERRORE");
    } else {
        complementaryShapes = mapCallouts(complementaryShapes.shapes);

        startingShapes.shapes = updateArrayForFinalShapes(
            startingShapes.shapes,
            complementaryShapes.shapes
        );

        dissectionStep(startingShapes.shapes, complementaryShapes.shapes);
    }
}

const verity = {
    main: main,
};

export default verity;
