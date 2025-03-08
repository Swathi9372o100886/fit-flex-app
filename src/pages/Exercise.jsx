import React, { useState, useEffect } from "react";

const ExerciseSearch = () => {
  // State to store API data
  const [equipment, setEquipment] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  // Fetch Equipment Data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          "https://exercise-db-fitness-workout-gym.p.rapidapi.com/list/equipment",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
              "x-rapidapi-key": "9b3fc1d18bmsha20cc8c1940eed4p115180jsn1bd5f40f82b4", // Replace with your API Key
            },
          }
        );
        const data = await response.json();
        setEquipment(data); // Store in state
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  // Fetch Body Parts Data
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch(
          "https://exercise-db-fitness-workout-gym.p.rapidapi.com/list/bodyPart",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
              "x-rapidapi-key": "9b3fc1d18bmsha20cc8c1940eed4p115180jsn1bd5f40f82b4", // Replace with your API Key
            },
          }
        );
        const data = await response.json();
        setBodyParts(data); // Store in state
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchBodyParts();
  }, []);

  return (
    <div>
      <h2>Search for Your Perfect Workout</h2>

      {/* Dropdown for Body Parts */}
      <select onChange={(e) => setSelectedBodyPart(e.target.value)}>
        <option value="">Choose Body Part</option>
        {bodyParts.map((part, index) => (
          <option key={index} value={part}>
            {part}
          </option>
        ))}
      </select>

      {/* Dropdown for Equipment */}
      <select onChange={(e) => setSelectedEquipment(e.target.value)}>
        <option value="">Choose Equipment</option>
        {equipment.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button onClick={() => console.log ('Selected, ${selectedBodyPart}; ${selectedEquipment};')}>
        Search
      </button>
    </div>
  );
};

export default ExerciseSearch;