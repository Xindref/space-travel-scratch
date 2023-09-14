import { NavLink, useLocation } from "react-router-dom";
import * as icons from "C:/Users/Dako/Documents/Springboard/space-travel-scratch/src/images";

import styles from "./NavBar.module.css";

const NavBar = () => {
    const location = useLocation();
    return (
        <nav className={styles["navbar"]}>
            <ul className={styles["nav-list"]}>
                <NavLink
                    to="/"
                    className={styles["nav-item"]}
                    style={location.pathname === "/" ? { backgroundColor: "rgba(35, 180, 120, 60%)", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", borderTopLeftRadius: "5px" } : {}}
                >
                    <img className={styles["nav-img"]} src={icons.planetEarth} alt="Home" />
                    <p>Home</p>
                </NavLink>

                <NavLink
                    to="/spacecrafts"
                    className={styles["nav-item"]}
                    style={location.pathname === "/spacecrafts" ? { backgroundColor: "rgba(35, 180, 120, 60%)" } : {}}
                >
                    <img className={styles["nav-img"]} src={icons.rocket} alt="Spacecrafts" />
                    <p>Spacecrafts</p>
                </NavLink>

                <NavLink
                    to="/planets"
                    className={styles["nav-item"]}
                    style={location.pathname === "/planets" ? { backgroundColor: "rgba(35, 180, 120, 60%)", borderTopRightRadius: "15px", borderBottomRightRadius: "15px", borderTopRightRadius: "5px" } : {}}
                >
                    <img className={styles["nav-img"]} src={icons.planet} alt="Planets" />
                    <p>Planets</p>
                </NavLink>
            </ul>
        </nav>
    );
};

export default NavBar;
