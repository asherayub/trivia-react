import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(false);
  function isSelected(e) {
    console.log(e.target.id);

  }
  async function fetchQuestions() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple"
    );
    const data = await response.json();
    setQuestions(data.results);
  }

  useEffect(() => {
    fetchQuestions();
  }, [start]);
  return (
    <div className="App">
      {!start ? (
        <div className="start-page">
          <h1>Do you know HISTORY</h1>
          <p>Know more of past with simple quiz</p>
          <button onClick={() => setStart(true)}>Start</button>
        </div>
      ) : (
        <div className="quiz-page">
          <div className="questions">
            {/* <Question /> */}
            {questions.map((question) => {
              return (
                <Question
                  id={nanoid()}
                  question={question.question}
                  option1={question.correct_answer}
                  option2={question.incorrect_answers[0]}
                  option3={question.incorrect_answers[1]}
                  option4={question.incorrect_answers[2]}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
