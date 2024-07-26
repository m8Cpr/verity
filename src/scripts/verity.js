import checkHelper from "./helpers/checkHelper";
import dissectionHelper from "./helpers/dissectionHelper";
import Shape from "../models/Shape";

import dictionary from "../constants/shapeDictionary";

function dissection(startingShapes, finalShapes) {
    console.log("Starting dissection");

    var isFinalShape = false;
    var i = 0; // SECURITY INDEX FOR AVOIDING INFINITE LOOPS
    var res;
    var shapes;
    var steps = [];

    do {
        shapes = res ? res.shapes : startingShapes;
	    res = dissectionStep(shapes, finalShapes);
		isFinalShape = checkHelper.isFinalShape(res.shapes);
        steps.push(res.step);
		i++;
    } while(!isFinalShape && i < 5)

	dissectionHelper.printSteps(steps, i);

    return steps;
}

function dissectionStep(startingShapes, finalShapes) {
    console.log("---INITIALIZE---");
    console.log(startingShapes);

    var res = {
        status: 'OK'
    }

    // STEP 0 - INITIALIZE dissectingShapes array
    var dissectingShapes = [];

    var currentShape;
    var finalShape;
    var currentShapeArray;
    var finalShapeArray;
    var isFinalShape;

    // for each shape checks which symbols are to be given away and if there are final shapes ready
    dissectingShapes = dissectionHelper.initializeDissection(startingShapes, finalShapes);

    // STEP 1 - DISSECTION of the previously calculated element.
    var i = 0;
    var oob = false;

    // for each shape attempt to perform a dissection, skip final shapes
    while (i < dissectingShapes.length && !oob) {
        // starting vs ongoing
        dissectingShapes = dissectedShapes ? dissectedShapes : dissectingShapes;

        currentShape = dissectingShapes[i];
        finalShape = finalShapes[i];
        currentShapeArray = currentShape && currentShape.getTwoDimensionalShapes();
        finalShapeArray = finalShape && finalShape.getTwoDimensionalShapes();

        // check if final shape | skip iteration if true
        isFinalShape = checkHelper.finalCheck(
            currentShapeArray,
            finalShapeArray
        );

        var symbolToGive = currentShape.getSymbolToGive();
        var givingIndex = symbolToGive && symbolToGive.index;
        var currentlyGiving = currentShapeArray[givingIndex] || false;

        var j = 0;
        var dissectedShapes = [];
        var otherShape;
        var otherSymbol;
        var otherShapeArray;

        if (isFinalShape) {
            oob = dissectedShapes.length !== dissectingShapes.length;
            i++;
            continue;
        }

        // Cycle through all other shapes and dissect
        while (j < dissectingShapes.length) {
            if (dissectedShapes.length > 0) {
                j++;
                continue;
            }

            otherShape = dissectingShapes[j];
            otherSymbol = otherShape && otherShape.getSymbolToGive();

            if (otherShape === currentShape) {
                j++;
                continue;
            }

            if (
                !otherShape.getNeeds().includes(currentlyGiving) ||
                !otherSymbol
            ) {
                j++;
                continue;
            }

            otherShapeArray = otherShape.getTwoDimensionalShapes();

            otherShapeArray.push(currentlyGiving);
            currentShapeArray.push(otherSymbol.symbol);

            otherShapeArray.splice(otherSymbol.index, 1);
            currentShapeArray.splice(givingIndex, 1);

            currentShape.setTwoDimensionalShapes(currentShapeArray);
            otherShape.setTwoDimensionalShapes(otherShapeArray);

            dissectedShapes.push(otherShape);

            j++;
        }
        dissectedShapes.push(currentShape);

        dissectedShapes = updateDissection(
            dissectedShapes,
            dissectingShapes,
            finalShapes
        );

        res.step = {
            firstDissection: dissectionHelper.writeStep(currentShape, 'shape'),
            secondDissection: dissectionHelper.writeStep(otherShape, 'shape'),
            currentShapes: dissectedShapes
        };

        console.log("---DISSECTED---");
        console.log(dissectedShapes);

        // CHECK OOB - currently disabled. the one above should be enough
        //oob = dissectedShapes.length !== dissectingShapes.length;

        i++;
    }

    // STEP 3 - RETURN the dissected shapes in a JSON res format

    res.shapes = dissectingShapes;

    return res;
}

function updateDissection(newShapes, oldShapes, finalShapes) {
    newShapes.sort((a, b) => a.position - b.position);

    var combinedShapes = [];

    // map modified positions to keep track of which shapes have been used
    let modifiedPositions = new Set(newShapes.map((shape) => shape.position));

    for (let index in newShapes) {
        var newShapeObject = {};
        var newShape;
        var finalShapeCheck;

        // Prepare newShapeObject for newShape Model
        newShapeObject.position = newShapes[index].position;
        newShapeObject.twoDimensionalShapes = newShapes[index].twoDimensionalShapes;
        newShapeObject.threeDimensionalShape = dissectionHelper.mapThreeDimensionalShape(
            newShapeObject.twoDimensionalShapes,
            dictionary
        );

        finalShapeCheck = checkHelper.finalCheck(
            newShapeObject.twoDimensionalShapes,
            finalShapes[index].getTwoDimensionalShapes()
        )
        
        newShape = new Shape(newShapeObject, finalShapeCheck);

        combinedShapes.push(newShape);
    }

    // Add back oldShapes to the array
    for (let i = 0; i < oldShapes.length; i++) {
        if (!modifiedPositions.has(oldShapes[i].position)) {
            combinedShapes.push(oldShapes[i]);
        }
    }

    combinedShapes.sort((a, b) => a.position - b.position);

    combinedShapes = dissectionHelper.updateArrayForFinalShapes(combinedShapes, finalShapes);

    return combinedShapes;
}

// CODE STARTS HERE

function main(insideCallouts, outsideCallouts) {
    //var insideCallouts = ["C", "T", "S"]; // for now, i'm keeping these two as fallback since they work
    //var outsideCallouts = ["sphere", "prism", "prism"];
    var objectDictionary = JSON.parse(JSON.stringify(dictionary.outside));

    var finalShapes = dissectionHelper.getFinalShapes(insideCallouts, objectDictionary);
    var startingShapes = dissectionHelper.mapCallouts(outsideCallouts, objectDictionary);

    console.log("------START");

    if (startingShapes.status !== "OK" || finalShapes.status !== "OK") {
        console.log("MESSAGGIO DI ERRORE");
    } else {

        startingShapes.shapes = dissectionHelper.updateArrayForFinalShapes(
            startingShapes.shapes,
            finalShapes.shapes
        );

        return dissection(startingShapes.shapes, finalShapes.shapes);
    }
}

const verity = {
    main: main,
};

export default verity;
