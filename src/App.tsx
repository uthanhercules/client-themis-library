import React, { useEffect, useState } from "react";

import "./shared/scss/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Outlet from "./routes/outlet";
import MainAsideMenu from "./shared/components/MainAsideMenu";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("userToken");
    if (isAuth) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <main className="App">
        {auth ? <MainAsideMenu /> : null}
        <Outlet />
      </main>
    </>
  );
}

export default App;
