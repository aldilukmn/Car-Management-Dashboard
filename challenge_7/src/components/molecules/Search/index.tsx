import React, { useContext, useState } from 'react'
import { Button, Input } from '../..'
import { SearchContext } from '../../../context';

function Search() {
  const {setSearch} = useContext(SearchContext);
  const [localSearch, setLocalSearch] = useState<string>('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'search':
        setLocalSearch(value)
      break;
    }
  }

  const handleSearchBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(localSearch);
    setLocalSearch('');
  }

  return (
    <>
      <form onSubmit={handleSearchBtn} className='flex-row-reverse gap-1 hidden sm:flex'>
        <Button name='Search' className='border hover:border-indigo-700 px-2 text-indigo-700 rounded font-semibold focus:outline-none'/>
        <Input placeholder='Search ...' className="focus:border-indigo-700 rounded-md px-2 py-1 border outline-none w-full" name='search' value={localSearch} onChange={handleSearch}/>
      </form>
    </>
  )
}

export default Search