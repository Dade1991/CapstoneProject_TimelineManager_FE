import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

function CategoryModalUpdate({ show, handleClose, category, onSubmit }) {
  const [categoryName, setCategoryName] = useState("")
  const [categoryColor, setCategoryColor] = useState("#000000")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (category) {
      // indagare sull'errore e sul perchè funziona comunque

      setCategoryName(category.categoryName || "")
      setCategoryColor(category.categoryColor || "#000000")
    }
  }, [category])

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!categoryName.trim()) {
      alert("Category name is mandatory!")
      return
    }
    setIsSubmitting(true)
    try {
      await onSubmit({
        categoryId: category.categoryId,
        categoryName,
        categoryColor,
      })
      handleClose()
    } catch (error) {
      alert("Error updating category: " + error.message)
    }
    setIsSubmitting(false)
  }

  if (!category) {
    return null
  }

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className="modalColor" closeButton>
          <Modal.Title className="modalTextTitle">Edit Category</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalColor">
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={isSubmitting}
              required
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
          <div className="d-flex flex-row">
            <Button
              className="modalCloseButton me-2"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Close
            </Button>
            <Button
              className="modalSaveButton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "EDIT"}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CategoryModalUpdate
