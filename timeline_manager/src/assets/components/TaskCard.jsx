import { Container, Row, Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useState, useEffect } from "react"
import "./TaskCard.css"

const statusOptions = [
  { label: "TO-DO", value: 1 },
  { label: "IN_PROGRESS", value: 2 },
  { label: "IN_REVIEW", value: 3 },
  { label: "UNDER_TESTING", value: 4 },
  { label: "PAUSED", value: 5 },
  { label: "WAITING_FEEDBACK", value: 6 },
  { label: "BLOCKED", value: 7 },
  { label: "CANCELLED", value: 8 },
  { label: "COMPLETED", value: 9 },
]

function TaskCard({
  task,
  onDelete,
  onUpdate,
  priorityStyles,
  onStatusChange,
  onComplete,
  onReopen,
}) {
  const priorityStyle = priorityStyles[task.taskPriority] || {}
  const [checkedComplete, setCheckedComplete] = useState(false)
  const cardStyleComplete = checkedComplete
    ? { opacity: 0.5, position: "relative" }
    : {}
  const cardStyleReopen = checkedComplete ? { pointerEvents: "none" } : {}

  const handleStatusChange = (e) => {
    onStatusChange(task.taskId, Number(e.target.value))
  }

  const handleReopenClick = (e) => {
    e.stopPropagation()
    setCheckedComplete(false)
    if (onReopen) onReopen(task.taskId)
  }

  const handleCheckboxChange = () => {
    const newChecked = !checkedComplete
    setCheckedComplete(newChecked)
    if (newChecked) {
      onComplete(task.taskId, newChecked)
    } else {
      if (onReopen) onReopen(task.taskId)
    }
  }

  useEffect(() => {
    setCheckedComplete(task.isCompleted || false)
  }, [task.taskId, task.isCompleted])

  return (
    <>
      <Card className="cardMainContainer mb-4" style={cardStyleComplete}>
        <Card.Body className="taskCard" style={cardStyleReopen}>
          {" "}
          {/* ------------------------------------------ */}
          {checkedComplete && (
            <div
              className="reopenTaskButtonDiv"
              style={{
                pointerEvents: "auto",
              }}
            >
              {/* ------------------------------------------ */}
              <Button
                className="reopenTaskButton"
                onClick={handleReopenClick}
                style={{
                  pointerEvents: "auto",
                }}
              >
                Reopen
              </Button>
            </div>
          )}
          <Card.Text className="taskCardText m-0">Task: </Card.Text>
          <Card.Title className="taskCardTextTitle m-0">
            {task.taskTitle}
          </Card.Title>
          <hr className="brInterruption my-2" />
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">Task Priority:</Card.Text>
            <div
              className="taskCardTextDescriptionPRIORITY m-0 p-2 text-center"
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
              {task.taskExpiryDate ? task.taskExpiryDate : "N/A"}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Card.Text className="taskCardText m-0">Status</Card.Text>
            <div className="taskCardTextDescription m-0">
              <select
                className="dropdownStatusChange px-1"
                value={task.statusId}
                onChange={handleStatusChange}
              >
                {statusOptions.map((status) => (
                  <option
                    className="dropdownStatusChangeMENU"
                    key={status.value}
                    value={status.value}
                  >
                    {status.label.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
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
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={checkedComplete}
                onChange={handleCheckboxChange}
                id={`check-${task.taskId}`}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${task.taskId}`}
              >
                Complete
              </label>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Button onClick={onDelete} className="taskCardDeleteButton me-1">
                Delete
              </Button>
              <Button onClick={onUpdate} className="taskCardButton">
                EDIT
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default TaskCard
