import { ADD_VIDEOS } from "../constants/actionTypes";

const initState = {};

const videoKey = (vloggerId, source) => {
  return source + "-" + vloggerId;
};

export default function handleVideos(state = initState, action) {
  switch (action.type) {
    case ADD_VIDEOS: {
      const key = videoKey(action.payload.vloggerId, action.payload.source);
      return {
        ...state,
        [key]: action.payload,
      };
    }
    default:
      return state;
  }
}
