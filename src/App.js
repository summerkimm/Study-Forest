import Navbar from "./components/Navbar";
import PointTag from "./components/Tags/PointTag";
import GlobalStyles from "./styles/GlobalStyles";
import EmojiTag from './components/Tags/EmojiTag';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <PointTag status="dark" />
      <PointTag status="light" />
      <EmojiTag status="dark" />
      <EmojiTag status="light" />
    </>
  );
}

export default App;
