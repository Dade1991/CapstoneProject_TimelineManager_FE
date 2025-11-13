import "./App.css"
import HomePage from "./assets/components/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFoundPage from "./assets/components/NotFoundPage"
import Projects from "./assets/components/Projects"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
