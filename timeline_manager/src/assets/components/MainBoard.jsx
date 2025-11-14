import { Container, Row, Col } from "react-bootstrap"
import TaskCard from "./TaskCard"
import "./MainBoard.css"

function MainBoard() {
  return (
    <>
      <Container className="mainBoard m-2">
        <Row className="">
          <Col className="flex-grow-1">
            1of4
            <TaskCard />
          </Col>
          <Col className="flex-grow-1">2of4</Col>
          <Col className="flex-grow-1">3of4</Col>
          <Col className="flex-grow-1">4of4</Col>
        </Row>
        <Row>
          <Col className="flex-grow-1">1of4</Col>
          <Col className="flex-grow-1">2of4</Col>
          <Col className="flex-grow-1">3of4</Col>
          <Col className="flex-grow-1">4of4</Col>
        </Row>
      </Container>
    </>
  )
}

export default MainBoard
