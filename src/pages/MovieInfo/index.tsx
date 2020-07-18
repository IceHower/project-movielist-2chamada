import React, {useState, useEffect} from 'react';
import api from '../../services/Api';
import Header from '../../Components/Header';
import FavoriteList from '../../Components/FavoriteList';
import Loading, {MovieCard, Title} from './styles';
import IMovies from '../../services/Interfaces';
import { useRouteMatch, Link } from 'react-router-dom';
import {FiArrowLeft, FiSmile} from 'react-icons/fi';


interface MovieParams {
    id: string,
}

const MovieInfo: React.FC = () => {
    const { params } = useRouteMatch<MovieParams>();
    const key = '3d7bb86094b230337c40284f8ea62cec';
    const [movie, setMovie] = useState<IMovies>();
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        async function loadMovieDetails() {
            const response = (await api.get(`movie/${params.id}?api_key=${key}`)).data
            setMovie(response);
            setLoading(false);
        }

        loadMovieDetails();
    }, [params]);
    
    return(
        <> 
            <Header/>
                <FavoriteList title='MY FAVORITE MOVIES'>
                </FavoriteList>
            <Title>  MOVIE INFO  </Title>
            <MovieCard>
            
            <div className='card'>
                 <Link className="back_page" to={'/'}>
                    <FiArrowLeft size={25} />
                 </Link>
                <img src={'https://image.tmdb.org/t/p/w185' + movie?.poster_path} alt= {movie?.title}/>
                <div className="container">
                    <h4><b>{movie?.title}</b></h4>
                    <p><b>Summary</b>: {movie?.overview}</p>
                   <a title='popularity - nº likes'>
                       <FiSmile className='smile' size={22}/>
                       <b className='popularity'>{movie?.popularity}</b>   
                    </a>
                </div>
            </div>
            </MovieCard>
        </> 
    )
}

export default MovieInfo;