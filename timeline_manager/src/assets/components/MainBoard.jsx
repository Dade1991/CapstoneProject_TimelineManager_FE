import { Container, Row, Col } from "react-bootstrap"
import TaskCard from "./TaskCard"
import "./MainBoard.css"

function MainBoard() {
  return (
    <>
      <Container fluid className="mainBoard m-2 d-flex flex-row">
        <Row className="mainBaordRows">
          <Col className="flex-grow-1 p-3">
            <TaskCard />
          </Col>
        </Row>
        <Row className="mainBaordRows">
          <Col className="flex-grow-1 p-3">
            <TaskCard />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MainBoard
