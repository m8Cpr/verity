import checkHelper from "./checkHelper";

import dictionary from "../../constants/shapeDictionary";

import Shape from "../../models/Shape";

function mapCallouts(callouts, objectDictionary) {
    var res = {
        status: "OK",
        shapes: [],
        shapTests: []
    };
    var position;

    if (callouts.length !== 3) {
        res.status = "KO";
        res.message = "Not enough callouts";

        return res;
    }

    for (let index in callouts) {
        if (objectDictionary.hasOwnProperty(callouts[index].toLowerCase())) {
            var shapeObject = Object.assign({}, objectDictionary[callouts[index]]);

            var shapTest = new Shape(shapeObject);
            shapTest.setPosition(index);

            shapeObject.position = index;
            res.shapes.push(shapeObject);
            res.shapTests.push(shapTest);
        } else {
            res.status = "KO";
            res.message = "callout: '" + callouts[index] + "' not found";

            return res;
        }
    }

    res.message = mapCallouts.name + " successful";

    return res;
}

function mapThreeDimensionalShape(shapeCombination) {
    var objectDictionary = JSON.parse(JSON.stringify(dictionary));


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

function updateArrayForFinalShapes(shapes, finalShapes) {
    var updatedArray = [];

    for (let index = 0; index < shapes.length; index++) {
		var currentShape = shapes[index];
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

function initializeDissection(shapes, finalShapes) {
    var dissectingShapes = [];
    
    var currentShape;
    var finalShape;
    var currentShapeArray;
    var finalShapeArray;
    var symbolToGive;

    for (let index = 0; index < shapes.length; index++) {
        currentShape = shapes[index];
        finalShape = finalShapes[index];
        currentShapeArray = currentShape.twoDimensionalShapes;
        finalShapeArray = finalShape.twoDimensionalShapes;

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

    return dissectingShapes;
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

const dissectionHelper = {
    mapCallouts: mapCallouts,
    mapThreeDimensionalShape: mapThreeDimensionalShape,
    printShapes: printShapes,
    getComplementaryShapes: getComplementaryShapes,
    updateArrayForFinalShapes: updateArrayForFinalShapes,
    initializeDissection: initializeDissection
}

export default dissectionHelper;