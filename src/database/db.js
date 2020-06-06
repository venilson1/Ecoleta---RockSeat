//importar a dependencia do sqlite3 //o metodo verbose é uma função que 
//vai configurar o sqlite3, avisando que queremos ver mensagens 
//no meu terminal sempre que houver mudanças
const sqlite3 = require('sqlite3').verbose()
//iniciar o objeto de bd, que irá fazer operações no bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
//METODO É UMA FUNÇÃO LIGADA Á UM OBJ

db.serialize( () => {//=> vai rodar uma sequencia de codigos
  
  //   //criar uma tabela com comandos SQL 


  //   db.run(`
  //     CREATE TABLE IF NOT EXISTS places (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       image TEXT,
  //       name TEXT,
  //       address TEXT,
  //       address2 TEXT,
  //       state TEXT,
  //       city TEXT,
  //       items TEXT
  //     );
  //   `)

  //   //inserir dados na tabela // query apenas para deixar o codigo limpo
  //   const query = ` 
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `
  //   const values = [
  //     "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  //     "Papersider",
  //     "Guilherme Gembala, Jardim América",
  //     "Nº 260",
  //     "Santa Catarina",
  //     "Rio do Sul",
  //     "Resíduos Eletronicos, Lâmadas"
  //   ] 

  //   function afterInsertData(err) {
  //     if (err) {
  //       return console.log(err)
  //     }

  //     console.log("cadastrado com sucesso")
  //     console.log(this) //o comando this está referenciando a resposta que o run está trazendo 
  //   }

  //   db.run(query, values, afterInsertData) //afterInsertDat só vai ser excutada depois que executar a query e o values => afterInsertDat é um callback

      

  //   //consultar dados na tabela
  //      db.all(`SELECT  name FROM places`, function (err, rows) {
  //     if (err) {
  //       return console.log(err)
  //     }
      
  //     console.log("Aqui estão os seus registros: ")
  //     console.log(rows)
  //   }) 


      //deletar um dado na tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
    //   if (err) {
    //     return console.log(err)
    //   }

    //   console.log("Registro deletado com sucesso!")
    // }) 


})   