import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as images from "../../images/";

import { LoadingContext } from "../../context/LoadingProvider"
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./Spacecraft.module.css";


const Spacecraft = () => {

    const [spacecraft, setSpacecraft] = useState();
    const { id } = useParams();
    const { enableLoading, disableLoading } = useContext(LoadingContext);

    useEffect(() => {
        const fetchSpacecraft = async (id) => {
            enableLoading();
            const thisSpacecraft = (await SpaceTravelApi.getSpacecraftById(id)).data;
            setSpacecraft(thisSpacecraft);
            disableLoading();
        }

        fetchSpacecraft({ id });
    }, [enableLoading, disableLoading])

    return (
        spacecraft &&
        <div className={styles["spacecraft"]}>
            <div className={styles["spacecraft-image-container"]}>
                <div className={styles["spacecraft-base-info"]}>
                    <div>Base Data</div>
                    <p>Name: {spacecraft.name}</p>
                    <p>Capacity: {spacecraft.capacity}</p>
                </div>
                <img src={spacecraft.pictureUrl ? spacecraft.pictureUrl : images.rocket} className={styles["spacecraft-image"]} />
            </div>

            <div className={styles["spacecraft-info-container"]}>
                <div className={styles["spacecraft-info"]}>
                    <div className={styles["spacecraft-info-header"]}>Description:</div>
                    <div className={styles["spacecraft-info-text"]}>{spacecraft.description}</div>
                </div>
            </div>
        </div>
    )
}

export default Spacecraft;