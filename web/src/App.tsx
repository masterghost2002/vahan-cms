import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home.page";
function App() {

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </>
  )
}

export default App
