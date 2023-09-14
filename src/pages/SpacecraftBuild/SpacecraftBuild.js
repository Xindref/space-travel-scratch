import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import styles from "./SpacecraftBuild.module.css";
import * as images from "../../images/";


const SpacecraftBuild = () => {

    const INITIAL_SPACECRAFT = {
        name: "",
        capacity: "",
        description: "",
        pictureUrl: ""
    }

    const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { enableLoading, disableLoading } = useContext(LoadingContext);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setSpacecraft((prevSpacecraft) => ({
            ...prevSpacecraft,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newErrors = [];

        if (spacecraft.name === "") {
            newErrors.push(("Every good ship needs a name commander."))
        }
        if (spacecraft.capacity === "") {
            newErrors.push(("We seem to be lacking sufficient data for your capacity commander."))
        }
        if (spacecraft.description === "") {
            newErrors.push(("Care to give us a brief description there commander?"))
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
        }
        else {
            enableLoading();
            const response = await SpaceTravelApi.buildSpacecraft(spacecraft);
            console.log(response.data);
            setSpacecraft(INITIAL_SPACECRAFT);
            navigate('/spacecrafts')
            disableLoading();
        }
    }

    const handleClickBack = () => {
        navigate('/spacecrafts');
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles["form"]}>
                        <div className={styles["form-inputs"]}>
                            <div className={styles["form-input-container"]}>
                                <textarea
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={spacecraft.name}
                                    onChange={handleFormChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={styles["form-input-container"]}>
                                <textarea
                                    type="text"
                                    name="capacity"
                                    placeholder="Capacity"
                                    value={spacecraft.capacity}
                                    onChange={handleFormChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={styles["form-input-container"]}>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={spacecraft.description}
                                    onChange={handleFormChange}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={styles["form-input-container"]}>
                                <textarea
                                    type="text"
                                    name="pictureUrl"
                                    placeholder="Picture URL"
                                    value={spacecraft.pictureUrl}
                                    onChange={handleFormChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className={styles["submit-container"]}>
                            <div className={styles["submit-button"]} type="submit" onClick={handleFormSubmit}>
                                <p>Build</p>
                            </div>
                            <div className={styles["abort-button"]} onClick={handleClickBack}>
                                <p>Abort</p>
                            </div>
                        </div>

                        {errors.length > 0 ?
                            <div className={styles["error-container"]}>
                                <div>
                                    <p className={styles["error-container-header"]}>Error Log</p>
                                </div>
                                {
                                    errors.map((error, index) => <div key={index} className={styles["error"]}>{error}</div>)
                                }
                            </div> : null}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SpacecraftBuild;