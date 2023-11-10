import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Script from "./components/script/Script";

function App() {
  return (
    <>
      <div className="d-flex">
        <Aside />
        <div className="d-flex flex-column flex-grow-1">
          <Header />
          <Main/>
        </div>
      </div>
      <Script />
    </>
  );
}

export default App;
