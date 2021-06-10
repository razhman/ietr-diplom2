showEngineDescription()
showProcedures()

function startAnimation(id) {
  loadAnimation(doc2, id)
}
function stopAnimation() {
  clearInterval(timer)
  loadModel()
  isAnimationStarted = false
}

for (let li of tree.querySelectorAll('li')) { //Находит все элементы li внутри списка в дереве
  let span = document.createElement('span')//оборачивает в span
  span.classList.add('show')//добавляет класс show
  li.prepend(span)//добавляет span в начало элемента
  span.append(span.nextSibling)
}

tree.onclick = (event) => {
  if (event.target.tagName != 'SPAN') return //если кликнуто не по span

  const childrenContainer = event.target.parentNode.querySelector('ul')
  const span = event.target.parentNode.querySelector('.arrow')

  if (!childrenContainer) return //если нет вложенных детей

  childrenContainer.hidden = !childrenContainer.hidden

  if (childrenContainer.hidden) {
    event.target.classList.add('hide')
    event.target.classList.remove('show')

    span.classList.remove('rotation')
    span.classList.add('node-toggle')
  } else {
    event.target.classList.add('show')
    event.target.classList.remove('hide')

    span.classList.remove('node-toggle')
    span.classList.add('rotation')
  }
}

let lastItem
// Запоминание и оповещение о выделенном элементе и прошлом
function onTreeItemCLick() {
  if (lastItem) {
    lastItem.style.fontWeight = 'normal'
  }
  this.style.fontWeight = 'bold'
  lastItem = this
}

for (const item of document.getElementsByTagName('span')) {
  item.onclick = onTreeItemCLick
}

function CallPrint(strid) {
  var prtContent = document.getElementById(strid)
  var prtCSS = `<style>
  *{
    font-size: 25px;
  }
  h1{
    font-size: 30px;
  }
   
    .btn-dark{
      width: 250px;
      height: 50px;
    }
    body {
      width: 100%;
      height: 0%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 8%;
      
    }
    .toolsTable img{
      max-width:100px;
  }
    </style>`

  let WinPrint = window.open(
    '',
    '',
    'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0'
  )
  WinPrint.document.write('<head>')
  WinPrint.document.write(prtCSS)
  WinPrint.document.write('</head><br>')
  WinPrint.document.write('<body>')
  WinPrint.document.write(prtContent.innerHTML)
  WinPrint.document.write('</body>')
  // WinPrint.document.write('<div id="info" class="contentpane">')
  // WinPrint.document.write(prtCSS)
  // WinPrint.document.write(prtContent.innerHTML)
  WinPrint.document.close()
  WinPrint.focus()
  WinPrint.onload = () => {
    WinPrint.print()
  }
  WinPrint.onafterprint = () => {
    WinPrint.close()
  }
}

let authorizationForm = document.querySelector('#authorizationForm')
authorizationForm.onsubmit = (event) => {
  event.preventDefault()
  login($('#autLogin').val(), $('#autPassword').val())
}

let registrationForm = document.querySelector('#registrationForm')
registrationForm.onsubmit = (event) => {
  event.preventDefault()
  register(
    $('#regLogin').val(),
    $('#regPassword').val(),
    $('#regPasswordConfirmation').val()
  )
}

checkUser()
async function checkUser() {
  let user = await getCurrentUser()
  if (user.username != undefined) {
    $('#authorizationLink').html(user.username)
    document.querySelector('.autExit').style.display = 'block'
  }
  user = undefined
}
