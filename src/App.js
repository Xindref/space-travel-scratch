import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoadingContext } from "./context/LoadingProvider";

import styles from "./App.module.css";
import Loading from "./components/Loading/Loading";
import AppRoute from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {

  const { isLoading } = useContext(LoadingContext);
  const basename = process.env.PUBLIC_URL || "/";

  return (
    <>
      {
        <BrowserRouter basename={basename}>
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
        </BrowserRouter>
      }
      {
        isLoading ? <Loading /> : null
      }
    </>
  );
}

export default App;
