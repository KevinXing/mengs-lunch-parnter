import {
  ADD_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTIONS,
} from "../constants/actionTypes";
import _ from "lodash";

const videoKey = (vloggerId, source) => {
  return source + "-" + vloggerId;
};

export default function handleSubscriptions(state = {}, action) {
  switch (action.type) {
    case ADD_SUBSCRIPTIONS: {
      const key = videoKey(
        action.payload.vlogger.id,
        action.payload.vlogger.source
      );
      return {
        ...state,
        [key]: action.payload.vlogger,
      };
    }
    case FETCH_SUBSCRIPTIONS: {
      let newState = {};
      action.payload.vloggers.map((item) => {
        const key = videoKey(item.id, item.source);
        newState[key] = item;
        return null;
      });
      return newState;
    }
    case DELETE_SUBSCRIPTIONS: {
      return _.omit(state, [
        videoKey(action.payload.id, action.payload.source),
      ]);
    }
    default:
      return state;
  }
}
