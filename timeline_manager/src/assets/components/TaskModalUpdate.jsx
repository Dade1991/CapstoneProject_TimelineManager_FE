import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

const TaskModalUpdate = ({ show, handleClose, onSubmit, task }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  if (!task) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aggiorna Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Nessuna task valida selezionata.</p>
        </Modal.Body>
      </Modal>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description, dueDate })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiorna Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Scadenza</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>

          <Button type="submit">Aggiorna</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default TaskModalUpdate
