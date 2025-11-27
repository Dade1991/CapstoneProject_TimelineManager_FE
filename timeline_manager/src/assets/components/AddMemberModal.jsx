import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const AddMemberModal = ({ show, handleClose, onSubmit }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  // pulisce il form quando il modale si chiude

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
              <option value="guest">guest</option>
              <option value="Admin">Admin</option>
              <option value="Creator">Creator</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modalColor">
        <Button className="modalSaveButton" type="submit">
          ADD
          {/* {alert("Member successfully added!")} */}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMemberModal
