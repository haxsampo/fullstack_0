import React from 'react'
import ReactDOM from 'react-dom'

//header content total
const Header = (props) => {
    return(
        <>
        <h1>
            {props.head}
        </h1>
        </>
    )
}

const Part = (props) => {
    return(
        <>
            {props.text} {props.number}
        </>
    )
}

const Content = (props) => {
    return (
       <div>
            <p>{props.parts[0].name} {props.parts[0].exercises}</p>
            <p>{props.parts[1].name} {props.parts[1].exercises}</p>
            <p>{props.parts[2].name} {props.parts[2].exercises}</p>
       </div>
    )
}

const Total = (props) => {
    return(
        <>
            Number of exercises  {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }


  return (
    <div>
      <Header head={course.name}/>
      <Content parts={course.parts} />      
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))