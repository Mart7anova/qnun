import React from 'react';

type PropsType = {
    img: string
    alt: string
    onClick?: () => void
}

export const Icon = ({img, alt, onClick}: PropsType) => {

    return (
        <img src={img} alt={alt}
             style={{cursor: 'pointer'}}
             onClick={onClick}/>
    );
};
