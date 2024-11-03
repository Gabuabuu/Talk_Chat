const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

const userList = document.querySelector(".sidebar")
const onlineUser = document.querySelector(".user-list");
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold"
]

const user = { id: "", name: "", color: "" }

const createMessageSelfElement = (content) => {
  const div = document.createElement("div")
  div.classList.add("my__messages")
  div.innerHTML = content
  return div
}

const addUserToList = (userName, userColor) => {
  // Cria um novo elemento li
  const userItem = document.createElement("li");
  
  // Define o conteúdo do li
  userItem.textContent = userName; // Define o nome do usuário
  userItem.style.color = userColor; // Define a cor do texto
  
  // Adiciona o li à ul
  onlineUser.appendChild(userItem);
}

const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement("div")
  const span = document.createElement("span")

  div.classList.add("ther__messages")
  span.classList.add("message__sender")

  div.appendChild(span)

  span.innerHTML = sender
  span.style.color = senderColor

  div.innerHTML += content

  return div
}

let webSocket;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  })
}

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data)

  const message = userId === user.id
    ? createMessageSelfElement(content)
    : createMessageOtherElement(content, userName, userColor)

  chatMessages.appendChild(message)
  scrollScreen()
}

const handleLogin = async (event) => {
  event.preventDefault()

  user.id = crypto.randomUUID()
  user.name = loginInput.value
  user.color = getRandomColor()

  // Exibe as seções apropriadas
  login.style.display = "none"
  userList.style.display = "flex"
  chat.style.display = "flex"

  // Adiciona o usuário à lista
  const userItem = document.createElement("li")
  userItem.textContent = user.name
  userItem.style.color = user.color
  onlineUser.appendChild(userItem)

  

  webSocket = await new WebSocket("wss://talk-chat-backend.onrender.com")

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

loginForm.addEventListener("submit", handleLogin, addUserToList)
chatForm.addEventListener("submit", sendMessage)
