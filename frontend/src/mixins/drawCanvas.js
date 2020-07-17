const rectStyle = {
  color: "#5dd483",
  width: 2,
};

export const drawCanvas = {
  data() {
    return {
      context: "",
    };
  },
  methods: {
    drawRectangle(resetCanvas) {
      if (resetCanvas) resetCanvas();
      this.context.beginPath();
      this.context.rect(
        this.coordinates[0].x,
        this.coordinates[0].y,
        this.coordinates[1].x - this.coordinates[0].x,
        this.coordinates[1].y - this.coordinates[0].y
      );
      this.context.strokeStyle = rectStyle["color"];
      this.context.lineWidth = rectStyle["width"];
      this.context.stroke();
    },
  },
};
