import React, { createContext } from "react";


interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: SearchProps = {
  search: '',
  setSearch: React.useState,
}

const SearchContext = createContext<SearchProps>(defaultValue);


export default SearchContext;