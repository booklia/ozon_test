import Progress from "./entities/Progress";

document.addEventListener('DOMContentLoaded', () => {
  const progressPercentage = document.getElementById('progress-percentage');
  const progressAnimate = document.getElementById('progress-animate');
  const progressHide = document.getElementById('progress-hide');

  const progressInterface = new Progress('progress', 55, 60);


  progressPercentage.addEventListener('change', (e) => progressInterface.drawOnChange(e.target.value));
  progressAnimate.addEventListener('change', (e) => progressInterface.setRotation(e.target.checked));
  progressHide.addEventListener('change', (e) => progressInterface.hideElement(e.target.checked))

  progressInterface.drawProgress()
})
