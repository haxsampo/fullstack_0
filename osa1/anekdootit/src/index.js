import React, { useState } from 'react'
import ReactDOM from 'react-dom'

let indicatorOnce = 0;


function giveRandom(currentArray) {
    return Math.floor(Math.random() * (currentArray.length))
    
}

function highestIndex(arr, selected) {
  arr[selected] += 1
  let retInd = 0
  let highest = arr[0]
  let i = 0
  console.log(arr ,' olen highestIndexisssä')
  for(i = 0; i < arr.length; i++) {
    if (arr[i] > highest) {
      highest = arr[i]
      retInd = i
    } 
  }
  console.log('palautettava retInd: ', retInd)
  return retInd
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const VoteDisplay = ({value, text}) => (
  <>{value} {text}</>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteValues, setVote] = useState([]);
  const [voteShow, changeShow] = useState(0);
  const [highest, setHighest] = useState(0);
 
  if (indicatorOnce === 0) {
    const copy = new Array(7).join('0').split('').map(parseFloat)
    setVote(copy)
    indicatorOnce = 1;
  }

  function changeHighest() {
    let i = highestIndex(voteValues, selected);
    setHighest(i)
    console.log(highest)
  }

  function setRandom() {
    let i = giveRandom(anecdotes)
    setSelected(selected - selected + i)
    changeShow(voteValues[i])
    console.log(voteValues)
  }

  function ebin() {
    const copy = [...voteValues]
    copy[selected] += 1
    changeShow(copy[selected])
    setVote(copy)
    changeHighest()
  }
  
  return (
    <div>
      <Button handleClick={setRandom} text={'Random'}/>
      <Button handleClick={ebin} text={'Vote'}/>
      <p><VoteDisplay value={'Voteamount: '} text={voteShow}/></p>
      <p>{props.anecdotes[selected]}    </p>
      <p>Most votes:</p>
      <p><VoteDisplay value={' '} text={anecdotes[highest]}/> </p>
      
    </div>
  )
}
//<p><VoteDisplay value={'most voted: '} text={voteValues[highest]}/> </p>

function vote() {
  console.log(votes)
}

let votes = new Array(7).join('0').split('').map(parseFloat)

//6
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)