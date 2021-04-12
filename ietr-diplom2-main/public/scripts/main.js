async function showEngineDescription() {
  $.get('http://localhost:3001/parts', (data) => {
    $('#info').html(data[0].description)
  })
}

function showPartDescription(d) {
  $.get('http://localhost:3001/parts', (data) => {
    $('#partDescr').html(data[d].description)
  })
}

async function showProcDescr(id) {
  $.get('http://localhost:3001/procedures', (data) => {
    $('#info').html(data[id].descr)
  })
}

function selectionPart() {
  document.getElementById(
    'info'
  ).innerHTML = `<h3><b>Информация о детали:</b></h3>
    <div id="partDescr">
        <p>Выберите деталь</p>      
    </div>`
}

function startAnimation(id) {
  loadAnimation(doc2, id)
}

async function showAnnotations(id) {
  $.get('http://localhost:3001/procedures', (data) => {
    annotations = JSON.parse(data[id].annotations)
  })
}
// function showProcDescr() {
//   document.getElementById('info').innerHTML =
//     `<div id ="info"></div>
//     <button type="button" class="btn btn-primary">Начать анимацию</button>`

//   //closeNav()
// }
