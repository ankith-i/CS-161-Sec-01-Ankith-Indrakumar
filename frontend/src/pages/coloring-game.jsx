import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth'; // Import the auth instance from Firebase
import styles from '../styles/ColoringGame.module.css';

const ColoringGame = () => {
  const [maps, setMaps] = useState([
    {
      regions: Array(5).fill(null),
      adjacencyList: [
        [1, 2, 3],
        [0, 2, 4],
        [0, 1, 3, 4],
        [0, 2, 4],
        [1, 2, 3]
      ],
      paths: [
        "M100,10 L150,40 L150,90 L100,120 L50,90 L50,40 Z", // Hexagon
        "M150,40 L200,10 L250,40 L250,90 L200,120 L150,90 Z",
        "M150,90 L200,120 L200,170 L150,200 L100,170 L100,120 Z",
        "M50,90 L100,120 L100,170 L50,200 L0,170 L0,120 Z",
        "M100,170 L150,200 L150,250 L100,280 L50,250 L50,200 Z"
      ]
    },
    {
      regions: Array(4).fill(null),
      adjacencyList: [
        [1, 2],
        [0, 3],
        [0, 3],
        [1, 2]
      ],
      paths: [
        "M20,20 L80,40 L80,120 L20,140 Z", // Quadrilateral
        "M80,40 L140,20 L160,140 L80,120 Z",
        "M80,120 L160,140 L140,200 L20,140 Z",
        "M20,140 L140,200 L80,220 L10,160 Z"
      ]
    },
    {
      regions: Array(5).fill(null),
      adjacencyList: [
        [1, 2, 3],
        [0, 2, 4],
        [0, 1, 3],
        [0, 2, 4],
        [1, 3]
      ],
      paths: [
        "M100,20 L180,60 L160,140 L100,110 Z",
        "M100,110 L160,140 L140,220 L60,180 Z",
        "M60,180 L140,220 L100,280 L20,240 Z",
        "M20,240 L100,280 L40,300 L0,260 Z",
        "M0,260 L40,300 L10,340 L10,300 Z"
      ]
    }
  ]);

  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const navigate = useNavigate(); // Navigate between pages
  const isGuest = location.pathname === '/guest-coloring-game';

  // Function to log actions to the backend
  const logAction = async (actionType) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    try {
      // Only log actions if not in guest mode
      if (currentUser && !isGuest) {
        const action = {
          type: actionType,
          user_id: currentUser.uid,
          timestamp: new Date().toISOString()
        };
        await axios.post('http://3.138.102.26/api/log-action', action);
      } else {
        console.log(`Action '${actionType}' not logged because of guest mode or missing user.`);
      }
    } catch (error) {
      console.error('Error logging action:', error.message);
    }
  };

  const colorNames = {
    '#FF6347': 'Red',
    '#4682B4': 'Blue',
    '#32CD32': 'Green',
    '#FFD700': 'Yellow'
  };

  const colors = Object.keys(colorNames);

  // Timer function
  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    } else {
      setErrorMessage("Time is up!");
      setShowModal(true);
    }
  }, [timer]);

  const canUseColor = (mapIndex, regionIndex, color) => {
    return !maps[mapIndex].adjacencyList[regionIndex].some(adj => maps[mapIndex].regions[adj] === color);
  };

  // Log color changes and update the region color
  const handleRegionColor = index => {
    const currentMap = maps[currentMapIndex];
    if (currentMap.regions[index] === selectedColor) {
      setErrorMessage("This region is already this color.");
      setShowModal(true);
      return;
    }

    const isAdjacentSameColor = currentMap.adjacencyList[index].some(adj => currentMap.regions[adj] === selectedColor);
    if (isAdjacentSameColor) {
      setErrorMessage("Adjacent regions cannot have the same color.");
      setShowModal(true);
      return;
    }

    const newMaps = [...maps];
    newMaps[currentMapIndex].regions[index] = selectedColor;
    setMaps(newMaps);
    setErrorMessage('');
    setShowModal(false);

    logAction('color_change'); // Log the color change action
  };

  const handleHint = () => {
    const currentMap = maps[currentMapIndex];
    const uncoloredRegions = currentMap.regions.map((color, index) => ({ index, color })).filter(r => !r.color);
    if (uncoloredRegions.length === 0) {
      setHintMessage('All regions are already colored.');
      setShowHint(true);
      return;
    }
    const randomRegion = uncoloredRegions[Math.floor(Math.random() * uncoloredRegions.length)];
    const possibleColors = colors.filter(color => canUseColor(currentMapIndex, randomRegion.index, color));
    setHintMessage(`For region ${randomRegion.index}, you can use: ${possibleColors.map(color => colorNames[color]).join(', ')}`);
    setShowHint(true);

    logAction('hint_request'); // Log the hint request action
  };

  const handleSolution = () => {
    const newMaps = [...maps];
    newMaps[currentMapIndex].regions.forEach((_, index) => {
      if (!newMaps[currentMapIndex].regions[index]) {
        const foundColor = colors.find(color => canUseColor(currentMapIndex, index, color));
        newMaps[currentMapIndex].regions[index] = foundColor;
      }
    });
    setMaps(newMaps);
    setHintMessage('Graph has been successfully colored!');
    setShowHint(true);

    logAction('solution_request'); // Log the solution action
  };

  const handleSubmit = () => {
    const currentMap = maps[currentMapIndex];
    if (currentMap.regions.includes(null)) {
      setErrorMessage("Please color all regions before submitting.");
      setShowModal(true);
    } else {
      setErrorMessage("Congratulations! Successfully colored.");
      setShowModal(true);
    }

    logAction('submit'); // Log the submit action
  };

  const handleReset = () => {
    const newMaps = [...maps];
    newMaps[currentMapIndex].regions.fill(null);
    setMaps(newMaps);
    setErrorMessage('');
    setShowModal(false);
    setTimer(30);

    logAction('reset'); // Log the reset action
  };

  const handlePartialSolution = () => {
    const currentMap = maps[currentMapIndex];
    const newMaps = [...maps];
    const regionsToColor = Math.ceil(currentMap.regions.length * 0.5); // Color half of the regions

    new Set(Array.from({ length: regionsToColor }, () => Math.floor(Math.random() * currentMap.regions.length)))
      .forEach(index => {
        if (!newMaps[currentMapIndex].regions[index]) {
          const possibleColors = colors.filter(color => canUseColor(currentMapIndex, index, color));
          if (possibleColors.length > 0) {
            newMaps[currentMapIndex].regions[index] = possibleColors[Math.floor(Math.random() * possibleColors.length)];
          }
        }
      });

    setMaps(newMaps);
    setHintMessage('Partial graph colored.');
    setShowHint(true);

    logAction('partial_solution'); // Log the partial solution action
  };

  const generateRandomMap = () => {
    const newIndex = Math.floor(Math.random() * maps.length);
    setCurrentMapIndex(newIndex);
    handleReset();
  };

  const closeModal = () => {
    setShowModal(false);
    setShowHint(false);
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/'); // Redirect to the home page
  };

  const handleAnalytics = () => {
    navigate('/analytics-dashboard'); // Redirect to the analytics dashboard
  };

  return (
    <div className={styles.app}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <button className={styles.navbarAnalytics} onClick={handleAnalytics}>Analytics</button>
        <button className={styles.navbarLogout} onClick={handleLogout}>Logout</button>
      </nav>
      <div className={styles.timer}>Time Remaining: {timer} seconds</div>
      <div className={styles.gameContainer}>
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          {maps[currentMapIndex].paths.map((path, index) => (
            <path key={index} d={path} fill={maps[currentMapIndex].regions[index] || '#DDDDDD'} stroke="#000" strokeWidth="1" onClick={() => handleRegionColor(index)} />
          ))}
        </svg>
        <div className={styles.colorControls}>
          {colors.map(color => (
            <button key={color} className={styles.actionBtn} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)}>{colorNames[color]}</button>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={generateRandomMap} className={styles.actionBtn}>Generate Map</button>
        <button onClick={handleSubmit} className={styles.actionBtn}>Submit</button>
        <button onClick={handleReset} className={styles.actionBtn}>Reset</button>
        <button onClick={handleHint} className={styles.actionBtn}>Hint</button>
        <button onClick={handleSolution} className={styles.actionBtn}>Solution</button>
        <button onClick={handlePartialSolution} className={styles.actionBtn}>Partial Solution</button>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
      {showHint && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <p>{hintMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColoringGame;
