import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDataUser } from '../../redux/actionCreator';
import { logout } from '../action/logout';
import { UidContext } from '../Context/AppContext';

function Navbar() {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchDataUser(uid));
  }, [uid]);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img src="/img/icon.png" alt="icon" />
              <h3>ManitraBook</h3>
            </div>
          </Link>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <Link to="/profil">
                <h5>
                  Bienvenue {userInfo.data.pseudo ? userInfo.data.pseudo : null}
                </h5>
              </Link>
            </li>
            <li>
              <img
                onClick={logout}
                src="./img/icons/logout.svg"
                alt="logout icon"
                title="logout"
              />
            </li>
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <Link exact="true" to="/profil">
                <img src="./img/icons/login.svg" alt="login icon" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
