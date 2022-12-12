import React from "react";

const Question = ({id, question, isSelected, option1, option2, option3, option4 }) => {
  return (
    <div className="question" id={id}>
      <h2>{question}</h2>
      <div className="options" onClick={isSelected}>
        <p id="option1" className="option">
          {option1}
        </p>
        <p id="option2" className="option">
          {option2}
        </p>
        <p id="option3" className="option">
          {option3}
        </p>
        <p id="option4" className="option">
          {option4}
        </p>
      </div>
    </div>
  );
};

export default Question;
