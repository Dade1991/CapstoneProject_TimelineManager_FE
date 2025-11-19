import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const TaskModalUpdate = ({ show, handleClose, onSubmit, task }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("MEDIUM")

  useEffect(() => {
    if (task) {
      setTitle(task.taskTitle || "")
      setDescription(task.taskDescription || "")
      setDueDate(task.taskExpiryDate || "")
      setPriority(task.taskPriority || "VERY_LOW")
    }
  }, [task, show])

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      taskId: task.taskId,
      title,
      description,
      dueDate,
      priority,
      categories: task.categories,
    }

    onSubmit(taskData)

    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("VERY_LOW")
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">UPDATE TASK</Modal.Title>
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
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskModalUpdate
