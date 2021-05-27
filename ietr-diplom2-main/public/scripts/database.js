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
    // $('#info').html(data[id].descr)
    let descr = `<h1>` + data[id].descr + `</h1>`
    // description += `<div id="tools"></div>`;
    // description += data[id].description;
    descr += `<div id="comments"></div>`
    $('#info').html(descr)
    showComments(id)
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
          `<li><span class="icon"><img src="/./img/icons/list.svg" alt=""></span><a class="li-hover" href="javascript:void(0)" onclick = "showProcDescr(` +
          i +
          `)">` +
          data[i].name +
          `</a></li>`
      else
        repair +=
          `<li class="li-hover"><span class="icon"><img src="/./img/icons/list.svg" alt=""></span><a href="javascript:void(0)" onclick = "showProcDescr(` +
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
      procName +=
        `<tr>
      <td>` +
        data[i].name +
        `</td>
      <td>` +
        data[i].image +
        `</td>
      <td>` +
        data[i].description +
        `</td>
      </tr>`
    }

    procName += `</tbody></table>`
    $('#info').html(procName)
  })
}

async function login(username, password) {
  let data = { username: username, password: password }
  $.post({
    traditional: true,
    url: '/login',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'html',
    success: function (response) {
      $('#authorizationLink').html(response)
      showEngineDescription()
      autLogin = document.querySelector('#autLogin')
      autPassword = document.querySelector('#autPassword')
      autLogin.value = ''
      autPassword.value = ''
      $('#loginModal').modal('hide')

      document.querySelector('.autExit').style.display = 'block'
    },
    error: function (error) {
      alert('Неправильный логин или пароль')
    },
  })
}
async function register(username, password, repeatPassword) {
  let data = {
    username: username,
    password: password,
    repeatpassword: repeatPassword,
  }
  $.post({
    traditional: true,
    url: '/register',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'html',
    success: function (response) {
      alert('Вы успешно зарегистрировались!')
      regLogin = document.querySelector('#regLogin')
      regPassword = document.querySelector('#regPassword')
      regPasswordConfirmation = document.querySelector(
        '#regPasswordConfirmation'
      )

      regLogin.value = ''
      regPassword.value = ''
      regPasswordConfirmation.value = ''
    },
    error: function (error) {
      alert('Проверьте правильность пароля')
    },
  })
}

async function getCurrentUser() {
  let result
  $.ajax({
    url: 'http://localhost:3001/currentUser',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data
    },
  })
  return { username: result.username, isAdmin: result.isAdmin }
}

async function logout() {
  $.get('http://localhost:3001/logout', function (data) {
    $('#authorizationLink').html(`Войти
    <span class="icon"><img src="/./img/icons/login.svg" style="width: 30px; height: 30px;" alt=""></span>
    `)
    document.querySelector('.autExit').style.display = 'none'
    $('#loginModal').modal('hide')
    showEngineDescription()
  })
}

async function addComment(name, text, proc_id, date) {
  let data = { name: name, text: text, proc_id: proc_id, date: date }
  $.post({
    traditional: true,
    url: '/addComment',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function (response) {
      console.log(response)
    },
  })
}
async function deleteComment(id, proc_id) {
  $.post({
    traditional: true,
    url: '/deleteComment',
    contentType: 'application/json',
    data: JSON.stringify({ id: id, proc_id: proc_id }),
    dataType: 'html',
    success: function (response) {
      showComments(proc_id - 1)
    },
  })
}
async function showComments(id) {
  $.get('http://localhost:3001/comments', async function (data) {
    let allComments = data.filter((element) => element.proc_id - 1 == id)
    let currentUser = await getCurrentUser()

    let comments = `<div class="comments">
      <h3 class="title-comments">Комментарии</h3>`
    $('#comments').html(comments)
    if (allComments.length != 0) {
      comments = `<div class="comments">
          <h4 class="title-comments">Комментарии(${allComments.length})</h4>
          <ul class="media-list">`
      for (let i = 0; i < allComments.length; i++) {
        comments +=
          `<li class="media">
              <div class="media-body">
                <div class="media-heading">
                  <div class="author">` +
          allComments[i].name +
          `</div>
                  <div class="metadata">
                    <span class="date">` +
          allComments[i].date +
          `</span>
                  </div>
                </div>
                <div class="media-text text-justify">` +
          allComments[i].text +
          `</div>
                <div class="footer-comment">
                  <a class="btn btn-dark" href="javascript:void(0)" onclick="reply('` +
          allComments[i].name +
          `')">Ответить</a>
                </div>`
        if (currentUser.isAdmin == 1)
          comments +=
            `<a class="btn btn-danger" style="width:92px; margin-top: 5px" href="javascript:void(0)" onclick="deleteComment(` +
            i +
            `, ` +
            (id + 1) +
            `)">Удалить</a>`
        comments += `<hr>`
      }

      comments += `</ul></div>`
    } else comments += `</div>`

    if (currentUser.username != undefined) {
      comments += `<form id="commentForm">
          <label for="name">Ваше имя:</label><br>
          <input disabled type="text" id="inputName" required><br>
          <label for="text">Сообщение:</label><br>
          <textarea cols="70" id="inputText" required></textarea><br>
          <p></p>
          <button type="submit" class="btn btn-info" id="commentsubmit">Оставить комментарий</button>
          </form>`
      $('#comments').html(comments)
      $('#inputName').val(currentUser.username)
      let commentForm = document.querySelector('#commentForm')
      commentForm.onsubmit = (event) => {
        event.preventDefault()
        addComment(
          currentUser.username,
          $('#inputText').val(),
          id + 1,
          new Date().toLocaleString('ru-RU')
        ).then(() => showComments(id))
      }
    } else {
      $('#comments').html(comments)
    }
  })
}
function reply(name) {
  $('#inputText').val('<b>' + name + ',</b> ')
}

async function showDocuments() {
  $.get('http://localhost:3001/documents',  data => {
    let info = `<h2>Документы ИЭТР</h2><ul>`
    for (let i = 0; i < data.length; i++) {
      info +=
        `<li><a href="javascript:void(0)" onclick="showDocument('` +
        data[i].file +
        `')">` +
        data[i].name +
        `</a></li`
    }
    info += `</ul>`
    $('#info').html(info)
  })
}

function showDocument(doc) {
  $('#viewer').html(
    `<iframe src="` + doc + `" width="100%" height="100%"></iframe>`
  )
  console.log(doc)
  isModelLoaded = false
}
