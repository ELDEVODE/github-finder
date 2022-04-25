import axios from 'axios'
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  // Get request from github api
  const response = await github.get(`/search/users?${params}`)

  return response.data.items
};



// Get user and repos

export const getUserAndRepos = async(login) => {
  const [user,repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])

  return {user:user.data,repos: repos.data}
}