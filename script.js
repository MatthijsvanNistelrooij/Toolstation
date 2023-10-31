let currentQuestion = 0
let correctAnswers = 0
const totalQuestions = 16
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const guessedAnswers = []

const answerInput = document.getElementById("answer")
answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer()
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

document.getElementById("check-button").addEventListener("click", checkAnswer)

function checkAnswer() {
  const answerInput = document.getElementById("answer")
  const result = document.getElementById("result")
  const userAnswer = answerInput.value.trim().toUpperCase()

  if (validAnswers.includes(userAnswer)) {
    if (!guessedAnswers.includes(userAnswer)) {
      guessedAnswers.push(userAnswer)
      correctAnswers++
      result.textContent = "Correct!"
      result.style.color = "green"
      currentQuestion++

      const divToHide = document.getElementById(userAnswer)
      if (divToHide) {
        divToHide.style.display = "none"
      }
    } else {
      result.textContent = "You've already guessed that answer."
      result.style.color = "red"
    }
  } else {
    result.textContent = "Incorrect. Try again."
    result.style.color = "red"
  }

  answerInput.value = ""

  if (currentQuestion === totalQuestions) {
    result.textContent = `Quiz completed!!!!`
  }

  currentQuestionSpan.textContent = currentQuestion
}
