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
    user: {},
    repos: [],
    loading: false,
  };

  // Alternative for set State
  const [state, dispatch] = useReducer(githubReducer, initailState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
