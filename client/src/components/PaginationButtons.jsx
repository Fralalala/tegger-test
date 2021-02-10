import React from "react";
import { Button, Col } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import { apiRequest } from "../actions/videoAction";

const PaginationButtons = () => {

    const dispatch = useDispatch()
    const youtubeDataReducer = useSelector(state => state.youtubeDataReducer)

    const {data} = youtubeDataReducer
    const { q, order, nextPageToken, prevPageToken } = data

    const navigatePage = (pageToken) => {
      dispatch(apiRequest(q, order, pageToken))
    }

  return (
    <Col style={{ marginBottom: "10px" }}>
      <Button
        style={{ marginRight: "10px" }}
        disabled={prevPageToken === "" ? true : false}
        onClick={() => navigatePage(prevPageToken)}
      >
        {" "}
        Previous Page{" "}
      </Button>
      <Button
        disabled={nextPageToken === "" ? true : false}
        onClick={() => navigatePage(nextPageToken)}
      >
        {" "}
        Next Page{" "}
      </Button>
    </Col>
  );
};

export default PaginationButtons;
