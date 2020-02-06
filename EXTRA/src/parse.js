/* Importing packages */
const antlr4 = require('antlr4/index')
const fs = require('fs-extra')
var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'source_code'
})

/* Importing files */

/* Importing ANTLR GENERATED Javascript language specific files */
const Lexer = require('./rpgLexer')
const Parser = require('./rpgParser')
const ParserListenerOverride = require('./rpgParserListenerOverride')
const ErrorListenerOverride = require('./rpgErrorListenerOverride')

/* Forming Concatenated strings to call antlr parser for specific source language */
var lex = eval('Lexer.rpgLexer')
var par = eval('Parser.rpgParser')
var listOverride = eval('ParserListenerOverride.rpgParserListenerOverride')
var errListOverride = eval('ErrorListenerOverride.rpgErrorListenerOverride')

var parseFile = (fName) => {
  return new Promise((resolve, reject) => {
    /* Read source code file */
    fs.readFile(fName, 'UTF-8', function (err, data) {
      if (err) {
        reject(new Error(err))
      } else if (data) {
        var chars = new antlr4.InputStream(data)
        var lexer = new lex(chars)
        var tokens = new antlr4.CommonTokenStream(lexer)
        var parser = new par(tokens)
        var errors = []
        parser.removeErrorListeners()
        var listener = new errListOverride(errors)
        parser.addErrorListener(listener)
        var tree = parser.startRule()
        var text = new listOverride()
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(text, tree)
        parser.buildParseTrees = true
        if (errors.length) {
          console.log('Parsing error!')
          reject(new Error(errors))
        } else {
          console.log('Parsed successfully!', JSON.stringify(ParserListenerOverride.jsonArray, undefined, 2))

          pool.query('INSERT INTO code SET ?', ParserListenerOverride.jsonArray, function (err, rows, fields) {
            if (err) throw err
            console.log('The solution is: ', rows[0].solution)
          })
          resolve(ParserListenerOverride.jsonArray)
        }
      } else {
        console.log('Error: ', err)
        reject(new Error(err))
      }
    })
  })
}

module.exports.parseFile = parseFile
