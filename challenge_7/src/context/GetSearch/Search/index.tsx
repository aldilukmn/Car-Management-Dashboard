import React, { useState } from 'react'
import { SearchContext } from '..'

interface SearchProps {
  children: React.ReactNode;
}

function SearchProvider({children}: SearchProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <SearchContext.Provider value={{search, setSearch}}>
        {children}
      </SearchContext.Provider>
    </>
  )
}


export default SearchProvider