import Chip from './components/Chip';
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <h1>Hello, World!</h1>
        <Chip isActive={true}>미라클모닝기상</Chip>
      </div>
    </>
  );
}

export default App;
