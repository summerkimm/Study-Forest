import Navbar from "./components/Navbar";
import PointTag from "./components/Tags/PointTag";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <PointTag type="dark" />
      <PointTag type="light" />
    </>
  );
}

export default App;
