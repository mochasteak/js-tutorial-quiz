// Initialize variables

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true},
      { text: '6', correct: false},
      { text: '3', correct: false},
      { text: '5', correct: false}
    ]
  },
  {
    question: 'Who is the best X-Man?',
    answers: [
      { text: 'Cyclops', correct: false},
      { text: 'Storm', correct: false},
      { text: 'Jean Grey', correct: false},
      { text: 'Wolverine', correct: true}
    ]
  },
  {
    question: 'Which is the best Girl Scout cookie?',
    answers: [
      { text: 'Samoas', correct: false},
      { text: 'Tagalongs', correct: false},
      { text: 'Thin Mints', correct: true},
      { text: 'Trefoils', correct: false}
    ]
  },
  {
    question: 'Who is the best My Little Pony?',
    answers: [
      { text: 'Applejack', correct: false},
      { text: 'Midnight', correct: false},
      { text: 'Twilight Sparkle', correct: true},
      { text: 'Pinkie Pie', correct: false}
    ]
  }
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const questionElement = document.getElementById('question');
const playerScore = document.getElementById('player-score');
const totalScore = document.getElementById('total-score');
const answerButtonsElement = document.getElementById('answer-buttons');
const possibleScore = questions.length;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let shuffledQuestions, currentQuestionIndex;


// Game logic

function startGame() {
  startButton.classList.add('hide');
  scoreContainer.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  score = 0;
  console.log('Setting score to 0');
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question; // Display question text

  // Display the answers by looping through question object
  question.answers.forEach(answer => {
    const button = document.createElement('button'); // create a button
    button.innerText = answer.text; // set the text of the button
    button.classList.add('btn'); // add 'btn' class to the button

    // Add the 'correct' data attribute to the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer); // add event listener
    answerButtonsElement.appendChild(button); // append button to container
  });
}

// Clear the state of the board before rendering a new question
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Add classes to show user which answers are wrong and right
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  console.log('Selected Button = ', selectedButton);
  console.log('Correct = ', correct);
  if (correct)
    score++;
    console.log('Adding 1 to score');

  setStatusClass(document.body, correct); // Change body background color
  showScore();// display the score

  // Convert to array and set classes to 'correct' or 'wrong' as appropriate
  Array.from(answerButtonsElement.children).forEach(button => {
    console.log('button.dataset.correct = ', button.dataset.correct);
    setStatusClass(button, button.dataset.correct);
    console.log('Setting class for: ', button);
  });

  console.log('Score: ', score);

  // Check if there are any more questions
  if (shuffledQuestions.length > currentQuestionIndex + 1 ) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

// Show the score container
function showScore() {
  scoreContainer.classList.remove('hide');
  console.log('Un-hiding score');
  playerScore.innerText = score;
  totalScore.innerText = possibleScore;
}

function updateScore() {
  // display the player score
  // display the total score
}

// Add the appropriate class to identify answers as 'correct' or 'wrong'
function setStatusClass(element, correct) {
  clearStatusClass(element); //clear any existing status

  if (correct) {  // Set status for correct answer
    element.classList.add('correct');
  } else { // Set status for the other incorrect answers
    element.classList.add('wrong');
  }
}

// Helper function to clear classes
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
