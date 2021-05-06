import React from "react";
const Button = (props) => {
  return (
    <button
      className={props.btnStyle}
      type={props.btnType}
      onClick={
        props.useParams != null
          ? () => props.clickAction(props.useParams)
          : () => props.clickAction()
      }
    >
      {props.text}
    </button>
  );
};

export default Button;
