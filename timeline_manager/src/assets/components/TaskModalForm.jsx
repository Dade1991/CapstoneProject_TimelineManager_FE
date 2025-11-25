import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const TaskModalForm = ({ show, handleClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [taskExpiryDate, setTaskExpiryDate] = useState("")
  const [priority, setPriority] = useState("VERY_LOW")

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      title,
      description,
      taskExpiryDate: taskExpiryDate || null,
      priority,
    }

    onSubmit(taskData)

    console.log("SONO UN LOG SFIGATO:", taskExpiryDate)

    // pulire o reset form

    setTitle("")
    setDescription("")
    setTaskExpiryDate("")
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

          <Form.Group controlId="taskExpiryDate">
            <Form.Label>Task Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={taskExpiryDate}
              onChange={(e) => setTaskExpiryDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modalColor">
        <div className="d-flex flex-row">
          <Button className="modalCloseButton me-2" onClick={handleClose}>
            Close
          </Button>
          <Button className="modalSaveButton" onClick={handleSubmit}>
            SAVE
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskModalForm
