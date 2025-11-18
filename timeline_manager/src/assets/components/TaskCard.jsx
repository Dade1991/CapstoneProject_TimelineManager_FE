import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

import "./TaskCard.css"

function TaskCard() {
  return (
    <>
      <Card>
        <Card.Body className="taskCard">
          {" "}
          <Card.Text className="taskCardText m-0">Category:</Card.Text>
          <Card.Title className="taskCardTextTitle m-0">ONGOING</Card.Title>
          <hr className="brInterruption my-2" />
          <Card.Text className="taskCardText m-0">Task: </Card.Text>
          <Card.Title className="taskCardTextTitle m-0">CACCA</Card.Title>
          <hr className="brInterruption my-2" />
          <Card.Text className="taskCardText m-0">Project Name: </Card.Text>
          <Card.Title className="taskCardTextTitle m-0">CAPSTONE </Card.Title>
          <hr className="brInterruption my-2" />
          <Row className="mb-2">
            <Col>
              <Card.Text className="taskCardTextTimeInfo m-0">
                Task Priority:{" "}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="taskCardTextTimeInfo m-0 ">
                Task Expiry Date:{" "}
              </Card.Text>
            </Col>
          </Row>
          <Card.Text className="taskCardTextTimeInfo text-center">
            Status
          </Card.Text>
          <hr className="brInterruption my-2" />
          <Card.Text className="taskCardText m-0">Task Description:</Card.Text>
          <Card.Text className="taskCardTextDescription m-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
            laboriosam repellat quaerat commodi temporibus fugiat cupiditate
            magni reprehenderit dolore at. Quo autem voluptas reprehenderit
            dolorem consequuntur in quae suscipit nulla! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Quam veniam quae delectus ab
            ullam error, beatae, possimus velit officiis in cumque? Nihil earum
            maxime iure adipisci fuga distinctio ipsum veritatis.
          </Card.Text>
          <hr className="brInterruption my-2" />
          <Card.Text className="taskCardText m-0">Task's Creator: </Card.Text>
          <Card.Text className="taskCardTextTimeInfo">
            Task last update by: - at:
          </Card.Text>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-end align-items-center">
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDisabled"
              />
              <label className="form-check-label">Complete</label>
            </div>
            <Button className="taskCardDeleteButton me-1" variant="primary">
              Delete Task
            </Button>
            <Button className="taskCardButton" variant="primary">
              Update Task infos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default TaskCard
