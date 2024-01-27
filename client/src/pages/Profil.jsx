import React, { useContext } from "react";
import { UidContext } from "../components/Context/AppContext";
import Log from "./Log/Log.jsx";
import Navbar from "../components/@shared/Navbar";
import UpdateProfil from "./profil/UpdateProfil";

function Profil() {
  const uid = useContext(UidContext);
  return (
    <>
    <Navbar/>
    <div className="profil-page">
      {uid ? (
        <UpdateProfil/>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="/img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Profil;
