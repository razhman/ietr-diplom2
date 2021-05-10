showProcedures()

function startAnimation(id) {
  loadAnimation(doc2, id)
}
function stopAnimation() {
  clearInterval(timer)
  loadModel()
  isAnimationStarted = false
}


