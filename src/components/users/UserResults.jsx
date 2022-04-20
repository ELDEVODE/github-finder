import { useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResults() {
  const{users,loading,fetchUsers} = useContext(GithubContext)

  useEffect(() => {
    fetchUsers();
  }, []);

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
