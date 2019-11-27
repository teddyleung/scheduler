export const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find(dayApt => dayApt.name === day);
  return !foundDay ? [] : foundDay.appointments.map(apt => state.appointments[apt]);
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