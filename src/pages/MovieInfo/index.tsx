import React, {useState, useEffect} from 'react';
import api from '../../services/Api';
import Header from '../../Components/Header';
import FavoriteList from '../../Components/FavoriteList';
import Loading, {MovieCard, Title} from './styles';
import Container from '../Home/styles';
import IMovies from '../../services/Interfaces';
import { useRouteMatch, Link } from 'react-router-dom';
import {FiArrowLeft, FiSmile} from 'react-icons/fi';
import { BsHeartFill, BsInfoCircleFill} from 'react-icons/bs';
import Footer from '../../Components/Footer';


interface MovieParams {
    id: string,
}

const MovieInfo: React.FC = () => {
    const { params } = useRouteMatch<MovieParams>();
    const key = '3d7bb86094b230337c40284f8ea62cec';
    const [movie, setMovie] = useState<IMovies>();
    const [loading, setLoading] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number[]>(() => {
        const storagedIdsMovies = localStorage.getItem(
            '@MovieFavorite:ids',
        );
        if (storagedIdsMovies) {
            return JSON.parse(storagedIdsMovies)
        }
     return [] });

     //Inicializa o state verificando se ja tem algum favorite movie salvo.
     const [favMovies, setFavMovies] = useState<IMovies[]>(() => {
        const storagedFavMovies = localStorage.getItem(
            '@MovieFavorite:movies',
        );

        if (storagedFavMovies) {
            return JSON.parse(storagedFavMovies);
        }
        return [];
    });
    //Salva no browsers os favorites movies toda vez que for alterado o state.
    useEffect(() => {
        localStorage.setItem('@MovieFavorite:movies', JSON.stringify(favMovies));
    }, [favMovies]);

    useEffect(() => {
        localStorage.setItem('@MovieFavorite:ids', JSON.stringify(selectedMovieId));
    }, [selectedMovieId]);


    // Pega o id do filme passado como parametro, e busca o filme na api.
    useEffect(() => {
        setLoading(true);
        async function loadMovieDetails() {
            const response = (await api.get(`movie/${params.id}?api_key=${key}`)).data
            setMovie(response);
            setLoading(false);
        }

        loadMovieDetails();
    }, [params]);

    function removeFavorites(id: number) {
        const removeFavoriteMovie = favMovies.filter(favMovie => favMovie.id !== id);
        const removeSelectedMovieId = selectedMovieId.filter(movieId => movieId !== id);
        setSelectedMovieId(removeSelectedMovieId);
        setFavMovies(removeFavoriteMovie);
    }

    // Aqui e um estado de loading caso o filme ainda nao tenha carregado.
    if(loading === true) {
        return (
        <>
          <Header/>
          <FavoriteList title='MY FAVORITES MOVIES'>
                <Container>
                {favMovies.map(movie => 
                <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='info'> <BsInfoCircleFill size={20}/> </Link>
                        <a className='heart' ><BsHeartFill onClick={() => removeFavorites(movie.id)} size={20}/></a>
                        <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} alt= {movie.title}/>
                    </div>)}  
                </Container>
                </FavoriteList>
            <Title>  MOVIE INFO  </Title>
            <MovieCard>
              <Loading/>
            </MovieCard>
            <Footer/>
        </>); 
      }
    // Retorna um card com mais detalhes do filme
    return(
        <> 
            <Header/>
            <FavoriteList title='MY FAVORITES MOVIES'>
                <Container>
                {favMovies.map(movie => 
                <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='info'> <BsInfoCircleFill size={20}/> </Link>
                        <a className='heart'><BsHeartFill onClick={() => removeFavorites(movie.id)} size={20}/></a>
                        <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} alt= {movie.title}/>
                    </div>)}  
                </Container>
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
            <Footer/>
        </> 
    )
}

export default MovieInfo;