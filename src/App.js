import React, { useState } from 'react';
import useSearch from './useSearch'

function App() {
  // useState returns a query & a function to set that Query, which'll rerender application
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)


  function handleSearch(e){
    // set our query
    setQuery(e.target.value)
    // set the page back to 1 so if we do a new query, it'll start from pg1, not pg 7 or anything else
    setPageNumber(1)
  }
  const {
    books,
    hasMore,
    loading,
    error
  } = useSearch(query, pageNumber)
  return (
    <>
      <input type="text" onChange={handleSearch}></input>

      {books.map(book =>{
        return <div key={book}> {book} </div>
      })}

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}

export default App;
