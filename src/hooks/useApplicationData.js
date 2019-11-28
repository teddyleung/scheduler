import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        setState(prev => ({
          ...prev,
          appointments
        }));
      });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: null
          }
        };
    
        setState(prev => ({
          ...prev,
          appointments
        }));
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}