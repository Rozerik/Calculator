import { useState} from 'react'
import './styles.css'
import Header from './Components/Header'
import ButtonsComponent from './Components/ButtonsComponent'

function App() {

  const [lowerNumber, setLowerNumber] = useState('0')
  const [upperNumber, setUpperNumber] = useState('0')
  const [upperLabel, setUpperLabel] = useState('')

  return (
    <>
    <div className='wrapper'>
      <img className='tableImg' src="src\assets\table5.jpg" alt="table background img" />
            <div className='container'>
              <img className='phoneImg' src="src\assets\iphone.svg" alt="iphone background picture"/>
              <div>
                    <Header currentValue={lowerNumber} savedValue={upperLabel}/>
                    <div className='allButtons'>
              <ButtonsComponent
                lowerNumber={lowerNumber}
                upperNumber={upperNumber}
                setLowerNumber={setLowerNumber}
                setUpperNumber={setUpperNumber}
                upperLabel={upperLabel}
                setUpperLabel={setUpperLabel}
              />
              </div>
              </div>
              
              
            </div>
    </div>
          

    </>
  )
}

export default App
