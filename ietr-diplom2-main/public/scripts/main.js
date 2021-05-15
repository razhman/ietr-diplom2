showProcedures()

function startAnimation(id) {
  loadAnimation(doc2, id)
}
function stopAnimation() {
  clearInterval(timer)
  loadModel()
  isAnimationStarted = false
}


for (let li of tree.querySelectorAll('li')){
  let span = document.createElement('span')
  span.classList.add('show')
  li.prepend(span)
  span.append(span.nextSibling)
}
tree.onclick = event => {
  if (event.target.tagName != 'SPAN') return

  let childrenContainer = event.target.parentNode.querySelector('ul')

  if(!childrenContainer) return

  
  childrenContainer.hidden = !childrenContainer.hidden
  // if(childrenContainer.hidden){
  //   event.target.classList.add('hide')
  //   event.target.classList.remove('show')
  // }
  // else {
  //   event.target.classList.add('show')
  //   event.target.classList.remove('hide')
  // }


}
