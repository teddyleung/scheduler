import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

const InterviewerList = props => {
  const InterviewerListItems = props.interviewers.map(interviewer => (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      selected={interviewer.id === props.interviewer}
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