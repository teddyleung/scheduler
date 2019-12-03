import { getDayForAppointment } from '../helpers/selectors';

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const DECREMENT_SPOTS = "DECREMENT_SPOTS";
export const INCREMENT_SPOTS = "INCREMENT_SPOTS";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY: {
      return {
        ...state,
        day: action.day
      }
    }
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.days.data,
        appointments: action.appointments.data,
        interviewers: action.interviewers.data
      }
    }
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview === null ? null : { ...action.interview }
          }
        }
      }
    }
    case DECREMENT_SPOTS: {
      const appointmentDay = getDayForAppointment(state, action.id);
      return {...state,
        days: state.days.map(day => {
          if (day.id === appointmentDay) {
            return {
              ...day,
              spots: day.spots - 1
            };
          } else {
            return { ...day };
          }
        })
      }
    }
    case INCREMENT_SPOTS: {
      const appointmentDay = getDayForAppointment(state, action.id);
      return {...state,
        days: state.days.map(day => {
          if (day.id === appointmentDay) {
            return {
              ...day,
              spots: day.spots + 1
            };
          } else {
            return { ...day };
          }
        })
      }
    }    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;