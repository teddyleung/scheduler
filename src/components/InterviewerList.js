import React from "react";
import PropTypes from 'prop-types';
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

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default InterviewerList;