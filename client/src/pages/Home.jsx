import React from 'react';
// import { useNavigate } from 'react-router-dom';

const Home = () => {

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Handle case where user data might not be available
  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.profileImage} alt="profile image" />
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Home;
