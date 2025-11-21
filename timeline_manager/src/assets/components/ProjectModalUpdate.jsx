import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const ProjectModalUpdate = ({ show, handleClose, onSubmit, project }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  useEffect(() => {
    let mounted = true

    if (project && mounted) {
      setTitle(project.projectName || "")
      setDescription(project.projectDescription || "")
      setExpiryDate(
        project.expiryDate ? project.expiryDate.substring(0, 10) : ""
      )
    }

    return () => {
      mounted = false
    }
  }, [project])

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
    onSubmit({ title, description, expiryDate })
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">
          UPDATE PROJECT INFO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="updateProjectTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="updateProjectDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="updateExpiryDate" className="mb-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </Form.Group>
          <Modal.Footer className="modalColor">
            <Button className="modalCloseButton" onClick={handleClose}>
              CLOSE
            </Button>
            <Button className="modalSaveButton" type="submit">
              UPDATE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModalUpdate
