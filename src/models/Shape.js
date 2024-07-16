class Shape {
    constructor(shapeObject, isFinalShape) {
      this.threeDimensionalShape = shapeObject.threeDimensionalShape;
      this.twoDimensionalShapes = shapeObject.twoDimensionalShapes;
      this.position = shapeObject.position;
      this.needsForFinalShape = [];
      this.hasForFinalShape = isFinalShape ? shapeObject.twoDimensionalShapes : [];
      this.symbolToGive = {
        symbol: '',
        index: -1
      }
    }

    // 3Dshapes  
    getThreeDimensionalShape() {
      return this.threeDimensionalShape;
    }
    setThreeDimensionalShape(shape) {
      this.threeDimensionalShape = shape;
    }
  
    // 2Dshapes
    getTwoDimensionalShapes() {
      return [...this.twoDimensionalShapes];
    }
    setTwoDimensionalShapes(shapes) {
      this.twoDimensionalShapes = shapes;
    }

    // Position
    getPosition() {
      return this.position;
    }
    setPosition(index) {
      this.position = index;
    }

    // Needs
    getNeeds() {
      return [...this.needsForFinalShape];
    }
    setNeeds(neededShapesArray) {
      this.needsForFinalShape = neededShapesArray;
    }

    // Has
    getHas() {
      return [...this.hasForFinalShape];
    }
    setHas(gottenShapesArray) {
      this.hasForFinalShape = gottenShapesArray;
    }

    // SymbolToGive
    getSymbolToGive() {
      return {...this.symbolToGive};
    }
    setSymbolToGive(symbolToGive) {
      this.symbolToGive = symbolToGive;
    }
  }

  export default Shape;  