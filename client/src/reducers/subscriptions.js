import {
  ADD_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS,
} from "../constants/actionTypes";

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
        [key]: action.payload,
      };
    }
    case FETCH_SUBSCRIPTIONS: {
      let newState = {};
      console.log(action.payload);
      action.payload.vloggers.map((item) => {
        const key = videoKey(item.id, item.source);
        newState[key] = item;
        return null;
      });
      return newState;
    }
    default:
      return state;
  }
}
