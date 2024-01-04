import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMoviesVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        console.log(json);

        const filterData = json.results.filter((video) => video.type == "Trailer");

        // If there is no trailer for current movie then it shows video from exisiting array
        // const trailer = filterData.length == 0 ? filterData[0] : json.results[0];   

        const trailer = filterData[0];
        dispatch(addTrailerVideo(trailer));
        console.log(trailer);
    }

    useEffect(() => {
        getMoviesVideos();
    }, [])

}

export default useMovieTrailer