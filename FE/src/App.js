import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateStudyPage from "./pages/CreateStudyPage";
import MainPage from "./pages/MainPage";
import StudyDetailPage from "./pages/StudyDetailPage";
import TodayHabitPage from "./pages/TodayHabitPage";
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
          <Route path=":id">
            <Route index element={<StudyDetailPage />} />
            <Route path="habit" element={<TodayHabitPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
