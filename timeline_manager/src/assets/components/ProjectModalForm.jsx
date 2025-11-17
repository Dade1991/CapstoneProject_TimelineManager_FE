import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
// import { useNavigate } from "react-router-dom"
import "./ProjectModals.css"

const ProjectModalForm = ({ show, handleClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  // const navigateSinglePJT = useNavigate()

  // collegamento con il modale che deve salvare e reindirizzare alla pagina "project"

  const handleSubmit = () => {
    // invia i dati al parent o direttamente con fetch
    onSubmit({ title, description })
    // pulisci il form o chiudi modal
    setTitle("")
    setDescription("")
    handleClose()
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">NEW PROJECT</Modal.Title>
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
          Close
        </Button>
        <Button className="modalSaveButton" onClick={handleSubmit}>
          SAVE
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProjectModalForm
