let currentQuestion = 0
let correctAnswers = 0
const totalQuestions = 16
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const guessedAnswers = []

const answerInput = document.getElementById("answer")
let timerStarted = false

answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer()
    if (!timerStarted) {
      startTimer()
      timerStarted = true
    }
  }
})

const validAnswers = [
  "FESTOOL",
  "UPONOR",
  "ABB",
  "THREEM",
  "MAKITA",
  "HENCO",
  "ATTEMA",
  "DEWALT",
  "SPAX",
  "NEMEF",
  "ILLBRUCK",
  "STANLEY",
  "JUNG",
  "VIEGA",
  "MILWAUKEE",
  "BOSCH",
]

const giveUpButton = document.getElementById("give-up-button")
giveUpButton.addEventListener("click", giveUp)

function giveUp() {
  answerInput.disabled = true

  guessedAnswers.length = 0
  correctAnswers = 0
  currentQuestion = 0

  validAnswers.forEach((answer) => {
    const divToHide = document.getElementById(answer)
    if (divToHide) {
      divToHide.style.display = "none"
    }
  })

  currentQuestionSpan.textContent = currentQuestion
  answerInput.value = ""

  clearInterval(interval)
  answerInput.disabled = true

  document.getElementById("check-button").disabled = true

  answerInput.removeEventListener("keydown", checkAnswer)

  answerInput.value = ""
}

const resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", resetGame)

function resetGame() {
  location.reload()
}

function checkAnswer() {
  const answerInput = document.getElementById("answer")
  const userAnswer = answerInput.value.trim().toUpperCase()

  if (validAnswers.includes(userAnswer)) {
    if (!guessedAnswers.includes(userAnswer)) {
      guessedAnswers.push(userAnswer)
      correctAnswers++
      currentQuestion++

      const divToHide = document.getElementById(userAnswer)
      if (divToHide) {
        divToHide.style.display = "none"
      }

      const coinSound = document.getElementById("coinSound")
      coinSound.play()
    }
  }

  answerInput.value = ""
  currentQuestionSpan.textContent = currentQuestion

  if (correctAnswers === totalQuestions) {
    showGameOver("You Won!")
    const victorySound = document.getElementById("victorySound")
    victorySound.play()
    answerInput.disabled = true
    clearInterval(interval)
  }
}

let countdownValue = 59
const countdownElement = document.getElementById("timer")
const overlay = document.getElementById("overlay")
const overlayText = document.getElementById("overlay-text")
let interval

function updateCountdown() {
  countdownElement.textContent = countdownValue
  countdownValue--

  if (countdownValue < 0) {
    showGameOver("Game Over!")
    const gameOverSound = document.getElementById("gameOverSound")
    gameOverSound.play()
    answerInput.disabled = true
    clearInterval(interval)
  }
}

function clearOverlay() {
  overlay.style.display = "none"
}

function showGameOver(message) {
  overlay.style.display = "block"
  overlayText.textContent = message
  clearInterval(interval)
}

function startTimer() {
  clearOverlay()
  countdownValue = 59
  clearInterval(interval)
  interval = setInterval(updateCountdown, 1000)
}
