import styled from 'styled-components';

const Loading = styled.div`
  text-align: center;
  border: 10px solid #6b6b6b;
  border-radius: 50%;
  border-top: 10px solid #FFF;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
  @-webkit-keyframes spin {
   0% { -webkit-transform: rotate(0deg); }
   100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export const Title = styled.h1`
  color: #fff;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  display: flex;
  align-content: center;
  justify-content: center;
`;
export const MovieCard = styled.div `
  color: #fff;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  display: flex;
  align-content: center;
  justify-content: center;
  p {
    padding-right: 10px;
  }
  .back_page {
    color: #fff;
    width: 24px;
    border-radius: 4.75% / 3.5%;
    transition: 0.2s;
    margin-left: 3px
  }
  img {
    width: 155px;
    height: 200px;
    margin-top: 50px;
    margin-right: 10px;
    border-radius: 10%;
  }
  .back_page:hover {
    transform: translateX(10px);
  }
  h4{
    text-align: center;
    margin-top: 65px;
  }
  .card {
      display: flex;
      width: 580px;
      height: 365px auto;
      box-shadow: 0px 4px 12px 0px #404040;
      margin-top: 60px;
      background-color: #404040;
    }
  .smile {
    color: #09c400;
    margin-top: 130px;
    margin-left: 290px;
  }
  .popularity {
    padding-left: 5px;
  }
`;

export default Loading;