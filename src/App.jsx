// import React from 'react'
import { useState, useRef, useCallback } from 'react'
import './App.css'
import UseBookTitles from './Components/UseBookTitles'

function App() {
  const [input,setInput] = useState("")
  const [pageNumber,setpageNumber] = useState(1);


  const {
    bookTitles,
    loading,
    error,
    hasMoreBooks
  } = UseBookTitles(input,pageNumber)

  //Ref is used to store a value across renders and it will not cause a re-render when the value changes, so we use the useCallBack to update the ref value

  // The ref reffering to the last book title by observing it
  const observer = useRef();

  //CallBack function to update the ref value, here node referes to the div element the ref was passed to while calling lastBookTitleRef.
  const lastBookTitleRef = useCallback(node => {
  // If data is currently being fetched or loaded, return early without doing anything
  if(loading) return;
  // If the observer is already observing a node (the last book title), disconnect it before observing a new node
  if(observer.current) observer.current.disconnect();
  // Setting up the observer to observe the next last book title using .current and creating a new IntersectionObserver
  // The observer callback checks if the last book title is visible and more pages are available to fetch more books
  //Entries refers to all the elements that are being observed by the observer, in our case only one element is being observed(the last bookTitle) 
  observer.current = new IntersectionObserver(entries => {
    //If the last bookTitle is visible(we check using isIntersecting) and more pages are available, we want to increment the pageNumber to fetch more books
    if(entries[0].isIntersecting && hasMoreBooks){
      setpageNumber(prevPageNumber => prevPageNumber + 1);
    }
  })
  // If the ref is attached to a DOM element (the last book title), start observing this node
  if(node) observer.current.observe(node);
  },[loading,hasMoreBooks])
  
  function handleInput(e){
    setInput(e.target.value)
    setpageNumber(1)
  }


  console.log(bookTitles)
  console.log(loading)
  console.log(hasMoreBooks)

  return (
    <div>
      <h1>Search any book!</h1>
      <input value={input} onChange={handleInput} type='text'></input>
      {bookTitles.map((title,index) => {
        if(bookTitles.length === index + 1){
          return <div key={title} ref={lastBookTitleRef}>{title}</div>
        } else {
          return <div key={title}>{title}</div>
        } 
      })}
      <h1>{loading && "Loading..."}</h1>
      <h1>{error && "error..."}</h1>
    </div>
  )
}

export default App
