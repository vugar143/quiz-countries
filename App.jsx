import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
// import Quiz from "./assets/components/Quiz"
import './App.css'
// import Country from './assets/components/Country'

function App() {
  const [selectedCountry,setSelectedCountry]=useState({
    name:"",
    flag:"",
  })
  const [life,setLife]=useState(5)
  const [correct,setCorrect]=useState(0)
const [answers,setAnswers]=useState([])
  const [allCountries,setAllCountries]=useState([])
  const getQuestion=(countries=allCountries)=>{
 const selectedIndex=Math.floor(Math.random() * countries.length)
 let temp=[countries[selectedIndex].name.common]
  setSelectedCountry({
    name:countries[selectedIndex].name.common,
    flag:countries[selectedIndex].flags.svg
  })
  for (let i=0;i<3;i++){
    let r=Math.floor(Math.random()*countries.length)
    while(temp.includes(countries[r].name.common)){
      r=Math.floor(Math.random()*countries.length)
    }
    temp.push(countries[r].name.common)
  }
    console.log(temp)
    temp.sort(()=>0.5 - Math.random())
    setAnswers(temp)

  }
  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((a)=>a.json())
    .then((a)=>{
      setAllCountries(a)
    getQuestion(a)
    });
  },[])
  const checkAnswer=(ans,e)=>{
if(ans===selectedCountry.name){
  e.target.style.background="green"
  setCorrect(correct+1)
  console.log("correct")
}
  else{
    let all=[...document.querySelectorAll("ul li")]
    let c=all.find((a)=>a.textContent===selectedCountry.name)
    c.style.background="orange"
    setLife(life-1)
    e.target.style.background="red"
    console.log("wrong")
  }
  setTimeout(() => {
    getQuestion()
  }, 1000);
  }



  return !allCountries.length ? (
    <h1>Loading...</h1>
  ): life >0 ?(
    <>
    <div className='score'>
    <h1>Life:{life}</h1>
    <h1>Correct:{correct}</h1>
    </div>
<section className='quiz'>
<img src={selectedCountry.flag} alt="" />
<ul>
  {answers.map((a)=>(
    <li onClick={(event)=>checkAnswer(a,event)} key={a}>{a}</li>
  ))}
</ul>
</section>
</>
  ):(
    <div>
    <h1>Game Over</h1>
    <h1>Correct Answers : {correct}</h1>
    <button onClick={()=>{
      setLife(5)
      setCorrect(0)
      getQuestion()
    }}>Play Again</button>
    </div>

  )
}

export default App
