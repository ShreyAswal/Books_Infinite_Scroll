// import React from 'react'
import { useState } from 'react'
import './App.css'
import useBookTitles from './Components/BookTitles'

function App() {
  const [input,setInput] = useState("")
  const [pageNumber,setpageNumber] = useState(1);

  useBookTitles(input,pageNumber)

  function handleInput(e){
    setInput(e.target.value)
    setpageNumber(1)
  }

  return (
    <div >
      <h1>Hello world</h1>
      <input value={input} onChange={handleInput}></input>
      {/* <useBookTitles/> */}
      <h1>Loading...</h1>
    </div>
  )
}

export default App
