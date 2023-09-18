import { useState, useEffect, useContext } from "react";
import * as images from "../../images";

import styles from "./Planets.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

const Planets = () => {
    const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
    const { isLoading, enableLoading, disableLoading } = useContext(LoadingContext);
    const [selectedPlanetId, setSelectedPlanetId] = useState(-1);
    const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

    const [hoveredPlanet, setHoveredPlanet] = useState("");

    const getPlanetsWithSpacecrafts = async () => {
        const { data: planets, isError: isErrorPlanets } = await SpaceTravelApi.getPlanets();
        const { data: spacecrafts, isError: isErrorSpacecrafts } = await SpaceTravelApi.getSpacecrafts();

        if (!isErrorPlanets && !isErrorSpacecrafts) {
            for (let planet of planets) {
                planet.spacecrafts = [];
            }

            for (let spacecraft of spacecrafts) {
                const planet = planets.find((planet) => planet.id === spacecraft.currentLocation)
                if (planet) {
                    planet.spacecrafts.push(spacecraft)
                }
            }

            setPlanetsWithSpacecrafts(planets)
        }
    }

    useEffect(() => {
        const fetchPlanetsWithSpacecrafts = async () => {
            enableLoading();
            await getPlanetsWithSpacecrafts();
            disableLoading();
        }

        fetchPlanetsWithSpacecrafts();
    }, [enableLoading, disableLoading])

    const handlePlanetClick = (event, id, name) => {
        event.preventDefault()
        setHoveredPlanet(name);
        setSelectedPlanetId(id)
    }

    const handleSpacecraftClick = async (event, spacecraftId, planetId) => {
        event.preventDefault();
        if (!isLoading && Number.isInteger(selectedPlanetId) && selectedPlanetId !== planetId) {
            setSelectedSpacecraftId(spacecraftId);
            enableLoading();
            const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId: selectedPlanetId })
            if (!isError) {
                await getPlanetsWithSpacecrafts();
                setSelectedPlanetId(-1);
                setSelectedSpacecraftId(null);
                setHoveredPlanet("");
            }
            disableLoading();
        }
    }

    const handleMouseEnterPlanet = (name) => {
        if (selectedPlanetId === -1) {
            setHoveredPlanet(name);
        }
    }

    const handleMouseLeavePlanet = (id) => {
        if (selectedPlanetId === -1) {
            setHoveredPlanet("");
        }
    }

    return (
        <div className={styles["planet-container"]}>
            {planetsWithSpacecrafts.map((planet, index) =>
                <div key={index} className={styles["planet"]}>
                    <div className={styles["planet-info"]}>
                        <p className={styles["planet-name"]}>{planet.name}</p>
                        <p className={styles["population-info"]} style={parseInt(planet.currentPopulation) > 0 ? { color: 'yellowgreen' } : { color: 'red' }}>Population: {parseInt(planet.currentPopulation)}</p>
                    </div>
                    {hoveredPlanet === planet.name ? <img src={planet.darkPictureUrl} className={styles[`${planet.name}-shadow`]} style={{ scale: '1.1' }} /> : null}
                    <img
                        src={planet.pictureUrl}
                        className={styles["planet-image"]}
                        onMouseEnter={() => handleMouseEnterPlanet(planet.name)}
                        onMouseLeave={() => handleMouseLeavePlanet(planet.id)}
                        onClick={(event) => handlePlanetClick(event, planet.id, planet.name)}
                    />
                    <div className={styles["planet-spacecrafts-container"]}>
                        {planet.spacecrafts.map((spacecraft, index) => {
                            return <div key={index} className={styles["planet-spacecraft"]} onClick={(event) => handleSpacecraftClick(event, spacecraft.id, planet.id)}>
                                <img src={spacecraft.pictureUrl ? spacecraft.pictureUrl : images.rocket} />
                                <p>{spacecraft.name}</p>
                            </div>
                        }
                        )}
                    </div>
                </div>)}
        </div>
    );
}

export default Planets;