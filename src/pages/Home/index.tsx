import React, {useState, useEffect} from 'react';
import api from '../../services/Api';
import Header from '../../Components/Header';
import FavoriteList from '../../Components/FavoriteList';
import IMovies from '../../services/Interfaces';
import Container from './styles';
import {BsHeart, BsHeartFill, BsInfoCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';



const Home: React.FC = () => {
    // Minha key para acessar a api.
    const key = '3d7bb86094b230337c40284f8ea62cec';
    const [movies, setMovies] = useState<IMovies[]>([]);
    
    const [selectedMovieId, setSelectedMovieId] = useState<number[]>(() => {
        const storagedIdsMovies = localStorage.getItem(
            '@MovieFavorite:ids',
        );
        if (storagedIdsMovies) {
            return JSON.parse(storagedIdsMovies)
        }
     return [] });
    // Define o valor inicial como A para gerar as primeiras lista de filmes.
    const [searchMovie, setSearchMovie] = useState('a'); 
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
    
    useEffect(() => {
        if(searchMovie === '') {
            setSearchMovie('a');
        }
       loadMovies();
   }, [searchMovie]);

   // Só carrega os filmes que tiverem as poster images.
   async function loadMovies() {
       const response: Array<IMovies> = await (await api.get(`search/movie?query=${searchMovie}&api_key=${key}`)).data.results;
       const movieWithPoster: Array<IMovies> = await response.filter(movieWithPoster => movieWithPoster.poster_path !== null);
       console.log(movieWithPoster);
       setMovies([...movieWithPoster]);
   }
   // Adiciona filmes nos favoritos e remove caso eles ja estejam.
   function handleAddFavorites(id: number) {
    const alreadyFavorite = favMovies.findIndex(alrdFav => alrdFav.id === id);
    if(alreadyFavorite >= 0) {
        const removeFavoriteMovie = favMovies.filter(favMovie => favMovie.id !== id);
        const removeSelectedMovieId = selectedMovieId.filter(movieId => movieId !== id);
        setSelectedMovieId(removeSelectedMovieId);
        setFavMovies(removeFavoriteMovie);
    } else {
        api.get(`movie/${id}?api_key=${key}`).then(response => {
            console.log(response.data)
            setFavMovies([...favMovies, response.data]);
            setSelectedMovieId([...selectedMovieId, id]);
        })
        
    }
    
   }

    return(
        <>
            <Header/>
            <FavoriteList title='MY FAVORITES MOVIES' title2='MOVIES'>
            <Container>
            {favMovies.map(movie => 
                <div key={movie.id}>
                        <Link to={`/movie/${movie.id}`} className='info'> <BsInfoCircleFill size={20}/> </Link>
                        <a className='heart'><BsHeartFill onClick={() => handleAddFavorites(movie.id)} size={20}/></a>
                        <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} alt= {movie.title}/>
                    </div>)}  
            </Container>
            </FavoriteList>

            <Container>
                <form>
                    <input
                    type='name'
                    id='name'
                    name='name'
                    onChange={e => setSearchMovie(e.target.value)}
                    placeholder="Digite o Nome do filme"
                    />
                </form>
            </Container>

            <Container >
                {movies.map(movie => 
                       <div key={movie.id}>
                            <Link to={`/movie/${movie.id}`} className='info'> <BsInfoCircleFill size={20}/> </Link>
                            <a className='heart'>
                                {selectedMovieId.includes(movie.id) ? 
                                <BsHeartFill onClick={() => handleAddFavorites(movie.id)} size={20}/> 
                                :
                                <BsHeart onClick={() => handleAddFavorites(movie.id)} size={20}/>
                                } 
                            </a>
                            <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} alt= {movie.title}/>
                       </div>       
                )}
            </Container>

           
        </>
    )
}

export default Home;