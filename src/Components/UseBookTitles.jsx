import { useEffect, useState } from 'react';
import axios from 'axios';


function UseBookTitles(input,pageNumber) {

    const [bookTitles,setBookTitles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [hasMoreBooks,setHasMoreBooks] = useState(false);

    useEffect(()=>{
        setBookTitles([]);
    },[input])

    useEffect(()=>{
        setLoading(true);
        setError(false);
        let cancel
        axios.get('https://openlibrary.org/search.json',
        {
            params:{
                q : input,
                page : pageNumber,
            },
            cancelToken : new axios.CancelToken(c => cancel = c)
        })
        .then(
            response => {
                console.log(response);
                console.log(response.data.docs.length);
                setBookTitles(prevBookTitles => {
                    return [...new Set([...prevBookTitles,...response.data.docs.map(book => book.title)])]
                })
                setHasMoreBooks(response.data.docs.length > 0);
                // console.log(response);
                setLoading(false);
            }
        ).catch(error => {
            if(axios.isCancel(error)) return
            setError(true);
            console.log(error)
        })
        return () => cancel();
    },[input,pageNumber])

    
  return {bookTitles,loading,error,hasMoreBooks};
}


export default UseBookTitles
