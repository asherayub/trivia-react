import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Question from "./Question";

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  function handleClick(e) {
    setQuestions((oldQuestions) =>
      oldQuestions.map((oldQuestion) => {
        // if the question is already selected, return it
        if (oldQuestion.isSelected) return oldQuestion;
        // if the question is not selected, check if the answer is correct
        if (
          // check if the question id is the same as the parent element id
          oldQuestion.questionId === e.target.parentElement.parentElement.id
        ) {
          // check if the answer is correct
          if (oldQuestion.correct_answer === e.target.innerText) {
            e.target.classList.add("true");
            setScore(score + 1);
          } else {
            e.target.classList.add("false");
          }
          // return the question with isSelected set to true.
          return { ...oldQuestion, isSelected: true };
        }
        // if the question is not selected and the question id is not the same as the parent element id, return the question
        return oldQuestion;
      })
    );
  }

  // check if game has ended or not
  useEffect(() => {
    if (questions.length > 0) {
      if (questions.every((question) => question.isSelected)) {
        setGameEnded(true);
      }
    }
  }, [questions]);
  async function getQuestions() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    );
    const data = await response.json();
    const result = data.results.map((question) => {
      return {
        questionId: nanoid(),
        question: question.question,
        // shuffle the options array
        options: [...question.incorrect_answers, question.correct_answer].sort(
          (a, b) => 0.5 - Math.random()
        ),
        correct_answer: question.correct_answer,
        isSelected: false,
        isCorrect: false,
      };
    });
    return result;
  }
  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, [startGame]);

  function restartGame() {
    setStartGame(false);
    setQuestions([]);
    setScore(0);
    setGameEnded(false);
  }
  return (
    <div className="App">
      {gameEnded && (
        <div className="endgame-page">
          <h3 style={{ textAlign: "center" }}>
            You Scored: {score} <br />
            ????
          </h3>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      {!startGame ? (
        <div className="start-page">
          <div className="github">
            <a href="https://www.github.com/asherayub" target="_blank">
              GitHub
            </a>
          </div>
          <div>
            <h1>Comp-Witch</h1>
            <p>Answer simple computer related questions</p>
          </div>
          <button onClick={() => setStartGame(true)}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-page">
          <div className="questions">
            {questions.map((question) => {
              return (
                <Question
                  key={question.questionId}
                  id={question.questionId}
                  question={question.question}
                  option1={question.options[0]}
                  option2={question.options[1]}
                  option3={question.options[2]}
                  option4={question.options[3]}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
