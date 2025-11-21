import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const ProjectModalForm = ({ show, handleClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  const handleSubmit = () => {
    onSubmit({ title, description, expiryDate })
    setTitle("")
    setDescription("")
    setExpiryDate("")
    handleClose()
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">NEW PROJECT</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <Form>
          <Form.Group controlId="projectTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              required
            />
          </Form.Group>
          <Form.Group controlId="projectDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </Form.Group>
          <Form.Group controlId="expiryDate">
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
          CLOSE
        </Button>
        <Button
          className="modalSaveButton"
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          SAVE
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProjectModalForm
