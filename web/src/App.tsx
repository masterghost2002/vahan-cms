import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home.page";
import EntityDataPage from "./pages/entity-data.page";
function App() {

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/entity/:entityName" element={<EntityDataPage/>}/>
    </Routes>
    </>
  )
}

export default App
