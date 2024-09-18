import LogPage from "./views/logPage";
import Page404 from "./views/page404";
import HomePage from "./views/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { UserTaskProvider } from "./context/userTaskContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <UserTaskProvider>
          <Routes>
            <Route path="/" element={<LogPage />} />
            <Route path="/register" element={<LogPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </UserTaskProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
