import { Row, Col } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import { useContext, useState, useEffect } from "react"
import "./YourArea.css"
import { AuthContext } from "../../AuthContext"

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error("Failed to parse JWT", e)
    return null
  }
}

function YourArea() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  // const [avatar, setAvatar] = useState("")

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordSuccess, setPasswordSuccess] = useState(null)

  const [loading, setLoading] = useState(false)

  const { token } = useContext(AuthContext)
  const payload = token ? parseJwt(token) : null
  const userId = payload ? payload.sub : null
  console.log("userId exctract from token:", userId)
  console.log("Token:", token)

  useEffect(() => {
    if (!token || !userId) {
      console.log("Token or userId not present, skip fetching.")
      return
    }

    fetch(`http://localhost:3001/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        console.log("Status response:", res.status, res.ok)
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error("Failed to load profile data: " + errorText)
        }
        return res.json()
      })
      .then((data) => {
        console.log("questi sono data: ", data)
        setName(data.name || "")
        setSurname(data.surname || "")
        setNickname(data.nickname || "")
        setEmail(data.email || "")
        setError(null)
      })
      .catch((err) => {
        console.error("Errore nel fetch profile:", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [token, userId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!token || !userId) {
      setError("User not authenticated.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    const payloadUpdate = {
      name,
      surname,
      nickname,
      /*avatarUrl: avatar,*/
      email,
    }

    // UPDATE USER

    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payloadUpdate),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error("Profile update failed: " + errorText)
        }
        return res.json()
      })
      .then(() => setSuccess("Profile correctly updated!"))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)

    if (newPassword.length < 8) {
      setPasswordError("New password must have at least 8 characters.")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.")
      return
    }

    if (!token || !userId) {
      setPasswordError("User not authenticated.")
      return
    }

    setLoading(true)

    // UPDATE USER PASSWORD

    fetch(`http://localhost:3001/api/users/${userId}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error("Password update failed: " + errorText)
        }
        return res.text()
      })
      .then(() => {
        setPasswordSuccess("Password updated successfully!")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      })
      .catch((err) => {
        setPasswordError(err.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <div
        onSubmit={handleSubmit}
        className="updateForm wrapper frosted-glass p-4 d-flex justify-content-center"
      >
        <div className="updateFormDiv d-flex flex-column flex-grow-1">
          <div className="updateFormWelcomeText align-content-center">
            <h3 className="text-center m-0">
              Here you can <strong className="boldText">UPDATE</strong> your{" "}
              personal information!
            </h3>
          </div>
          <Row className="p-2">
            <Col md={6} className="">
              <h4 className="yourAreaTitle">Change Infos</h4>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    Name:
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control
                      className="w-100"
                      type="text"
                      placeholder="Insert your Name here..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="formSurname">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    Surname:
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Insert your Surname here..."
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      disabled={loading}
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="formNickname">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    Nickname:
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Insert your Nickname here..."
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      disabled={loading}
                    />
                  </Col>
                </Form.Group>

                {/* <Form.Group controlId="formAvatar">
                  <Form.Label sm="3">
                    AVATAR:
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Insert your AVATAR here..."
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      disabled={loading}
                    />
                  </Col>
                </Form.Group> */}

                <Form.Group controlId="formEmail">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    E-mail:
                  </Form.Label>
                  <Col sm="12">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Insert here your @email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        autoComplete="new-email"
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
                <div className=" text-center d-flex justify-content-end align-items-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="custom-btn mt-4"
                    disabled={loading}
                  >
                    <p className="signUpButton m-0">
                      {loading ? "Updating..." : "Update"}
                    </p>
                  </Button>
                </div>
              </Form>
            </Col>
            {/* <hr className="brInterruption my-2" /> */}

            <Col md={6}>
              <h4 className="yourAreaTitle">Change Password</h4>
              <Form onSubmit={handleChangePassword} className="">
                <Form.Group className="" controlId="formOldPassword">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    Old Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </Form.Group>

                <Form.Group className="" controlId="formNewPassword">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    New Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      if (e.target.value.length < 8) {
                        setPasswordError(
                          "New password must have at least 8 characters."
                        )
                      } else {
                        setPasswordError(null)
                      }
                    }}
                    disabled={loading}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label className="yourAreaDescribe" sm="3">
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </Form.Group>
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-success">{passwordSuccess}</p>
                )}
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    className="custom-btn-password"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Change Password"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
          <div className="text-center py-4">
            <img className="" src="/gif/Typing_Animation.gif" alt="typingGif" />
          </div>
        </div>
      </div>
    </>
  )
}

export default YourArea
