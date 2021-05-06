import React from "react";

const Title = (props) => {
  return (
    <div className="justify-content-center">
      {props.type === "Main" ? (
        <h1 className="text-center">{props.text}</h1>
      ) : props.type === "Subtitle" ? (
        <h3 className="text-center">{props.subtext}</h3>
      ) : (
        <h6 className="text-center">{props.extratext}</h6>
      )}
    </div>
  );
};

export default Title;
