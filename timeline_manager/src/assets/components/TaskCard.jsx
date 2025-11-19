import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import "./TaskCard.css"

function TaskCard({
  task,
  onDelete,
  onUpdate,
  onToggleComplete,
  priorityStyles,
}) {
  console.log(task)

  const priorityStyle = priorityStyles[task.taskPriority] || {}

  return (
    <>
      <Card className="cardMainContainer mb-4">
        <Card.Body className="taskCard">
          {" "}
          <Card.Text className="taskCardText m-0">Task: </Card.Text>
          <Card.Title className="taskCardTextTitle m-0">
            {task.taskTitle}
          </Card.Title>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">Task Priority:</Card.Text>
            <div
              className="taskCardTextDescriptionPRIORITY m-0 p-2"
              style={priorityStyle}
            >
              {task.taskPriority}
            </div>
          </div>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0 ">
              Task Expiry Date:
            </Card.Text>
            <div className="taskCardTextDescription m-0">
              {task.dueDate ? task.dueDate.substring(0, 10) : "N/A"}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">Status</Card.Text>
            <div className="taskCardTextDescription m-0">{task.taskStatus}</div>
          </div>
          <hr className="brInterruption my-2" />
          <Card.Text className="taskCardText m-0">Task Description:</Card.Text>
          <Card.Text className="taskCardTextDescriptionSPECIAL p-2 m-0">
            {task.taskDescription}
          </Card.Text>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">Task's Creator:</Card.Text>
            <div className="taskCardTextDescription m-0">
              {task.creatorName}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">
              Task last update at:
            </Card.Text>
            <div className="taskCardTextDescription">{task.updatedAt}</div>
          </div>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-end align-items-center">
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.isCompleted}
                onChange={onToggleComplete}
                id={`check-${task.taskId}`}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${task.taskId}`}
              >
                Complete
              </label>
            </div>
            <Button onClick={onDelete} className="taskCardDeleteButton me-1">
              Delete Task
            </Button>
            <Button onClick={onUpdate} className="taskCardButton">
              Edit Task infos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default TaskCard
