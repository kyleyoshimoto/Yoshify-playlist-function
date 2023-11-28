import React, {useState, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap';

import "./searchBar.css";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

function SearchBar(props) {
    const [searchInput, setSearchInput] = useState('');
    const { onSearch } = props;

    const search = useCallback(() => {
        onSearch(searchInput);
    }, [onSearch, searchInput]);

    return (
        <Container className='Search-bar'>
            <InputGroup ClassName='mb-3' type='text' placeholder='Artist, Title, Album, or More' >
                <SearchSharpIcon className="search-icon" fontSize='large' />
                <FormControl
                    placeholder="Search For Artists, Songs, or Albums"
                    type="input"
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            search()
                        }
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button className="Search-button" onClick={search}>
                        SEARCH
                    </Button>
            </InputGroup>
        </Container>
    )
}

export default SearchBar;