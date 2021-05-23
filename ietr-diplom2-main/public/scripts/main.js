showProcedures()

function startAnimation(id) {
  loadAnimation(doc2, id)
}
function stopAnimation() {
  clearInterval(timer)
  loadModel()
  isAnimationStarted = false
}

for (let li of tree.querySelectorAll('li')) {
  let span = document.createElement('span')
  span.classList.add('show')
  li.prepend(span)
  span.append(span.nextSibling)
}

tree.onclick = (event) => {
  if (event.target.tagName != 'SPAN') return

  const childrenContainer = event.target.parentNode.querySelector('ul')
  const span = event.target.parentNode.querySelector('.arrow')

  if (!childrenContainer) return

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

function CallPrint(strid) {
  var prtContent = document.getElementById(strid)
  var prtCSS = `<style>
    p {
        font-weight: bold;
    }
    .btn-success{
      width: 180px;
      height: 40px;
    }
    body {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 8%;
      
    }
    .toolsTable img{
      max-width:100px;
  }
    </style>`
  // var WinPrint = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
  let WinPrint = window.open(
    '',
    '',
    'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0'
  )
  WinPrint.document.write('<head>')
  WinPrint.document.write(prtCSS)
  WinPrint.document.write('</head>')
  WinPrint.document.write('<body>')
  WinPrint.document.write(prtContent.innerHTML)
  WinPrint.document.write('</body>')
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
  // document.querySelector('.modal-open').classList.remove('modal-open')
  // 

    
 
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

// checkUser()
// async function checkUser() {
//   let user = await getCurrentUser()
//   if (user.username != undefined) {
//     $('#authorizationLink').html = user.username
//     $("#logout").append(`<button id="logoutbutton" type="button" onclick="logout()" class="cancelbtn btn btn-secondary">Выйти</button>`)
//   }
//   user = undefined
// }

//  document.getElementsByTagName('body').classList.remove('modal-open')

// $(document).ready(function () {
//   openLoginModal()
// })
