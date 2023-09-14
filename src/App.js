import { useContext } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { LoadingContext } from "./context/LoadingProvider";

import styles from "./App.module.css";
import Loading from "./components/Loading/Loading";
import AppRoute from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {

  const { isLoading } = useContext(LoadingContext);
  const basename = process.env.REACT_APP_BASENAME || "/";

  return (
    <>
      {
        <HashRouter>
          <div className={styles["app"]}>
            <header className={styles["app__header"]}>
              <NavBar />
            </header>

            <main className={styles["app__main"]}>
              <AppRoute />
            </main>

            <footer className={styles["app__footer"]}>
              <Footer />
            </footer>
          </div>
        </HashRouter>
      }
      {
        isLoading ? <Loading /> : null
      }
    </>
  );
}

export default App;
