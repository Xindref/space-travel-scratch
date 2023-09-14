import { useCallback, useContext, useEffect, useState } from "react";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import { LoadingContext } from "../../context/LoadingProvider";
import * as images from "../../images/";
import styles from "./Spacecrafts.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const Spacecrafts = () => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const { enableLoading, disableLoading } = useContext(LoadingContext)

    const navigate = useNavigate();

    const fetchSpacecrafts = async () => {
        const spacecraftsData = await SpaceTravelApi.getSpacecrafts();
        setSpacecrafts(spacecraftsData.data);
    }

    const handleClickSpacecraft = (event, id) => {
        navigate(`/spacecraft/${id}`);
    }

    const handleClickDestroy = async (event, id) => {
        enableLoading();
        const { isError } = await SpaceTravelApi.destroySpacecraftById({ id });
        if (!isError) {
            await fetchSpacecrafts();
        }
        disableLoading();
    }

    const handleClickBuild = () => {
        if (spacecrafts.length != 5) {
            navigate('/spacecraftbuild');
        }
    }

    useEffect(() => {
        const initiateFetch = async () => {
            enableLoading();
            await fetchSpacecrafts();
            disableLoading();
        }

        initiateFetch();
    }, [enableLoading, disableLoading])

    return (
        <div style={{ width: "100%" }}>
            <button onClick={handleClickBuild} className={spacecrafts.length !== 5 ? styles["build-button"] : styles["build-button-disabled"]}>
                <img src={images.wrench}></img>
                <p>Build Spacecraft</p>
            </button>
            {spacecrafts.length === 5 ?
                <div className={styles["max-capacity-error"]}>
                    Maximum Ship Capacity Built!
                </div> : null}
            <div className={styles["spacecraft-list"]}>
                {spacecrafts.map((spacecraft, index) => (
                    <div key={index} className={styles["spacecraft"]}>
                        <img onClick={(event) => handleClickSpacecraft(event, spacecraft.id)} className={styles["spacecraft-image"]} src={spacecraft.pictureUrl ? spacecraft.pictureUrl : images.rocket}></img>
                        <div className={styles["spacecraft-info"]}>
                            <p>Name: {spacecraft.name}</p>
                            <p>Capacity: {spacecraft.capacity}</p>
                        </div>
                        <button onClick={(event) => handleClickDestroy(event, spacecraft.id)} className={styles["spacecraft-destroy"]}><p>Destroy</p></button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Spacecrafts;