import React  from 'react';
import FavoriteStyle from './styles'
const FavoriteList: React.FC = (props) => {

    return(
        <>
        <FavoriteStyle>
        <hr/>
            <h1>MY FAVORITES MOVIES</h1>
                {props.children}
        <hr className='allMovies'/>
            <h1>MOVIES</h1>
        </FavoriteStyle>
        </>
    )

}

export default FavoriteList;