import { nanoid } from "nanoid";
import * as images from "../images/";

class SpaceTravelMockApi {
  static MOCK_DB = {
    planets: [
      {
        id: 0,
        name: "Mercury",
        currentPopulation: 0,
        pictureUrl: images.Mercury,
        darkPictureUrl: images.MercuryDark
      },
      {
        id: 1,
        name: "Venus",
        currentPopulation: 0,
        pictureUrl: images.Venus,
        darkPictureUrl: images.VenusDark
      },
      {
        id: 2,
        name: "Earth",
        currentPopulation: 100000,
        pictureUrl: images.Earth,
        darkPictureUrl: images.EarthDark
      },
      {
        id: 3,
        name: "Mars",
        currentPopulation: 0,
        pictureUrl: images.Mars,
        darkPictureUrl: images.MarsDark
      },
      {
        id: 4,
        name: "Jupiter",
        currentPopulation: 0,
        pictureUrl: images.Jupiter,
        darkPictureUrl: images.JupiterDark

      },
      {
        id: 5,
        name: "Saturn",
        currentPopulation: 0,
        pictureUrl: images.Saturn,
        darkPictureUrl: images.SaturnDark
      },
      {
        id: 6,
        name: "Uranus",
        currentPopulation: 0,
        pictureUrl: images.Uranus,
        darkPictureUrl: images.UranusDark
      },
      {
        id: 7,
        name: "Neptune",
        currentPopulation: 0,
        pictureUrl: images.Neptune,
        darkPictureUrl: images.NeptuneDark
      }
    ],
    spacecrafts: [
      {
        id: "prispax",
        name: "Prispax",
        capacity: 10000,
        description: "Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact." +
          "Within, the vessel transforms into a haven of opulence. Lavish suites offer cosmic panoramas, celestial artwork bedecks lounges, and sprawling gardens thrive in zero-gravity. Culinary excellence reigns in gourmet restaurants, while immersive theaters and VR chambers offer stellar entertainment." +
          "Safety remains paramount with cosmic radiation shielding and top-tier medical facilities. The Astrolux Odyssey not only advances space exploration but redefines elegance, uniting humanity's thirst for knowledge with a taste of the sublime.",
        pictureUrl: null,
        currentLocation: 2
      }
    ]
  };
  static MOCK_DB_KEY = "MOCK_DB";

  static prepareResponse() {
    return {
      isError: false,
      data: null
    };
  }

  static wait(duration = 1000) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  static getMockDb() {
    let mockDb = localStorage.getItem(SpaceTravelMockApi.MOCK_DB_KEY);

    if (!mockDb) {
      localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(SpaceTravelMockApi.MOCK_DB));
      mockDb = SpaceTravelMockApi.MOCK_DB;
    }
    else {
      mockDb = JSON.parse(mockDb);
    }

    return mockDb;
  }

  static setMockDb(mockDb) {
    localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(mockDb));
  }

  static async getPlanets() {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.planets;
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecrafts() {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.spacecrafts;
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecraftById({ id }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++) {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === id) {
          response.data = spacecraft;
          break;
        }
      }
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async buildSpacecraft({ name, capacity, description, pictureUrl = undefined }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const spacecraft = { id: nanoid(), name, capacity, description, pictureUrl, currentLocation: 2 };

      const mockDb = SpaceTravelMockApi.getMockDb();
      mockDb.spacecrafts.push(spacecraft);
      SpaceTravelMockApi.setMockDb(mockDb);
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async destroySpacecraftById({ id }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++) {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === id) {
          mockDb.spacecrafts.splice(i, 1);
          SpaceTravelMockApi.setMockDb(mockDb);
        }
      }
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++) {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === spacecraftId) {
          if (spacecraft.currentLocation === targetPlanetId) {
            throw new Error("The spacecraft is already on this planet!");
          }

          let transferredCapacity = spacecraft.capacity;

          for (const planet of mockDb.planets) {
            if (planet.id === spacecraft.currentLocation) {
              if (planet.currentPopulation < transferredCapacity) {
                transferredCapacity = planet.currentPopulation;
              }

              planet.currentPopulation -= transferredCapacity;
            }
          }

          for (const planet of mockDb.planets) {
            if (planet.id === targetPlanetId) {
              planet.currentPopulation += transferredCapacity;
            }
          }

          spacecraft.currentLocation = targetPlanetId;
          SpaceTravelMockApi.setMockDb(mockDb);
        }
      }
    }
    catch (error) {
      response.isError = true;
      response.data = error;
    }

    return response;
  }
}

export default SpaceTravelMockApi;
