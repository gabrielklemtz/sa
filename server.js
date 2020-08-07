// config server
const express = require("express")
const server = express()
var bodyParser = require('body-parser')

// config server arq static
server.use(express.static('public'))

// habilitar body form
server.use(express.urlencoded({extend: true}))

// config BD

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  port     : 5433,
  database : 'avaliar',
});

// VERIFICAR CONEXÃO
connection.connect(()=>{
  console.log('conectado')
  connection.query('select * from doadores', (err, results) =>{
     // console.log(results)
    

  })
});



connection.query("use avaliar")


server.use(bodyParser.urlencoded({ extended: false }));



// confi template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./",{
    express: server

})


// Config apresentação pag

server.get("/avaliar", function (req, res) {
      
      return res.render("avaliar.html")
  
})

server.get("/", function(req,res){

    return res.render(__dirname + '/index.html')

})


server.post("/avaliar", function (req, res) {
    //pegar dados form.
    const nome = req.body.nome
    const email = req.body.email
    const nota = req.body.nota

    if (nome=="" || email=="" || nota==""){
      return res.send("Todos os campos são obrigatórios")
    } 

    // Colocar valors dentro do bd

    console.log(req.body.email);
    console.log(req.body.nome)
    
    connection.query("INSERT INTO avaliadores VALUES (?,?,?,?)",[ ,req.body.nome,req.body.email, req.body.nota]);
    return res.redirect("/avaliar")
  });
  // SELECIONAR OS 4 ULTIMOS APOIADORES   
  server.get("/select", function(req,res){
    connection.query("SELECT * FROM avaliadores ORDER BY id desc LIMIT 4", (err, results, filds)=>{
        res.json(results)

    })
  }) 
    // CONTAR A QUANTIDADE DE APOIADORES
    server.get("/count", function(req,res){
      connection.query("SELECT id, COUNT(*) AS TOTAL FROM avaliadores", (err, results, filds)=>{
          res.json(results)
  
      })

  })



// ligar server e permitir acesso 3000
server.listen(3000, function () {
    console.log("online")  
});

