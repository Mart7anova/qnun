import React from 'react';
import {PATH} from '../../../u1-Route/Variables/routeVariables';
import style from './LinkBackTo.module.scss'
import arrow from '../../c3-image/photo/arrow.png';
import {Link} from 'react-router-dom';

type PropsType={
    link: PATH
}

export const LinkBackTo = ({link}:PropsType) => {
    return (
        <Link to={link} className={style.link}>
            <img src={arrow} alt={'arrow'} className={style.arrowImg}/>
            <span className={style.textLink}>Back to Packs List</span>
        </Link>
    );
};
