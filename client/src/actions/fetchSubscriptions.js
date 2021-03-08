import {
  FETCH_SUBSCRIPTIONS,
  ADD_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTIONS,
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

export const deleteSubscriptions = (info) => {
  return (dispatch) => {
    deleteBackend(info, dispatch);
  };
};

const fetchBackend = async (dispatch) => {
  try {
    const resp = await backend.get("subscriptions");
    const data = resp.data;
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

const addBackend = async (vloggerInfo, dispatch) => {
  try {
    await backend.post("subscriptions", vloggerInfo);
    dispatch({
      type: ADD_SUBSCRIPTIONS,
      payload: {
        vlogger: vloggerInfo,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

const deleteBackend = async (info, dispatch) => {
  try {
    await backend.delete("subscriptions/" + info.id);
    dispatch({
      type: DELETE_SUBSCRIPTIONS,
      payload: {
        id: info.id,
        source: info.source,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};
