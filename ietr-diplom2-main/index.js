const express = require('express')
const Axios = require('axios')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const clientSessions = require('client-sessions')
const FORGE_CLIENT_ID = 'XgCmlo17bpTMdddGvWhuG9bH9Vb2BCzp'
const FORGE_CLIENT_SECRET = '9Q9QpzcSClCJndQO'

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
const port = process.env.PORT || 3001

const querystring = require('querystring')
let access_token = ''
const scopes = 'data:read data:write data:create bucket:create bucket:read'

app.get('/oauth', function (req, res) {
  Axios({
    method: 'POST',
    url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: querystring.stringify({
      client_id: FORGE_CLIENT_ID,
      client_secret: FORGE_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: scopes,
    }),
  })
    .then(function (response) {
      // Success
      access_token = response.data.access_token
      res.send(response.data)
    })
    .catch(function (error) {
      // Failed
      console.log(error)
      res.send('Failed to authenticate')
    })
})

const os = require('os')
const { default: axios } = require('axios')
function getIp() {
  for (let key in os.networkInterfaces()) {
    if (os.networkInterfaces()[key][1].address != undefined)
      return os.networkInterfaces()[key][1].address
  }
}
const ipAddress = getIp()

app.get('/getIp', function (req, res) {
  res.send(ipAddress) // Возможность узнать IP сервера
})

app.listen(port, () => {
  console.log('The app is running on  http://localhost:' + port)
  console.log('Net address:  http://' + ipAddress + ':' + port)
})

const sqlite3 = require('sqlite3').verbose()
var parts = ''
//open the database
let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err.message)
  } else console.log('Connected to the database.')
})

db.all('SELECT * FROM parts2', [], (err, rows) => {
  if (err) {
    console.error(err.message)
  }
  parts = rows
  console.log(parts)
})

app.get('/parts2', (req, res) => {
  res.send(parts)
})

db.all('SELECT * FROM procedures', [], (err, rows) => {
  if (err) {
    console.error(err.message)
  }
  procedures = rows
})

app.get('/procedures', (req, res) => {
  res.send(procedures)
})

db.all('SELECT * FROM characteristics', [], (err, rows) => {
  if (err) {
    console.error(err.message)
  }
  app.get('/characteristics', (req, res) => {
    res.send(rows)
  })
})

db.all('SELECT * FROM tools', [], (err, rows) => {
  if (err) {
    console.error(err.message)
  }
  app.get('/tools', (req, res) => {
    res.send(rows)
  })
})

app.get('/comments', function (req, res) {
  processData(res, 'SELECT * FROM comments')
})

app.use(
  clientSessions({
    secret: '9x04ycd4t6du6l0m',
    duration: 60 * 60 * 1000,
  })
)
app.post('/register', function (req, res) {
  if (req.body.password === req.body.repeatpassword) {
    db.serialize(function () {
      db.all(
        `SELECT * FROM users WHERE username = ?`,
        [req.body.username],
        (err, rows) => {
          if (rows.length == 0) {
            db.run(
              'INSERT INTO users (username, password) VALUES (?, ?)',
              [
                req.body.username,
                bcrypt.hashSync(
                  req.body.password,
                  bcrypt.genSaltSync(10),
                  null
                ),
              ],
              (err) => {
                if (err) {
                  return console.log(err.message)
                }
                console.log(
                  `Пользователь добавлен: ` + JSON.stringify(req.body.username)
                )
                res.sendStatus(200)
              }
            )
          } else {
            alert('Такой пользователь уже есть')
            res.sendStatus(404)
          }
        }
      )
    })
  } else {
    alert('Не совпадает пароль и подтверждение пароля')
    res.sendStatus(400)
  }
})

app.post(`/login`, function (req, res) {
  db.serialize(function () {
    db.all(
      `SELECT * FROM users WHERE username = ?`,
      [req.body.username],
      (err, rows) => {
        if (rows.length == 1) {
          if (isValidPassword(rows[0], req.body.password)) {
            req.session_state.username = req.body.username
            req.session_state.admin = rows[0].admin
            res.send(req.body.username)
          } else {
            console.error('Неправильный пароль')
            res.sendStatus(400)
          }
        } else {
          console.error('Неправильный логин')
          res.sendStatus(404)
        }
      }
    )
  })
})

let isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}
app.get('/currentUser', function (req, res) {
  res.send({
    username: req.session_state.username,
    isAdmin: req.session_state.admin,
  })
})

app.get('/logout', function (req, res) {
  req.session_state.reset()
  res.send()
})

app.post('/addComment', function (req, res) {
  db.serialize(function () {
    db.run(
      'INSERT INTO comments (name, text, proc_id, date) VALUES (?, ?, ?, ?)',
      [req.body.name, req.body.text, req.body.proc_id, req.body.date],
      (err) => {
        if (err) {
          return console.log(err.message)
        }
        console.log(
          `Row was added to the table "comments": ` + JSON.stringify(req.body)
        )
        res.send()
      }
    )
  })
})

function processData(res, sql) {
  db.serialize(function () {
    db.all(sql, function (err, rows) {
      if (err) {
        console.error(err)
        res.status(500).send(err)
      } else sendData(res, rows, err)
    })
  })
}

function sendData(res, data, err) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(data)
}

app.post('/deleteComment', function (req, res) {
  let comments = []
  db.serialize(function () {
    db.all(
      'SELECT * FROM comments WHERE proc_id = ?',
      [req.body.proc_id],
      (err, rows) => {
        if (err) {
          console.error(err.message)
        }
        comments = rows
        db.all(
          `DELETE FROM comments WHERE id = ?`,
          [comments[req.body.id].id],
          (err, rows) => {
            if (err) {
              return console.log(err.message)
            }
            console.log(
              'Removed comment: ' + JSON.stringify(comments[req.body.id])
            )
            res.send()
          }
        )
      }
    )
  })
})
