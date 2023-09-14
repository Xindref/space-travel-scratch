import * as images from "../../images";

import styles from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={styles["loading-screen"]}>
            <img src={images.loading}></img>
        </div>
    )
}

export default Loading;