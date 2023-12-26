export default class Progress {
  constructor(rootId, radius, startValue) {
    this.progressElement = document.getElementById(rootId);
    this.ctx = this.progressElement.getContext('2d');
    this.size = [this.progressElement.width, this.progressElement.height];
    this.center = [this.progressElement.width / 2, this.progressElement.height / 2];
    this.radius = radius;
    this.backgroundColor = "#EFF3F6";
    this.mainColor = "#005BFF";
    this.currentValue = startValue;
    this.currentPosition = 0;
    this.currentAngle = 0;
    this.rotating = false;
    this.rotationFrame = null;
    this.hidden = false;
  }

  drawCircle = (start= 0, end = 2 * Math.PI, color = this.backgroundColor) => {
    this.ctx.beginPath();
    this.ctx.arc(this.center[0], this.center[1], this.radius, start, end);
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawProgress = () => {
    if (this.currentValue > this.currentPosition) {
      this.currentPosition += 1;
    } else if (this.currentValue < this.currentPosition) {
      this.currentPosition -= 1;
    }

    this.ctx.clearRect(0,0, this.size[0], this.size[1]);
    this.drawCircle()
    this.drawCircle(-1 * (Math.PI / 2), -1 * (Math.PI / 2) +  (Math.PI * 2 * (this.currentPosition / 100)), this.mainColor)
    requestAnimationFrame(this.drawProgress)
  }

  rotate = () => {
    if (this.currentAngle === 360) {
      this.currentAngle = 0;
    } else {
      this.currentAngle += 1;
    }
    this.progressElement.style.transform = `rotate(${this.currentAngle}deg)`;
    this.rotationFrame = requestAnimationFrame(this.rotate)
  }
  setRotation = (value) => {
    if (value) {
      this.rotating = true;
      this.rotate()
    } else {
      this.rotating = false;
      cancelAnimationFrame(this.rotationFrame)
    }
  }
  drawOnChange = (value) => {
    if (value > 100) {
      this.currentValue = 100
    } else if (value < 0) {
      this.currentValue = 0;
    } else {
      this.currentValue = value;
    }
    this.drawProgress()
  }
  hideElement = (value) => {
    this.hidden = value
    if (this.hidden) {
      this.progressElement.classList.add('invisible')
    } else {
      this.progressElement.classList.remove('invisible')
    }
  }
}
