// src/components/misc/MoviesApi.js
import axios from 'axios'
import { config } from '../../Constants'

/**
 * API client for user extras (avatars, settings) and movie-based endpoints.
 * Used by UserSettings and legacy movie components.
 */
export const moviesApi = {
  getUserExtrasMe,
  saveUserExtrasMe,
  // legacy movie methods (no-op until backend supports them):
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  addMovieComment
}

function getUserExtrasMe(token) {
  return instance.get('/api/userextras/me', {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function saveUserExtrasMe(token, userExtra) {
  return instance.post('/api/userextras/me', userExtra, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// Legacy movie API stubs; return 404 by default until BE is implemented
function getMovies() {
  return instance.get('/api/movies')
}

function getMovie(imdbId) {
  return instance.get(`/api/movies/${imdbId}`)
}

function saveMovie(movie, token) {
  return instance.post('/api/movies', movie, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function deleteMovie(imdbId, token) {
  return instance.delete(`/api/movies/${imdbId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function addMovieComment(imdbId, comment, token) {
  return instance.post(`/api/movies/${imdbId}/comments`, comment, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios instance
const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      return { status: 404 }
    }
    return Promise.reject(error)
  }
)

function bearerAuth(token) {
  return `Bearer ${token}`
}
