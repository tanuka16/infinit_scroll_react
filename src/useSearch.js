import {useEffect, useState} from 'react';
import axios from 'axios';

function useSearch(query, pageNumber) {

  useEffect(() => {
    axios({
      method: 'Get',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber}
    }).then(res => {
      console.log(res.data)
    })

  }, [query, pageNumber])

  return null



}
export default useSearch;
