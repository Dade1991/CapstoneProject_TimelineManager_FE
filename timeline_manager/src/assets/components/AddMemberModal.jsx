import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const AddMemberModal = ({ show, handleClose, onSubmit }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  // Pulisce il form quando il modale si chiude
  const handleModalClose = () => {
    setName("")
    setEmail("")
    setRole("")
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, email, role })
    handleModalClose()
  }

  return (
    <Modal className="modalText" show={show} onHide={handleModalClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">ADD MEMBER</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="sviluppatore">Sviluppatore</option>
              <option value="project_manager">Project Manager</option>
              <option value="designer">Designer</option>
              <option value="tester">Tester</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modalColor">
        <Button className="modalSaveButton" type="submit">
          ADD
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMemberModal
