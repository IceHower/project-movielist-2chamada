import styled from 'styled-components';
import {BsHeart, BsHeartFill} from 'react-icons/bs'

const Container = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;

  .heart {
    position: absolute;
    color: #FF4040;
    transition: opacity 0.2s;
    border: none;
    padding-top: 15px;
    padding-left: 15px;
    transition: 0.3s;
    z-index : 100;
  }
  .info {
    position: absolute;
    color: #FF4040;
    transition: opacity 0.2s;
    border: none;
    padding-top: 15px;
    padding-left: 46px;
    transition: 0.3s;
    z-index : 100;
  }
    img{
        flex:1;
        width: 165px;
        height: 220px;
        transition: 0.3s;
        margin: 10px;
        
      }
    .heart:hover {
        transform: scale(1.1);
    }
    img:hover {
        transform: scale(1.1);
        filter: brightness(40%);
    }
  }

`;


export default Container;