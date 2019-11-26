const getAppointmentsForDay = (state, day) => {
  const foundDay = state.days.find(dayApt => dayApt.name === day);
  return !foundDay ? [] : foundDay.appointments.map(apt => state.appointments[apt]);
};

module.exports = {
  getAppointmentsForDay
}