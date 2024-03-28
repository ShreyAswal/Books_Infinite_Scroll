import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lines, setlines] = useState(8);
  const [focus, setfocus] = useState(0);
  const [curr, setCurr] = useState([]);
  const [loading, setloading] = useState(false);

  window.addEventListener('scroll', () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
    // console.log(scrollable)
    // console.log(scrolled)
    if (scrolled == scrollable) {
      setloading(true);
      // if (lines + 8 > 22) {
      //   setlines(8);
      // } else {
        setlines(lines + 8);
      // }
    }
  });

  useEffect(() => {
    axios(`https://api.github.com/repositories/1300192/issues`)
      .then((data) => {
        const newData = data.data.filter((each,i) => {
            if (i < lines && i >= lines - 8) {
              return (                  
                  each.title
              );
            }
          })
        setCurr([...curr,...newData])   
 
        
        setloading(false);

        const lastElement = document.getElementById(focus+7);     
        console.log(focus)
        console.log(lastElement)
        if(lastElement){
          console.log(focus)
          lastElement.scrollIntoView({behavior:'smooth',block:'start'})
          setfocus(focus+8)
        }


      })
      .catch((error) => {
        console.log(error);
      });

      return ()=> window.removeEventListener('scroll',window)
  }, [lines]);



  return (
    <>
      <div>
        {!loading &&
          curr.map((each, i) => {
            // console.log(each);
            // setid(id+1);
            return <h1 key={i} id={i}>{each.title}</h1>;
          })}
        {loading && <h1>Loading...</h1>}
      </div>
    </>
  );
}

export default App;
