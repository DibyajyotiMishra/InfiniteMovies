import axios from 'axios';

const baseUrl: string | URL = 'https://api.themoviedb.org/3';
export const imageUrl: string | URL = 'https://image.tmdb.org/t/p/original';
const apiKey: any = process.env.REACT_APP_MOVIE_DB_API_KEY;

export const getMovies = async (page: number, type: 'now_playing' | 'top_rated' | 'popular') => {
  const response = await axios.get(
    `${baseUrl}/movie/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  return response.data;
};