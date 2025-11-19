import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const priorityStyles = {
  VERY_LOW: { backgroundColor: "#d3f9d8", color: "#27632a" },
  LOW: { backgroundColor: "#e5f4ff", color: "#2a4d76" },
  MEDIUM: { backgroundColor: "#fff3cd", color: "#856404" },
  HIGH: { backgroundColor: "#f8d7da", color: "#721c24" },
  CRITICAL: { backgroundColor: "#c82333", color: "white" },
}

const TaskModalForm = ({ show, handleClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("VERY_LOW")

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      title,
      description,
      dueDate,
      priority,
    }

    onSubmit(taskData)

    // Pulire o reset form se vuoi
    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("VERY_LOW")
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">NEW TASK</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Task Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="VERY_LOW">VERY LOW</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="taskDueDate">
            <Form.Label>Task Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modalColor">
        <Button className="modalCloseButton" onClick={handleClose}>
          Close
        </Button>
        <Button className="modalSaveButton" onClick={handleSubmit}>
          SAVE
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskModalForm
