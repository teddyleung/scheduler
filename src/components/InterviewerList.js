import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

const InterviewerList = props => {  
  const InterviewerListItems = props.interviewers.map(interviewer => (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      onClick={() => {props.onChange(interviewer.id)}}
      selected={interviewer.id === props.value}
    />
  ));
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListItems}
      </ul>
    </section>
  );
}

export default InterviewerList;