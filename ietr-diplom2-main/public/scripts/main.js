async function showEngineDescription() {
  $.get('http://localhost:3001/parts2', (data) => {
    $('#info').html(data[0].description)
  })
}

async function showPartDescription(id) {
  $.get('http://localhost:3001/parts2', (data) => {
    for (let i = 0; i < data.length; i++) {
      let nodeid = JSON.parse(data[i].node_ids)
      if (nodeid.indexOf(id) != -1) {
        viewer.select(nodeid)
        $('#partDescr').html(
          '<h2>' + data[i].name + '</h2>' + data[i].description
        )
      }
    }
  })
}

// function showPartDescription(d) {
//   $.get('http://localhost:3001/parts', (data) => {
//     $('#partDescr').html(data[d].description)
//   })
// }

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

async function showCharacteristics() {
  $.get('http://localhost:3001/characteristics', (data) => {
    $('#info').html(data[0].description)
  })
}

async function showDiagnostics() {
  $.get('http://localhost:3001/characteristics', (data) => {
    $('#info').html(data[1].description)
  })
}

async function showProcedures() {
  $.get('http://localhost:3001/procedures', (data) => {
    let mn = ``
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "maintainance") mn += `<li><a href="#" showProcDescr(` + i + `)">` + data[i].name + `</a></li>`;
      $("#maintainance").html(mn);
    }
  })
}
