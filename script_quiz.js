const quizForm = document.getElementById("quiz-form");
const resultDisplay = document.getElementById("result");
const answerDisplay = document.getElementById("answers");

const correctAnswers = ["b", "c", "a", "d", "c", "b", "d", "b", "a", "c"];

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted!");
  let score = 0;
  const userAnswers = [
    quizForm.q1.value,
    quizForm.q2.value,
    quizForm.q3.value,
    quizForm.q4.value,
    quizForm.q5.value,
    quizForm.q6.value,
    quizForm.q7.value,
    quizForm.q8.value,
    quizForm.q9.value,
    quizForm.q10.value,
  ];

  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 1;
    }
  });

  const percentageScore = ((score / 10) * 100).toFixed(2);

  resultDisplay.innerHTML = `Your score is: ${score} out of 10, which is ${percentageScore}%`;
  answerDisplay.innerHTML = `The correct answers are: ${correctAnswers.join(", ")}`;
});
