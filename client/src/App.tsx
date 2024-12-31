import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>HOME</Layout>} />
      <Route path="/profile" element={<span>PROFILE</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
