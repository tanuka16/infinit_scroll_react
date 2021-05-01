import React, { useState, useRef, useCallback } from 'react';
import useSearch from './useSearch'
// useRef is a value that persistes after each render, beacause inside ref every single thing we do, its only stored inside that
function App() {
  // useState returns a query & a function to set that Query, which'll rerender application
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
  } = useSearch(query, pageNumber)

  const observer = useRef()
  // reference to the last element on the list
  const lastBookElementRef = useCallback(node => {
    // console.log(node);
    if(loading) return

    if(observer.current)  observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if(node)  observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e){
    // set our query
    setQuery(e.target.value)
    // set the page back to 1 so if we do a new query, it'll start from pg1, not pg 7 or anything else
    setPageNumber(1)
  }

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>

      {books.map((book, index) =>{

        if(books.length === index + 1){

          return <div ref={lastBookElementRef} key={book}> {book} </div>

        }else{

          return <div key={book}> {book} </div>
        }

      })}

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}

export default App;
