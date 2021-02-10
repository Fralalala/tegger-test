import React from "react";
import { Button, Card, Col } from "react-bootstrap";

const Thumbnail = ({ result, isFour }) => {
  return (
    <Col md={isFour ? 4 : 3} xs={isFour ? 4 : 3} >
      <Card style={{ width: "100%", marginBottom: "35px" }}>
        <Card.Img variant="top" src={result.thumbnail.url} />
        <Card.Body>
          <Card.Title>{result.title}</Card.Title>
          <Card.Text>{result.description}</Card.Text>
          <Button variant="primary">Watch in Youtube</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Thumbnail;
