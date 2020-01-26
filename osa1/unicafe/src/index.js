import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {  
    return(
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}


const StatisticsLine = ({text, value}) => <><td>{text}</td> <td>{value}</td></>


const Statistics = (props) => {
    if (props.nice + props.neutral + props.notNice === 0) {
        return(
            <>No data yet</>
        )
    }
    return(
    <>
    <tr><StatisticsLine text={'Nice '} value={props.nice}/> </tr>
    <tr><StatisticsLine text={'Neutral '} value={props.neutral}/> </tr>
    <tr><StatisticsLine text={'Not nice '} value={props.notNice}/></tr>
    <tr><StatisticsLine text={'Total '} value={props.neutral + props.nice + props.notNice}/> </tr>
    <tr><StatisticsLine text={'Average '} value={(props.nice * 1 + props.notNice * -1) / (props.nice + props.neutral + props.notNice)}/> </tr>
    <tr><StatisticsLine text={'Positive % '} value={props.nice / (props.nice + props.neutral + props.notNice)}/> </tr>
    </>
    )
}

const ManyButtons = (props) => {
    return(
        <>
            <Button handleClick={props.handleClickNice} text={' Add nice'}/>
            <Button handleClick={props.handleClickNeutral} text={' Add neutral'}/>
            <Button handleClick={props.handleClickNotNice} text={' Add not-nice'}/>
        </>
    )
}


const App = props => {
    const [nice, setNice] = useState(0)
    const [notNice, setNot] = useState(0)
    const [neutral, setNeutral] = useState(0)

    const addNice = () => setNice(nice + 1)
    const addNot = () => setNot(notNice + 1)
    const addNeutral = () => setNeutral(neutral + 1)

    
    return (
    <div>
        <h1>give feedback</h1>
        <ManyButtons handleClickNeutral={addNeutral} handleClickNice={addNice} handleClickNotNice={addNot} />
        <h2>statistics</h2>
        <table>
            <Statistics nice={nice} neutral={neutral} notNice={notNice}/>
        </table>
    </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));


