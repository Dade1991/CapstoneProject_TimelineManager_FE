import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

// colori per category

const availableColors = [
  "#FF5733",
  "#33FFCE",
  "#3375FF",
  "#FF33B8",
  "#33FF57",
  "#FFC733",
  "#9933FF",
  "#33FFF6",
]

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
              <p className="advertiser ms-2 m-0">
                (choose a color for your Category)
              </p>
            </Form.Label>
            <div className="d-flex flex-wrap mt-2">
              {availableColors.map((color) => (
                <div
                  key={color}
                  onClick={() => !isSubmitting && setCategoryColor(color)}
                  style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    borderRadius: 4,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    border:
                      categoryColor === color
                        ? "3px solid #000"
                        : "1px solid  #f2e0d0",
                  }}
                  title={color}
                />
              ))}
            </div>
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
              {isSubmitting ? "Saving..." : "SAVE"}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCategoryModal
