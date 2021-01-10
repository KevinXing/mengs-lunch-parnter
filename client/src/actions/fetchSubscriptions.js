import {
  FETCH_SUBSCRIPTIONS,
  ADD_SUBSCRIPTIONS,
} from "../constants/actionTypes";
import backend from "../axios/backend";

export const fetchSubscriptions = () => {
  return (dispatch) => {
    fetchBackend(dispatch);
  };
};

export const addSubscriptions = (vlogger) => {
  return (dispatch) => {
    addBackend(vlogger, dispatch);
  };
};

const fetchBackend = async (dispatch) => {
  try {
    const resp = await backend.get("subscriptions");
    const data = resp.data;
    console.log(data);
    dispatch({
      type: FETCH_SUBSCRIPTIONS,
      payload: {
        vloggers: data,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

const addBackend = async (vlogger, dispatch) => {
  try {
    console.log(vlogger, dispatch);
    await backend.post("subscriptions", vlogger);
    dispatch({
      type: ADD_SUBSCRIPTIONS,
      payload: {
        vlogger: vlogger,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};
