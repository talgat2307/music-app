import {
  TRACK_LIST_FAILURE,
  TRACK_LIST_REQUEST,
  TRACK_LIST_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const trackListRequest = () => {
  return { type: TRACK_LIST_REQUEST };
};

const trackListSuccess = (trackList) => {
  return { type: TRACK_LIST_SUCCESS, trackList };
};

const trackListFailure = (error) => {
  return { type: TRACK_LIST_FAILURE, error };
};

export const fetchTrackList = (id) => {
  return async dispatch => {
    dispatch(trackListRequest());
    try {
      const response = await axiosApi(`/tracks?album=${id}`);
      dispatch(trackListSuccess(response.data));
    } catch (e) {
      dispatch(trackListFailure(e));
    }
  };
};