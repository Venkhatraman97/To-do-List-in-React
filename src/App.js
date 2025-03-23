import React, { useState, useCallback } from "react";
import "./App.css"; // CSS file

function GoalItem({ goal, onRemove }) {
  return (
    <li className="goal-item" onClick={onRemove}>
      {goal}
    </li>
  );
}

function GoalInput({ onAddGoal }) {
  const [newGoal, setNewGoal] = useState("");

  const addGoalHandler = () => {
    if (newGoal.trim() !== "") {
      onAddGoal(newGoal);
      setNewGoal("");
    }
  };

  return (
    <div className="goal-input">
      <input
        type="text"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="Enter your goal..."
      />
      <button className="goal-button" onClick={addGoalHandler} aria-label="Add Goal">
        Add Goal
      </button>
    </div>
  );
}

function App() {
  const [goals, setGoals] = useState([]);

  // UseCallback to optimize re-rendering
  const addGoalHandler = useCallback((goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  }, []);

  const removeGoalHandler = useCallback((goalToRemove) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal !== goalToRemove));
  }, []);

  return (
    <div className="main-container">
      <div className="app-container">
        <h2>Course Goals</h2>
        <GoalInput onAddGoal={addGoalHandler} />
      </div>

      {/* Goals List - Placed Outside Container */}
      <ul className="goal-list">
        {goals.length === 0 ? (
          <p className="no-goals">No goals added yet!</p>
        ) : (
          goals.map((goal, index) => (
            <GoalItem key={index} goal={goal} onRemove={() => removeGoalHandler(goal)} />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
