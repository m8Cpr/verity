class Shape {
    constructor(shapeObject) {
      this.threeDimensionalShape = shapeObject.threeDimensionalShape;
      this.twoDimensionalShapes = shapeObject.twoDimensionalShapes;

      this.position = -1;
    }

    // getters
  
    getThreeDimensionalShape() {
      return this.threeDimensionalShape;
    }
  
    getTwoDimensionalShapes() {
      return this.twoDimensionalShapes;
    }

    getPosition() {
      return this.position;
    }
  
    // setters

    setThreeDimensionalShape(shape) {
      this.threeDimensionalShape = shape;
    }
  
    setTwoDimensionalShapes(shapes) {
      this.twoDimensionalShapes = shapes;
    }

    setPosition(index) {
      this.position = index;
    }
  
    // Metodo per stampare le informazioni della forma
    printInfo() {
      console.log(`Three-dimensional shape: ${this.getThreeDimensionalShape()}`);
      console.log(`Two-dimensional shapes: ${this.getTwoDimensionalShapes()}`);
      console.log(`position: ${this.getPosition()}`);
    }
  }

  export default Shape;  