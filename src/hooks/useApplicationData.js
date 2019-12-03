import { useReducer, useEffect } from "react";
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  DECREMENT_SPOTS,
  INCREMENT_SPOTS
} from '../reducers/application';

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