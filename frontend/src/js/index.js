const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")


const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold"
]

const user = { id: "", name: "", color: "" }

const myMessages = (content) => {
  const div = document.createElement("div")

  div.classList.add("my")
}

let webSocket;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const processMessage = ( {data} ) => {
  const { userId, userName, userColor, content } = JSON.parse(data)
}

const handleLogin = (event) => {
  event.preventDefault()

  user.id = crypto.randomUUID()
  user.name = loginInput.value
  user.color = getRandomColor()

  login.style.display = "none"
  chat.style.display = "flex"

  webSocket = new WebSocket("ws://localhost:3030")

  webSocket.onmessage = processMessage

  console.log(user)
}

const sendMessage = (event) => {
  event.preventDefault()

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value
  }

  webSocket.send(JSON.stringify(message))

  chatInput.value = ""
}

login.addEventListener("submit", handleLogin)
chat.addEventListener("submit", sendMessage)