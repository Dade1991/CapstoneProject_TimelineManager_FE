import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

function AddCategoryModal({ show, handleClose, onSubmit }) {
  const [categoryName, setCategoryName] = useState("")
  const [categoryColor, setCategoryColor] = useState("#000000")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!categoryName.trim()) {
      alert("Category name is mandatory!")
      return
    }
    setIsSubmitting(true)
    try {
      await onSubmit({ categoryName, categoryColor })
      setCategoryName("")
      setCategoryColor("#000000")
      handleClose()
    } catch (error) {
      alert("Error saving category: " + error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="modalColor" closeButton>
          <Modal.Title className="modalTextTitle">NEW CATEGORY</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalColor">
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
              disabled={isSubmitting}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="categoryColor">
            <Form.Label className="d-flex flex-row align-items-center">
              Category Color{" "}
              <p className="advertiser ms-2 m-0">(click the square below)</p>
            </Form.Label>
            <Form.Control
              type="color"
              value={categoryColor}
              onChange={(e) => setCategoryColor(e.target.value)}
              disabled={isSubmitting}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="modalColor">
          <Button
            className="modalCloseButton"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            CLOSE
          </Button>
          <Button
            className="modalSaveButton"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCategoryModal
