import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateStudyPage from "./pages/CreateStudyPage";
import MainPage from "./pages/MainPage";
import StudyDetailPage from "./pages/StudyDetailPage";
import TodayHabitPage from "./pages/TodayHabitPage";
import GlobalStyles from "./styles/GlobalStyles";
import TodayFocusPage from './pages/TodayFocusPage';
import EditStudyPage from './pages/EditStudyPage';

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
            <Route path="edit" element={<EditStudyPage />} />
            <Route path="habit" element={<TodayHabitPage />} />
            <Route path="focus" element={<TodayFocusPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
