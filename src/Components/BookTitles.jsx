import { useEffect, useState } from 'react';
import axios from 'axios';


function useBookTitles(input,pageNumber) {

    const [bookTitles,setBookTitles] = useState('');

    useEffect(()=>{
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
                setBookTitles(response.data.docs.map((book,i) => {
                    return (<p key={i}>{book.title}</p>)
                }))
                // console.log(response);
            }
        ).catch(error => {
            if(axios.isCancel(error)) return
            // console.log(error)
        })
        return () => cancel();
    },[input,pageNumber])

    
  return (
    <div>
      <p>{bookTitles}</p>
    </div>
  )
}


export default useBookTitles
