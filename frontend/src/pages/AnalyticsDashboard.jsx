// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getAuth } from "firebase/auth"; // Ensure this is properly configured in your Firebase setup
// import styles from '../styles/AnalyticsDashboard.module.css';

// const AnalyticsDashboard = () => {
//   const [summary, setSummary] = useState({});

//   const fetchSummary = async () => {
//     // Retrieve the currently authenticated user
//     const auth = getAuth();
//     const currentUser = auth.currentUser;

//     // Check if the user is authenticated
//     if (!currentUser) {
//       console.error('No user is authenticated.');
//       return;
//     }

//     // Extract the user's ID
//     const userId = currentUser.uid;

//     try {
//       // Make an API request to the backend, passing the user ID in the query
//       const response = await axios.get(`http://127.0.0.1:5000/api/get-summary?user_id=${userId}`);
//       if (response.data.status === 'success') {
//         setSummary(response.data.summary);
//       } else {
//         console.error('Failed to fetch summary:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching summary:', error.message);
//     }
//   };

//   // Use `useEffect` to fetch the data once the component mounts
//   useEffect(() => {
//     fetchSummary(); // Fetch summary for the current user
//   }, []);

//   // Display the analytics summary
//   return (
//     <div className={styles.dashboard}>
//       <h2>Analytics Summary</h2>
//       <p>Total Actions: {summary.total_actions || 0}</p>
//       <p>Color Changes: {summary.color_changes || 0}</p>
//       <p>Hints Requested: {summary.hints_requested || 0}</p>
//     </div>
//   );
// }

// export default AnalyticsDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from "firebase/auth";
import styles from '../styles/AnalyticsDashboard.module.css';

const AnalyticsDashboard = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const response = await axios.get(`http://3.138.102.26/api/get-summary`, { params: { user_id: currentUser.uid }});
          if (response.data.status === 'success') {
            setSummary(response.data.summary);
          } else {
            console.error('Failed to fetch summary:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching summary:', error.message);
        }
      } else {
        console.error('No user is authenticated.');
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Analytics Summary</h2>
      <p>Total Actions: {summary.total_actions || 0}</p>
      <p>Color Changes: {summary.color_changes || 0}</p>
      <p>Hints Requested: {summary.hints_requested || 0}</p>
    </div>
  );
}

export default AnalyticsDashboard;

