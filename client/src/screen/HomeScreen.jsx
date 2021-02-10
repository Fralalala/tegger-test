import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Thumbnail from "../components/Thumbnail";
import SearchBar from "../components/SearchBar";
import CollumnDropdown from "../components/CollumnDropdown";
import PaginationButtons from "../components/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../actions/videoAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const youtubeDataReducer = useSelector((state) => state.youtubeDataReducer);

  const { data, isFour, loading } = youtubeDataReducer;

  const { error, result } = data;

  useEffect(async () => {
    dispatch(apiRequest());
  }, []);

  return (
    <div>
      <Container>
        <SearchBar />

        <Row>
          <PaginationButtons />
          <CollumnDropdown isFour={isFour} />
        </Row>

        <Row>
          <Spinner animation="border" role="status" hidden={!loading} style = {{width : "300px", height : "300px"}} className= "m-auto" >
            <span className="sr-only">Loading...</span>
          </Spinner>

          {error !== undefined && !error ? (
            result.map((result) => {
              return <Thumbnail result={result} isFour={isFour} />;
            })
          ) : (
            <h1 hidden = {loading} > Request quota exceeded. </h1>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
