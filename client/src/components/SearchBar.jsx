import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  apiRequest,
  setOrder,
  setSearchBarValue,
} from "../actions/videoAction";

const SearchBar = () => {
  const dispatch = useDispatch();
  const youtubeDataReducer = useSelector((state) => state.youtubeDataReducer);
  const { query, order } = youtubeDataReducer;
  const [_query, _setQuery] = useState("");
  const [_order, _setOrder] = useState("");

  useEffect(() => {
    dispatch(setSearchBarValue(_query));
    dispatch(setOrder(_order));
  }, [_query, _order]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(apiRequest(query, order));
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <InputGroup
          className="mb-3"
          style={{
            marginTop: "40px",
          }}
        >
          <InputGroup.Prepend>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By: {order}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    _setOrder("Relevance");
                  }}
                >
                  Relevance
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    _setOrder("Date");
                  }}
                >
                  Date
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    _setOrder("Rating");
                  }}
                >
                  Rating
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    _setOrder("Title");
                  }}
                >
                  Title
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    _setOrder("ViewCount");
                  }}
                >
                  View Count
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup.Prepend>

          <FormControl
            placeholder="Any word or phrase of a video"
            aria-label="Any word or phrase of a video"
            aria-describedby="basic-addon2"
            value={_query}
            onChange={(e) => _setQuery(e.target.value)}
          />

          <InputGroup.Append>
            <Button variant="outline-secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBar;
