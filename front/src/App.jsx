import LogPage from "./views/logPage";
import Page404 from "./views/page404";
import HomePage from "./views/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/formContext";

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/register" element={<LogPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
