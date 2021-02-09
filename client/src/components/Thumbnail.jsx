import React from "react";
import { Button, Card } from "react-bootstrap";

const Thumbnail = ({result}) => {


  return (
    <Card style={{ width: "100%", marginBottom: "35px" }}>
      <Card.Img variant="top" src={result.thumbnail.url} />
      <Card.Body>
        <Card.Title>{result.title}</Card.Title>
        <Card.Text>
          {result.description}
        </Card.Text>
        <Button variant="primary">Watch in Youtube</Button>
      </Card.Body>
    </Card>
  );
};

export default Thumbnail;
