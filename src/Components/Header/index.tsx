import React from 'react';
import Clapper from '../../assets/clapper.png';
import HeaderStyle from './styles';

const Header: React.FC = () => {

    return(
        <>
            <HeaderStyle>
                <table>
                    <tbody>
                        <tr>
                            <td><img src={Clapper} alt="clapper"/></td>
                            <td className='title'>MY MOVIE LIST</td>
                        </tr>
                    </tbody>
                </table>   
            </HeaderStyle>
        </>
    )

}

export default Header;