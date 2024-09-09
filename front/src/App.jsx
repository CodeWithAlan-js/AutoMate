import LogPage from "./views/logPage";
import Page404 from "./views/page404";
import SignUpPage from "./views/signUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
