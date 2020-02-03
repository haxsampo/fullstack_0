import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const Field = ({ onUpdate, value, inputText }) => (
    <div>
        {inputText} <input
            value={value}
            onChange={onUpdate}
        />
    </div>
)

const Country = ({ name, capital, population, languages, flag}) => (
    <div>
        <h2>{name}</h2>
        <p>capital: {capital}</p>
        <p>population: {population}</p>
        <h2>languages</h2>
        <ul>
        {languages.map( l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img src={flag} height='200px' alt='flag' />
    </div>
)

const CountryName = ({name}) => (   
    <p>
        {name}
    </p>
)

const Lands = ({countries}) => {
    return(
    <div>
        {countries.map( c => <Country key={c.numericCode} name={c.name} capital={c.capital} population={c.population} languages={c.languages} flag={c.flag}/> )}
    </div>
    )
}

const ShowButt = ({showCountry, thisCountry}) => {
    console.log(thisCountry)
    return(
        <button onClick={() =>showCountry(thisCountry)}>
            show
        </button>
    )
}


const LandsName = ({countries, showCountry}) => {
    return(
        <div>
            {countries.map( c => 
            <div key={c.numericCode}>
                <CountryName key={c.numericCode} name={c.name}/> 
                <ShowButt showCountry={showCountry} thisCountry={c.name}/>
            </div>)}
       </div> 
    )
}


//if more than 10, show "too many"
//if less than 10, more than 1 show names
//if one show info
const LandsOrNo = ({countriesToShow, showCountry}) => {
    if(countriesToShow.length > 10) {
        return <p>Too many matches, more specs needed</p>
    } else  if(countriesToShow.length <= 10 && countriesToShow.length > 1){
        return <LandsName countries={countriesToShow} showCountry={showCountry} />
    } else {
        return <Lands countries={countriesToShow} />
    }
}


const App = () => {
    const [countries, setCountries] = useState([])
    const [suodatin, setSuodatin] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const showCountry = ({arg}) => {
        return(
            console.log(arg)
        )
    }

    let countriesToShow = countries.filter(country => country.name.toLowerCase().includes(suodatin.toLowerCase()) )

    return (
        <div>
            <Field onUpdate={e => setSuodatin(e.target.value)} inputText='find countries' />
            <LandsOrNo countriesToShow={countriesToShow} showCountry={showCountry} /> 
            <ShowButt showCountry={showCountry} thisCountry={'ebin'}     />      
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

