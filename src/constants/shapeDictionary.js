const dictionary = {
    outside: {
        cube: {
            threeDimensionalShape: "cube",
            twoDimensionalShapes: ["S", "S"],
            icon: "src/assets/icons/cube.svg",
        },
        sphere: {
            threeDimensionalShape: "sphere",
            twoDimensionalShapes: ["C", "C"],
            icon: "src/assets/icons/sphere.svg",
        },
        pyramid: {
            threeDimensionalShape: "pyramid",
            twoDimensionalShapes: ["T", "T"],
            icon: "src/assets/icons/pyramid.svg",
        },
        cilinder: {
            threeDimensionalShape: "cilinder",
            twoDimensionalShapes: ["S", "C"],
            icon: "src/assets/icons/cilinder.svg",
        },
        prism: {
            threeDimensionalShape: "prism",
            twoDimensionalShapes: ["S", "T"],
            icon: "src/assets/icons/prism.svg",
        },
        cone: {
            threeDimensionalShape: "cone",
            twoDimensionalShapes: ["C", "T"],
            icon: "src/assets/icons/cone.svg",
        }
    },
    inside: {
        C: {
            name: "circle",
            icon: "src/assets/icons/circle.svg"
        },
        T: {
            name: "triangle",
            icon: "src/assets/icons/triangle.svg"
        },
        S: {
            name: "square",
            icon: "src/assets/icons/square.svg"
        },
    }
};

export default dictionary;