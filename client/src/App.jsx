import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from server when component mounts
    fetch('https://prototype-verceldeployment-server.vercel.app/get')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}, {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
