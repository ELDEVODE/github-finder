import { createContext, useReducer } from 'react';
import githubReducer from './GIthubReducer';

const GithubContext = createContext();

// From Env file

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Context Provider
export const GithubProvider = ({ children }) => {
  const initailState = {
    users: [],
    loading: false,
  };

  // Alternative for set State
  const [state, dispatch] = useReducer(githubReducer, initailState);

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    // Get request from github api
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    // data gotten from github api
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS',
    });

  //set loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
