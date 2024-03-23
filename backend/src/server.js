const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

console.log('Aplicação inicializada com Sucesso!✅')
const wss = new WebSocketServer({ port: process.env.PORT || 3030 })

wss.on("connection", (ws) => {
  ws.on("error", console.error)

  ws.on("message", (data) => {

    wss.clients.forEach((client) => ws.send(data.toString()))
  })
  console.log("Novo Usuario entrou no chat")
})