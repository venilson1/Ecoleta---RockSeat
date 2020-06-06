const express = require("express")
const nunjucks = require("nunjucks")
const server = express()

//pegar banco de dados
const db = require("./database/db.js")

server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded( { extended: true } ))

nunjucks.configure("src/views", {
  express: server,
  noCashe: true

})
// configurar caminhos da minha aplicação
// pagina inicial
// req e res

server.get("/", (req, res) => {
  return res.render("index.html", { title: 'Seu Market Place de coleta de resíduos' })   
})




server.get("/create-point", (req, res) => {
  //req.query: Query Strings da nossa URL 
  //console.log(req.query) => envia dados através da URL
  return res.render("create-point.html")   
})



server.post("/savepoint", (req, res) => {
  //req.body: O corpo do nosso formulario
  //console.log(req.body)

  //inserir dados no banco de dados
  const query = ` 
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ] 

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("ERRO NO CADASTRO!!!") 
    }

    console.log("cadastrado com sucesso")
    console.log(this) //o comando this está referenciando a resposta que o run está trazendo 

    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData)

  
})





server.get("/search", (req, res) => {

  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }

  //pegar os dados do banco de dados
  
  db.all(`SELECT * FROM places WHERE city LIKE "%${search}%"`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    
    const total = rows.length
    console.log(rows)
    
    //mostrar a pagina html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total })
  }) 

  // return res.render("search-results.html")   
})

server.listen(3000)
