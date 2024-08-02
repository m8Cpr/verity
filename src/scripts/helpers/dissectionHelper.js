import checkHelper from "./checkHelper";
import Shape from "../../models/Shape";

import dictionary from "../../constants/shapeDictionary";

function mapCallouts(callouts, objectDictionary, areFinalShapes) {
    var res = {
        status: "OK",
        shapes: [],
    };
    var isFinalShape = areFinalShapes || false;

    if (callouts.length !== 3) {
        res.status = "KO";
        res.message = "Not enough callouts";

        return res;
    }

    for (let index in callouts) {
        if (objectDictionary.hasOwnProperty(callouts[index].toLowerCase())) {
            var shapeObject = Object.assign({}, objectDictionary[callouts[index]]);
            shapeObject.position = index;

            var shape = new Shape(shapeObject, isFinalShape);

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

function mapThreeDimensionalShape(shapeCombination) {
    var objectDictionary = JSON.parse(JSON.stringify(dictionary.outside));


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

function printSteps(stepObjectArray, iterations) {
    var shapes;
    
    for (let index in stepObjectArray) {
        shapes = [];
        if (!stepObjectArray[index]) continue;

        stepObjectArray[index].currentShapes.forEach(shape => {
            shapes.push(shape.getThreeDimensionalShape());
        })
    }
}

function getFinalShapes(shapesArray, dictionary) {
    var res = {
        status: "OK",
        shapes: [],
    };

    var mapResponse = [];

    if (shapesArray.length !== 3) {
        (res.status = "KO"),
            (res.message = "Impossible amount of shapes. Check input");

        return res;
    }

    for (let index in shapesArray) {
        switch (shapesArray[index]) {
            case "C":
                mapResponse.push("prism");
                break;
            case "T":
                mapResponse.push("cilinder");
                break;
            case "S":
                mapResponse.push("cone");
                break;
            default:
                res.status = "KO";
                res.message = shapesArray[index] + "is not a valid 2D shape.";
                break;
        }
    }

    //make finalShapes
    mapResponse = mapCallouts(mapResponse, dictionary, true);

    if (mapResponse.status === 'OK') {
        res.shapes = mapResponse.shapes;
    }
    else {
        res.status = 'KO';
        res.message = shapes.message;
    }

    res.message = res.message
        ? res.message
        : getFinalShapes.name + " succesful.";

    return res;
}

function updateArrayForFinalShapes(shapes, finalShapes) {
    
    for (let index = 0; index < shapes.length; index++) {
		var currentShape = shapes[index];
		var currentShapePosition = currentShape.getPosition();
        var currentShapeArray = currentShape.getTwoDimensionalShapes();
        var finalShape = finalShapes.filter(function(shape) {
			return shape.getPosition() === currentShapePosition;
		  })[0];
		var finalShapeArray = finalShape.getTwoDimensionalShapes();
        var checkCurrent = checkHelper.check(
            currentShapeArray,
            finalShapeArray
        );

        if (checkCurrent.hasSomeShapes) {
            currentShape.setHas(checkCurrent.foundMatches);
        }

        currentShape.setNeeds(checkCurrent.neededShapes);

    }

    return shapes;
}

function initializeDissection(shapes, finalShapes) {
    var currentShape;
    var finalShape;
    var currentShapeArray;
    var finalShapeArray;
    var symbolToGive;
    var symbolIndex;
    var isFinalShape;

    for (let index = 0; index < shapes.length; index++) {
        currentShape = shapes[index];
        finalShape = finalShapes[index];
        currentShapeArray = currentShape.getTwoDimensionalShapes();
        finalShapeArray = finalShape.getTwoDimensionalShapes();

        symbolIndex = currentShape.getHas() &&
            finalShapeArray.includes(currentShape.getHas()[0]) && 
            currentShapeArray.indexOf(currentShape.getHas()[0]);

        isFinalShape = checkHelper.finalCheck(currentShapeArray, finalShapeArray);
        
        if (isFinalShape) {
            continue;
        }

        // non va bene. trova un metodo per restituire sempre il valore corretto.
        if (
            symbolIndex === 0
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
        currentShape.setSymbolToGive(symbolToGive);
    }

    return shapes;
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

function writeStep(shape, type) {
    var message;

    var symbol = shape.getSymbolToGive().symbol;
    symbol = dictionary.inside[symbol].name;
    var threeDshape = shape.getThreeDimensionalShape();
    var position;
    switch(shape.getPosition()) {
        case "0":
            position = 'left';
            break;
        case "1":
            position = 'mid';
            break;
        case "2":
            position = 'right';
            break;
    }

    message = 
    'Dissect ' + symbol + 
    ' from ' + threeDshape + 
    ' on ' + position;

    var messageObject = {
        message: message,
        symbol: symbol,
        shape: threeDshape,
        position: position
    }

    return messageObject;
}

const dissectionHelper = {
    mapCallouts: mapCallouts,
    mapThreeDimensionalShape: mapThreeDimensionalShape,
    printSteps: printSteps,
    getFinalShapes: getFinalShapes,
    updateArrayForFinalShapes: updateArrayForFinalShapes,
    initializeDissection: initializeDissection,
    writeStep: writeStep
}

export default dissectionHelper;