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
  const span = event.target.parentNode.querySelector('.arrow')

  if(!childrenContainer) return

  childrenContainer.hidden = !childrenContainer.hidden
  

  if(childrenContainer.hidden){
    event.target.classList.add('hide')
    event.target.classList.remove('show')

    span.classList.remove('rotation')
    span.classList.add('node-toggle')
  }
  else {
    event.target.classList.add('show')
    event.target.classList.remove('hide')
    
    span.classList.remove('node-toggle')
    span.classList.add('rotation')
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
  // let i = 0
  // for(let header of headers){
  //   if(i == 3 || i == 4){
  //     header.classList.add('test')
  //     i+=1
  //   } else {
  //     header.classList.add('li-hover')
  //     console.log(header)
  //     i+=1
  //   }
    
  // }
  
  // for (const item of document.querySelectorAll('.li-hover')) {
   
    
  //   item.onclick = onTreeItemCLick
  //   // console.log(item)

  // }
  
 ///console.log(document.querySelectorAll('.li-hover'))

  
  
  // console.log(document.parentElement.querySelector('.li-hover'))

  for (const item of document.getElementsByTagName('span')) {
    item.onclick = onTreeItemCLick
  }