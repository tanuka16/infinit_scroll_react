import {useEffect, useState} from 'react';
import axios from 'axios';

function useSearch(query, pageNumber) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)


  useEffect(()=>{
    setBooks([])
  },[query])


  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel

    axios({

      method: 'Get',

      url: 'http://openlibrary.org/search.json',

      params: { q: query, page: pageNumber},

      cancelToken: new axios.CancelToken(c => cancel = c)

    }).then(res => {

      setBooks(prevBooks => {
        // combine old books with new books & convert it to a set to remove duplicates & convert it
        // back to an array to do the normal arr manipulations (looping, mapping etc)
        return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
      })
      // no more data, so no books to return
      hasMore(res.data.docs.length > 0)
      // not loading more data so set to false
      setLoading(false)
      console.log(res.data)

    }).catch(e => {

      if(axios.isCancel(e))   return
      setError(true)

    })

    // cancel a req every time it recalls a use effect
    return () => cancel()

  }, [query, pageNumber])
  // returning all the states from the hook to use it inside of our app
  return {loading, error, books, hasMore}



}
export default useSearch;
