import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add-entry">Add Entry</Link> | <Link to="/view-history">View History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/view-history" element={<ViewHistory />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return <h1>Welcome to the Calorie Counter</h1>;
};

const AddEntry = () => {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { food, calories };
    await axios.post('http://localhost:5000/api/food', newEntry);
    setFood('');
    setCalories('');
  };

  return (
    <div>
      <h2>Add Food Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Food:</label>
        <input type="text" value={food} onChange={(e) => setFood(e.target.value)} required />
        <br />
        <label>Calories:</label>
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        <br />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

const ViewHistory = () => {
  const [entries, setEntries] = useState([]);

  React.useEffect(() => {
    const fetchEntries = async () => {
      const response = await axios.get('http://localhost:5000/api/food');
      setEntries(response.data);
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <h2>Food Entries History</h2>
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.food} - {entry.calories} Calories
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries found!</p>
      )}
    </div>
  );
};

export default App;
