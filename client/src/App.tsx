import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<span>HOME</span>} />
      <Route path="/profile" element={<span>PROFILE</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
