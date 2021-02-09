import axios from 'axios';
import React, {useState} from 'react'
import { Button, Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = () => {

    const [order, setOrder] = useState("Relevance");
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
    
        apiRequest(query);
      };

    const apiRequest = async (q = "", order = "", pageToken = "") => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            q,
            order,
            pageToken,
          },
        };
    
        const { data } = await axios.get("/api/search", config);
    
        setResults(data.result);
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
                      setOrder("Relevance");
                    }}
                  >
                    Relevance
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrder("Date");
                    }}
                  >
                    Date
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrder("Rating");
                    }}
                  >
                    Rating
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrder("Title");
                    }}
                  >
                    Title
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setOrder("ViewCount");
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
        </div>
    )
}

export default SearchBar
