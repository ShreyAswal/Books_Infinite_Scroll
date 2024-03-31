// import React from 'react'
import { useState } from 'react'
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
      {bookTitles.map(title => {return <div key={title}>{title}</div>})}
      <h1>{loading && "Loading..."}</h1>
      <h1>{error && "error..."}</h1>
    </div>
  )
}

export default App
