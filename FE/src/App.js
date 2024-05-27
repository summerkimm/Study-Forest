import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateStudyPage from "./pages/CreateStudyPage";
import MainPage from "./pages/MainPage";
import StudyDetailPage from "./pages/StudyDetailPage";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/studies">
          <Route index element={<CreateStudyPage />} />
          <Route path=":id" element={<StudyDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
