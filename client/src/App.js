import "./App.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Thumbnail from "./components/Thumbnail";
import HomeScreen from "./screen/HomeScreen";

function App() {

  let lala = [1, 2, 3];



  return (
    <div className="App">
      <Navbar
        style={{ background: "#797a7e" }}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <h2>Tegger Test</h2>
        </Container>
      </Navbar>

      <HomeScreen />
      
    </div> 
  );
}

export default App;
