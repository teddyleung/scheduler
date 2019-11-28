import { useReducer, useEffect } from "react";
import axios from 'axios';
import { getDayForAppointment } from '../helpers/selectors';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const DECREMENT_SPOTS = "DECREMENT_SPOTS";
const INCREMENT_SPOTS = "INCREMENT_SPOTS";

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
    default: {
      return state;
    }
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(([days, appointments, interviewers]) => {
        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        if (state.appointments[id].interview === null) {
          dispatch({ type: DECREMENT_SPOTS, id });
        }
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {    
        dispatch({ type: SET_INTERVIEW, id, interview: null });
        dispatch({ type: INCREMENT_SPOTS, id });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}