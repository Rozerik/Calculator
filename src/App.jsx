import { useState} from 'react'
import './App.css'
import Header from './Components/Header'
import Buttons from './Components/ButtonsComponent'

function App() {

  const [lowerNumber, setLowerNumber] = useState('0')
  const [upperNumber, setUpperNumber] = useState('0')
  const [upperLabel, setUpperLabel] = useState('')

  return (
    <>
      <div className='container'>

        <Header currentValue={lowerNumber} savedValue={upperLabel}/>

        <Buttons
          lowerNumber={lowerNumber}
          upperNumber={upperNumber}
          setLowerNumber={setLowerNumber}
          setUpperNumber={setUpperNumber}
          upperLabel={upperLabel}
          setUpperLabel={setUpperLabel}
        />

      </div>
    </>
  )
}

export default App
