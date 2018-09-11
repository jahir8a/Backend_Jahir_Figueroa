const bodyParser = require('body-parser'),
    http = require('http'),
    buscador = require('./Buscador'),
    express = require('express')

const port = process.env.PORT || 3000,
    app = express(),
    Server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/buscador',buscador)
app.use(express.static('./public'))

Server.listen(port,()=> console.log("servidor ejecutandose en el puerto "+port))