import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import "./ProjectModals.css"

const MemberModal = ({
  show,
  handleClose,
  allUsers,
  onAddMember,
  onUpdateMemberRole,
  projectId,
}) => {
  const [selectedRoles, setSelectedRoles] = useState({})

  const handleRoleChange = (userId, role) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: role }))
  }

  const handleAddClick = (user) => {
    const role = selectedRoles[user.userId]
    if (role) {
      onAddMember(user, role)
    } else {
      alert("Select a role before adding user")
    }
  }

  const users = Array.isArray(allUsers) ? allUsers : []

  return (
    <Modal className="modalText" show={show} onHide={handleClose} centered>
      <Modal.Header className="modalColor" closeButton>
        <Modal.Title className="modalTextTitle">YOUR FRIENDs</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalColor">
        <ul className="scrollableUserList">
          {users.map((user) => (
            <li
              key={user.userId}
              className="d-flex align-items-center justify-content-between mb-2"
            >
              <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="avatarBoxMember">
                  <img
                    className="avatarImgMember"
                    src={user.avatarUrl}
                    alt={user.userFullName}
                  />
                </div>
                <p className="memberFullName ms-2 m-0">
                  {user.name} {user.surname}
                </p>
              </div>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <select
                  className="me-2"
                  value={selectedRoles[user.userId] || ""}
                  onChange={(e) => {
                    const newRole = e.target.value
                    handleRoleChange(user.userId, newRole)
                    if (user.isMember) {
                      onUpdateMemberRole(projectId, user.userId, newRole)
                    }
                  }}
                >
                  <option value="">Select role</option>
                  <option value="GUEST">Guest</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CREATOR">Creator</option>
                </select>
                <Button
                  className="addMemberButtonModal"
                  onClick={() => handleAddClick(user)}
                >
                  <i className="addMemberButtonModalIcon bi bi-person-add"></i>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer className="modalColor">
        <Button className="modalCloseButton" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MemberModal
