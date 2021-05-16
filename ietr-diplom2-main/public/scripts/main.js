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

  const childrenContainer = event.target.parentNode.querySelector('ul')
  const span = event.target.parentNode.querySelector('.node-toggle')
  
    // console.log('span', span)
    // if(span == null){
    //   span.classList.add('node-toggle')
    // } else {
    // span.classList.remove('node-toggle')+
    // span.classList.add('rotation')
    // }
    span.classList.remove('node-toggle')
    span.classList.toggle('rotation')
  

  if(!childrenContainer) return

  childrenContainer.hidden = !childrenContainer.hidden
  

  if(childrenContainer.hidden){
    event.target.classList.add('hide')
    event.target.classList.remove('show')
  }
  else {
    event.target.classList.add('show')
    event.target.classList.remove('hide')
  }
 
  }  

  
 


  let lastItem
  // Запомнинание и оповещение о выделенном элементе и прошлом
  function onTreeItemCLick() {
    if (lastItem) {
      lastItem.style.fontWeight = 'normal'
      //onItemUnselected(lastItem.id)
    }
    this.style.fontWeight = 'bold'
    lastItem = this
    // onItemSelected(this)
  }


  // let headers = document.querySelectorAll('li')
  // for(let header of headers){
  //   header.classList.add('li-hover')
  // }
  for (const item of document.querySelectorAll('.li-hover')) {
    
    item.onclick = onTreeItemCLick

  }