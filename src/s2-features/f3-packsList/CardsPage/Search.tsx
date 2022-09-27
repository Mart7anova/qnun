import React from 'react';
import { SearchInput } from 's1-main/m1-ui/common/c1-components/SearchInput/SearchInput';
import {setSearchByCardsNameFilter} from '../../../s1-main/m2-bll/reducers/cards-reducer';

export const Search = () => {

    return (
        <div>
            <h3>Search</h3>
            <SearchInput setSearch={setSearchByCardsNameFilter}/>
        </div>
    );
};
