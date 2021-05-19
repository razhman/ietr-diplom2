

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

async function showDetailsTable() {
  $.get('http://localhost:3001/parts2', (data) => {
    let detailsTable = `<table class="table detailsTable">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Деталь</th>
        <th scope="col">Описание</th>
      </tr>
    </thead>
    <tbody>`

    data = sortDetails(data)
    for (let i = 1; i < data.length; i++) {
      detailsTable +=
        `<tr>
        <td><a href="javascript:viewer.isolate(` +
        data[i].node_ids +
        `)">` +
        data[i].name +
        `</a></td>
        <td>` +
        data[i].description +
        `</td>
        </tr>`
    }

    detailsTable += '</tbody></table>'

    $('#info').html(detailsTable)
  })
  if (isAnimationStarted) stopAnimation()
}
function sortDetails(data) {
  let newData = data
  newData.splice(8, 0, newData[61])
  newData.splice(53, 0, newData[63])
  newData.splice(53, 0, newData[65])
  newData.splice(53, 0, newData[67])
  newData.splice(65, 4)
  return newData
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
  if (isAnimationStarted) stopAnimation()
}

async function showAnnotations(id) {
  $.get('http://localhost:3001/procedures', (data) => {
    annotations = JSON.parse(data[id].annotations)
  })
}

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
    let repair = ``
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == 'maintainance')
        mn +=
          `<li><span class="icon"><img src="/./img/icons/list.svg" alt=""></span><a class="li-hover" href="#" onclick = "showProcDescr(` +
          i +
          `)">` +
          data[i].name +
          `</a></li>`
      else
        repair +=
          `<li class="li-hover"><span class="icon"><img src="/./img/icons/list.svg" alt=""></span><a href="#" onclick = "showProcDescr(` +
          i +
          `)">` +
          data[i].name +
          `</a></li>`
      $('#maintainance').html(mn)
      $('#repair').html(repair)
    }
  })
}

async function showTools() {
  let procName = ``
  $.get('http://localhost:3001/tools', (data) => {
    procName += `<h1>Инструменты</h1>
    <table class="table toolsTable">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Инструмент</th>
                <th scope="col">Фотография</th>
                <th scope="col">Описание</th>
              </tr>
            </thead>
            <tbody></tbody>
    `
    for (let i = 0; i < data.length; i++) {
      procName += `<tr>
      <td>`+ data[i].name + `</td>
      <td>`+ data[i].image + `</td>
      <td>`+ data[i].description + `</td>
      </tr>`;
  }

  procName += `</tbody></table>`;
  $("#info").html(procName);
  })
}