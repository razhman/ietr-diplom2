async function showEngineDescription() {
  $.get('http://localhost:3000/parts', (data) => {
    $('#info').html(data[0].description)
  })
  closeNav()
}

function showPartDescription(d) {
  $.get('http://localhost:3000/parts', (data) => {
    $('#partdesc').html(data[d].description)
  })
}

function openNav() {
  document.getElementById('mySidenav').style.width = '300px'
  const info = document.getElementById('info')
  info.onclick = () => {
    closeNav()
  }
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}

function CallPrint(strid) {
  var prtContent = document.getElementById(strid)
  var prtCSS = `<style>
    p {
        font-weight: bold;
    }
    body {
        width: 100%;
        grid-template-columns: 65% 35%;
        grid-template-rows: 60% 40%;
        font-family: "Open Sans", sans-serif;
    }
    </style>`
  var WinPrint = window.open(
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
  WinPrint.print()
}

function selectionPart() {
  document.getElementById('info').innerHTML = `<h1><b>Информация о детали:</b></h1>
    <div id="partdesc">
        <p>Выберите деталь</p>
    </div>`
  const viewer = document.getElementById('viewer')
  viewer.style.height = '920px'
  closeNav()
}
