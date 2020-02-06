import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import addressService from './services/address'



const Field = ({ onUpdate, value, inputText }) => (
    <div>
        {inputText} <input
            value={value}
            onChange={onUpdate}
        />
    </div>
)

const NumberComp = ({ fields, addName }) => (
    <form onSubmit={addName}>
        {fields.map( f => <Field key={f.key} onUpdate={f.onUpdate} value={f.value} inputText={f.inputText} />)}
        <div>
            <button type="submit">add</button>
        </div>
    </form>

)

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '0700-123123' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [suodatin, setSuodatin] = useState('')

    const addName = (event) => {
        event.preventDefault();
        if (persons.find(person => newName === person.name)) {
            alert(`${newName} ei kelpaa, haista vittu`);
        } else {
            const uusiNimNro = {name: newName, number: newNumber}
            // setPersons(persons.concat( uusiNimNro))
            // setNewName('')
            // setNewNumber('')
            axios
                .post('httP://localhost:3001/persons', uusiNimNro)
                .then(response => {
                    setPersons(persons.concat(uusiNimNro))
                })
        }
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const fields = [
        {
            onUpdate: e => setNewName(e.target.value),
            value: newName,
            inputText: 'Name: ',
            key: 'newNameField'
        },
        {
            onUpdate: e => setNewNumber(e.target.value),
            value: newNumber,
            inputText: 'Number: ',
            key: 'newNumberField'
        }
    ]

    let contactsToShow;
    if (suodatin.length === 0) {
        contactsToShow = persons;
    } else {
        contactsToShow = persons.filter(contact => contact.name.toLowerCase().includes(suodatin.toLowerCase()))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Field onUpdate={e => setSuodatin(e.target.value)} inputText='filter shown with: '/>
            <h2>Lisääppä tässä paskaa</h2>
            <NumberComp fields={fields} addName={addName} />           
            <h2>Numbers</h2>
            {contactsToShow.map(p => <p key={p.name}> {p.name} {p.number} </p>)}
        </div>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById('root'))

export default App