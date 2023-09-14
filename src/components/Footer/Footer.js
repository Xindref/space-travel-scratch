import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles["footer"]}>
            <span className={styles["footer-text"]}>The solar system: the new home.</span>
            <span className={styles["footer-emojis"]}>🌎🚀🧑‍🚀🪐</span>
        </div>
    );
}

export default Footer;
