import {
  API_REQUEST,
  API_REQUEST_FAIL,
  API_REQUEST_SUCCESS,
  SET_IS_FOUR,
  SET_SEARCHBAR_VALUE,
} from "../constants/constant";

export const youtubeDataReducer = (
  state = {
    data: { prevPageToken: "", nextPageToken: "" },
    isFour: false,
    loading: false,
    query: "",
    order: "",
  },
  action
) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case API_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case API_REQUEST_FAIL:
      return {
        ...state,
        data: { error: true, result: [] },
        loading: false,
      };

    case SET_IS_FOUR:
      return {
        ...state,
        isFour: action.payload,
      };

    case SET_SEARCHBAR_VALUE:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};
