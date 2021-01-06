import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, title }) => {
  return (
    <button onClick={handleClick}>
      {title}
    </button>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const points = useRef(new Array(anecdotes.length).fill(0))

  const getRandomIndex = () => Math.floor(Math.random() * (anecdotes.length - 1))

  const nextAnecdote = () => {
    let index = selected

    // Halutaan eri anekdootti kuin mita on jo esilla
    while (index === selected) {
      index = getRandomIndex()
    }
    console.log("Random index ", index)
    setSelected(index)
  }

  const vote = () => {
    let pointsCopy = [...points.current]
    pointsCopy[selected] += 1
    points.current = [...pointsCopy]

    let index = points.current.indexOf(Math.max(...points.current))
    setMostVoted(index)

    console.log("Points:", points.current)
  }

  const restart = () => {
    setSelected(0)
    setMostVoted(0)
    points.current = new Array(anecdotes.length).fill(0)
  }

  const hasVotes = () => {
    const votes = points.current[selected]
    if(votes === 0) {
      return (
        <p>Does not have votes yet.</p>
      )
    } else {
      return(
        <p>Has {votes} votes.</p>
      )
    }
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      {hasVotes()}
      <Button handleClick={nextAnecdote} title="Next anecdote" />
      <Button handleClick={vote} title="Vote" />
      <Button handleClick={restart} title="Restart" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

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