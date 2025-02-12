import Header from "./components/Header";
import { useEffect ,useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/styles/index.css";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setShowBackToTop(window.scrollY > 300)
    );
    return () =>
      window.removeEventListener("scroll", () => setShowBackToTop(false));
  }, []);

  return (
    <>
      <div className="App">
        <Header />
      </div>
      {showBackToTop && (
        <button
          className="back-to-top-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default App;
