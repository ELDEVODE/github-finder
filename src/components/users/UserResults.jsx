import { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setloading(false);
  };

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>
            <UserItem key={user.id} user={user} />
          </h3>
        ))}
      </div>
    );
  } else {
    return (
      <Spinner className="flex justify-center text-5xl font-bold">
        Loading...
      </Spinner>
    );
  }
}
export default UserResults;
