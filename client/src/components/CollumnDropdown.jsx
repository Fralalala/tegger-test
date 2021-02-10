import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setIsFour } from "../actions/videoAction";

const CollumnDropdown = () => {
  const dispatch = useDispatch();
  const youtubeDataReducer = useSelector((state) => state.youtubeDataReducer);

  const { isFour } = youtubeDataReducer;

  return (
    <Col>
      <Dropdown className="ml-auto">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Show in {isFour ? "4" : "3"} collumns
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              dispatch(setIsFour(false));
            }}
          >
            3 Collumns
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch(setIsFour(true));
            }}
          >
            4 Collumns
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

export default CollumnDropdown;
