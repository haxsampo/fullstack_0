import React from 'react';

const Header = (props) => {
    return(
        <>
        <h1>
            {props.course.name}
        </h1>
        </>
    )
}
const Part = (props) => {
    return(
        <>
            {props.name} {props.exercises}
        </>
    )
}

const Content = (props) => {
    return (
       <div>           
            <ul>
              {props.parts.map(obj => 
                <li key={obj.id}>
                  <Part name={obj.name} exercises={obj.exercises}/>
                </li>
                )}
            </ul>
       </div>
       
    )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course} /> 
      <Content parts={props.course.parts} /> 
      <Total  parts={props.course.parts}/>
    </>
  )
}

//ebin benis
const Total = ({ parts }) => 
  parts.reduce( (summa, kurssi) => summa + kurssi.exercises,0); 

  export default Course