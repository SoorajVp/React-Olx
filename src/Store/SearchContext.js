import { useState, createContext } from "react";

export const SearchContext = createContext();

const SearchItems = ({children}) => {
    const [ searchValue, setSearchValue ] = useState("");

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchItems;