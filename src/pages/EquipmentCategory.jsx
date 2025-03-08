import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EquipmentCategory = () => {
  const { id } = useParams(); // Get the equipment ID from the URL
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]); // Ensure fetchData runs when id changes

  const fetchData = async (id) => {
    const options = {
      method: "GET",
      url:"https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/equipment/${id}",
      params: { limit: "50" },
      headers: {
        "X-RapidAPI-Key": "9b3fc1d18bmsha20cc8c1940eed4p115180jsn1bd5f40f82b4",
        "X-RapidAPI-Host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setExercises(response.data); // Update state with fetched data
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="category-exercises-page">
      <h1>Category: <span>{id}</span></h1>

      {exercises.length > 0 ? (
        <div className="exercises">
          {exercises.map((exercise, index) => (
            <div 
              className="exercise" 
              key={exercise.id || index} 
              onClick={() => navigate('/exercise/ ${exercise.id}')}
            >
              <img 
                src={exercise?.gifUrl} 
                alt={exercise?.name || "Exercise Image"} 
              />
              <h3>{exercise?.name}</h3>
              <ul>
                <li>{exercise?.target}</li>
                {exercise?.secondaryMuscles?.slice(0, 2).map((muscle, idx) => (
                  <li key={idx}>{muscle}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading exercises...</p>
      )}
    </div>
  );
};

export default EquipmentCategory;