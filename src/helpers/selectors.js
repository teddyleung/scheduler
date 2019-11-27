export const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find(dayApt => dayApt.name === day);
  return !foundDay ? [] : foundDay.appointments.map(apt => state.appointments[apt]);
};

export const getInterviewersForDay = (state, day) => {
  const foundDay = state.days.find(dayApt => dayApt.name === day);
  return !foundDay ? [] : foundDay.interviewers.map(interviewer => state.interviewers[interviewer]);
};

 export const getInterview = (state, interview) => {
  if (interview === null) return null;
  return {
    ...interview,
    interviewer: {
      ...state.interviewers[interview.interviewer]
    }
  }
};