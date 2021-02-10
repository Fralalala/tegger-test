import {
  API_REQUEST,
  API_REQUEST_FAIL,
  API_REQUEST_SUCCESS,
  SET_IS_FOUR,
  SET_ORDER,
  SET_SEARCHBAR_VALUE,
} from "../constants/constant";
import axios from "axios";

export const apiRequest = (q = "", order = "", pageToken = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: API_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        q,
        order,
        pageToken,
      },
    };

    console.log("LLLLLLLLLLLLLLLLLLLLLL");

    const { data } = await axios.get("/api/search", config);

    console.log("OOOOOOOOOOOOOOOOOOOOOO");
    dispatch({
      type: API_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: API_REQUEST_FAIL,
    });
  }
};

export const setIsFour = (isFour) => async (dispatch) => {
  dispatch({
    type: SET_IS_FOUR,
    payload: isFour,
  });
};

export const setSearchBarValue = (value) => async (dispatch) => {
  dispatch({ type: SET_SEARCHBAR_VALUE , payload: value});
};

export const setOrder = (value) => async (dispatch) => {
  dispatch({
    type: SET_ORDER,
    payload: value
  })
}
