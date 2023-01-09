import { Route, Routes } from "react-router-dom";
import CreateForm from "./pages/CreateForm/CreateForm";
import DocumentDetail from "./pages/DocumentDetail/DocumentDetail";
import Documents from "./pages/Documents/Documents";

function App() {
  return (
    <>
      <Routes>
        <Route key="/" path="/" element={<Documents />} />
        <Route key="/create" path="/create" element={<CreateForm />} />
        <Route
          key="/create"
          path="/document/:id"
          element={<DocumentDetail />}
        />
         <Route key="*" path="*" element={<Documents />} />
      </Routes>
    </>
  );
}

export default App;
