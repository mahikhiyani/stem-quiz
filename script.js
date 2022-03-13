var quiz;
var score=0;

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

function preload(){
  quiz_img = loadImage("../images/quiz.png")
}

function draw(){
 

}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})




function startGame() {
 // quiz = createSprite(200,500);
 // quiz.addImage("quiz",quiz_img);
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'In which decade was the American Institute of Electrical Engineers (AIEE) founded?',
    answers: [
      { text: '1880s', correct: true },
      { text: '1950s', correct: false },
      { text: '1930s', correct: false },
      { text: '1870s', correct: false }
     
    ]
  
  },
  {
    question: 'Rocket works on the principle on conservation of?',
    answers: [
      { text: 'mass', correct: false },
      { text: 'energy', correct: false },
      { text: 'velocity', correct: false },
      { text: 'momentum', correct: true }
    ]
  },
  {
    question: 'Which data structure allows deletng data elements from and inserting at rear?',
    answers: [
      { text: 'stacks', correct: false },
      { text: 'queues', correct: true },
      { text: 'dequeuse', correct: false },
      { text: 'binary search tree', correct: false }
    ]
  },
 {
    question: 'An amount of Rs. 10,000 becomes Rs. 20,736 in 2 years. If the rate of interest is compounded half yearly, what is the annual rate of interest?',
    answers: [
      { text: '25%', correct: false },
      { text: '20%', correct: false },
      { text: '40%', correct: true },
      { text: '30%', correct: false }
    ]
  },
  {
    question: '-If a certain sum of money can become 5 times of its principal in 10 years, then the rate of interest is?',
    answers: [
      { text: '20%', correct: false },
      { text: '30%', correct: false },
      { text: '40%', correct: true },
      { text: '50%', correct: false } 
    ]
  } 
]