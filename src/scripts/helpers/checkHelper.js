import dictionary from "../../constants/shapeDictionary";

function check(currentArray, targetArray) {
  var foundMatches = [];
  var needed = [];

  targetArray.filter((shape) => {
    currentArray.indexOf(shape) > -1
      ? foundMatches.push(shape)
      : needed.push(shape);
  });

  var res = {
    hasSomeShapes: foundMatches.length > 0,
    neededShapes: needed,
    foundMatches: foundMatches,
  };

  return res;
}

function finalCheck(currentArray, targetArray) {
  if (!currentArray || !targetArray) {
    return false;
  }
  var hasSameShapes =
    currentArray.every((shape) => targetArray.indexOf(shape) > -1) &&
    targetArray.every((shape) => currentArray.indexOf(shape) > -1);

  return hasSameShapes;
}

function isFinalShape(shapes) {
  return shapes.every((shape) => shape.needsForFinalShape.length === 0);
}

function validityCheck(innerShapes, outerShapes) {
  let countInnerShapes = {}
  let countOuterShapes = {
    S: 2,
    C: 2,
    T: 2
  }

  for (let shape in innerShapes) {
    if (!innerShapes[shape]) return false;
    if (countInnerShapes[innerShapes[shape]]) return false
    else countInnerShapes[innerShapes[shape]] = 1;
  }

  outerShapes = outerShapes.map((shape) => {
    if (!shape) return '';
    return dictionary.outside[shape].twoDimensionalShapes;
  })

  for (let shape in outerShapes) {
    if (!outerShapes[shape]) return false;
    for (let index in outerShapes[shape]) {
      if (countOuterShapes[outerShapes[shape][index]] > 0) {
        countOuterShapes[outerShapes[shape][index]]--;
      }
      else return false;
    }
  }

  return true;
}

const checkHelper = {
  check: check,
  finalCheck: finalCheck,
  isFinalShape: isFinalShape,
  validityCheck: validityCheck
}

export default checkHelper;