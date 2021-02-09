import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  FormControl,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import Thumbnail from "../components/Thumbnail";

import axios from "axios";

const HomeScreen = () => {
  const [results, setResults] = useState([]);
  const [isFour, setIsFour] = useState(false);
  const [message, setMessage] = useState("loading");
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("Relevance");
  const [orderDisplay, setOrderDisplay] = useState("Relevance");

  const [nextPageToken, setNextPageToken] = useState("");
  const [previousPageToken, setPreviousPageToken] = useState("");

  useEffect(async () => {
    apiRequest();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    apiRequest(query);
  };

  const apiRequest = async (q = "", order = "", pageToken = "") => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          q,
          order,
          pageToken,
        },
      };

      setMessage("loading");

      const { data } = await axios.get("/api/search", config);

      setMessage("done");
      setResults(data);
      setNextPageToken(
        data.nextPageToken !== undefined ? data.nextPageToken : ""
      );
      setPreviousPageToken(
        data.prevPageToken !== undefined ? data.prevPageToken : ""
      );
    } catch (error) {
      setResults({error: true })
    }

  };

  const orderChange = (order) => {
    apiRequest(query, order);
  };

  const navigatePage = (token) => {
    apiRequest(query, order, token);
  };

  return (
    <div>
      <Container>
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
                  Sort By: {orderDisplay}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderDisplay("Relevance");
                      setOrder("relevance");
                      orderChange(order.toLowerCase());
                    }}
                  >
                    Relevance
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderDisplay("Date");
                      setOrder("date");
                      orderChange(order.toLowerCase());
                    }}
                  >
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderDisplay("Rating");
                      setOrder("rating");
                      orderChange(order.toLowerCase());
                    }}
                  >
                    Rating
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderDisplay("Title");
                      setOrder("title");
                      orderChange(order.toLowerCase());
                    }}
                  >
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrderDisplay("View Count");
                      setOrder("viewCount");
                      orderChange("viewCount");
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <InputGroup.Append>
              <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

        <Row>
          <Col style={{ marginBottom: "10px" }}>
            <Button
              style={{ marginRight: "10px" }}
              disabled={previousPageToken == "" ? true : false}
              onClick={() => navigatePage(previousPageToken)}
            >
              {" "}
              Previous Page{" "}
            </Button>
            <Button
              disabled={nextPageToken == "" ? true : false}
              onClick={() => navigatePage(nextPageToken)}
            >
              {" "}
              Next Page{" "}
            </Button>
          </Col>

          <Col>
            <Dropdown className="ml-auto">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Show in {isFour ? "4" : "3"} collumns
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setIsFour(false);
                    navigatePage(nextPageToken);
                  }}
                >
                  3 Collumns
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setIsFour(true);
                    navigatePage(previousPageToken);
                  }}
                >
                  4 Collumns
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {results.length > 0 ? (
            results.result.map((result) => {
              return (
                <Col md={isFour ? 4 : 3} xs={isFour ? 4 : 3}>
                  <Thumbnail result={result} />
                </Col>
              );
            })
          ) : (
            <>

              {message === "loading" ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : results.error == true ? (
                <h1>
                  We ran out of Request for the Youtube Data Api. Sorry :/
                </h1>
              ) : (
                <h1> There are no results, try some different words.</h1>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
