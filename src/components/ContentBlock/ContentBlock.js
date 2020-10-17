import React from "react";
import s from "./ContentBlock.module.css";

const ContentBlock = (props) => {
  return (
    <div className={s.cover}>
      <div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default ContentBlock;
