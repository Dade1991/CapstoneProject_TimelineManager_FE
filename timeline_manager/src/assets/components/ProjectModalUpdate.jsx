import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const ProjectModalUpdate = ({ show, handleClose, onSubmit, project }) => {
  // Stato locale per input, inizializzato alla prima apertura
  const [title, setTitle] = useState(project?.title || "")
  const [description, setDescription] = useState(project?.description || "")

  // calendario

  const [expiryDate, setExpiryDate] = useState("")

  if (!project) {
    return (
      <Modal className="modalText" show={show} onHide={handleClose} centered>
        <Modal.Header className="modalColor" closeButton>
          <Modal.Title className="modalTextTitle">
            NO PROJECT SELECTED!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalColor">
          <p className="m-0">No valid Project found. =(</p>
        </Modal.Body>
        <Modal.Footer className="modalColor">
          <Button className="modalCloseButton" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description })
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">
          UPDATE PROJECT INFO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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

export default ProjectModalUpdate
