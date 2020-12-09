import moment from "moment";
import { ADD_VIDEOS } from "../constants/actionTypes";
import bilibili from "../axios/bilibili";
import youtube from "../axios/youtube";

export const addVideos = (vloggerId, source) => {
  return (dispatch) => {
    if (source === "bilibili") {
      dispatchBilibili(vloggerId, dispatch);
    } else {
      dispatchYoutube(vloggerId, dispatch);
    }
  };
};

const convertBilibiliDuration = (rawDuration) => {
  const durationArray = rawDuration.split(":");
  console.log(durationArray);

  if (durationArray.length === 2) {
    let min = parseInt(durationArray[0]);
    if (parseInt(durationArray[1]) > 0) {
      min += 1;
    }
    return min + " minutes";
  }
  if (durationArray.length === 3) {
    let hour = parseInt(durationArray[0]);
    if (parseInt(durationArray[1]) > 0 || parseInt(durationArray[2]) > 0) {
      hour += 1;
    }
    return hour + " hours";
  }
  return "unknown";
};

const dispatchBilibili = async (vloggerId, dispatch) => {
  try {
    const resp = await bilibili.get("space/arc/search", {
      params: {
        mid: vloggerId,
        ps: 5,
        tid: 0,
        pn: 1,
        keyword: "",
        order: "pubdate",
        jsonp: "jsonp",
      },
    });
    const newVideos = resp.data.data.list.vlist.map((item) => ({
      title: item.title,
      date: new Date(item.created * 1000).toDateString(),
      pic: item.pic,
      id: item.aid,
      url: "//www.bilibili.com/video/" + item.bvid,
      duration: convertBilibiliDuration(item.length),
    }));
    dispatch({
      type: ADD_VIDEOS,
      payload: {
        vloggerId: vloggerId,
        author: resp.data.data.list.vlist[0].author,
        videos: newVideos,
        source: "bilibili",
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

const dispatchYoutube = async (vloggerId, dispatch) => {
  try {
    // Fetch playlist id.
    const resp = await youtube.get("channels", {
      params: {
        id: vloggerId,
        part: "contentDetails",
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });
    const playlistId =
      resp.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Fetch video list.
    const videos = await youtube.get("playlistItems", {
      params: {
        playlistId: playlistId,
        part: "snippet",
        maxResults: 5,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });
    const ids = videos.data.items.map((item) => {
      return item.snippet.resourceId.videoId;
    });

    // Fetch video duration.
    const details = await youtube.get("videos", {
      params: {
        part: "contentDetails",
        id: ids.join(","),
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });

    const items = videos.data.items;
    var newVideos = [];

    for (var i = 0; i < items.length; i++) {
      const item = items[i];
      newVideos.push({
        title: item.snippet.title,
        date: new Date(item.snippet.publishedAt).toDateString(),
        pic: item.snippet.thumbnails.medium.url,
        id: item.id,
        url: "//www.youtube.com/watch?v=" + item.snippet.resourceId.videoId,
        duration: moment
          .duration(details.data.items[i].contentDetails.duration)
          .humanize(),
      });
    }
    dispatch({
      type: ADD_VIDEOS,
      payload: {
        vloggerId: vloggerId,
        author: videos.data.items[0].snippet.channelTitle,
        videos: newVideos,
        source: "youtube",
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};
