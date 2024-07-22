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

const checkHelper = {
  check: check,
  finalCheck: finalCheck,
  isFinalShape: isFinalShape
}

export default checkHelper;