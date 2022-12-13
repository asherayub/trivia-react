import React from "react";

const Question = (props) => {
  return (
    <div className="question" id={props.id}>
      <h3>{props.question}</h3>
      <div className="options">
        <p onClick={props.handleClick}>{props.option1}</p>
        <p onClick={props.handleClick}>{props.option2}</p>
        <p onClick={props.handleClick}>{props.option3}</p>
        <p onClick={props.handleClick}>{props.option4}</p>
      </div>
    </div>
  );
};

export default Question;
