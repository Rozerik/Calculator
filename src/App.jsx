import Button from './Components/Button'
import { useState } from 'react'
import './App.css'
import Header from './Components/Header'

function App() {

  const [lowerNumber, setLowerNumber] = useState(0)
  const [upperNumber, setUpperNumber] = useState(0)
  const [calculateNumber, setCalculateNumber] = useState(0)
  const [upperLabel, setUpperLabel] = useState('')
  const [opertingSymbol, setOperatingSymbol] = useState('')

  const handleButtonClick = (event) => {
    const functionalValue = event.target.textContent;
    switch(functionalValue) {
      case 'AC':
        setLowerNumber(`0`)
        break
      case '<=':
        setLowerNumber(prev => prev.length === 1 ? 0 : prev.slice(0, -1))
        break
      case '+-':
        setLowerNumber(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev))
        break
      case '%':
        setLowerNumber(prev => (parseFloat(prev) / 100).toString())
        break
      case ',':
        if (!lowerNumber.includes(',') && lowerNumber != 0) {
        setLowerNumber(prev => prev + functionalValue)
        }
        break
      case '+':
        setCalculateNumber(prev => prev + parseFloat(functionalValue))
        setUpperNumber(lowerNumber)
        setLowerNumber(0)
        setUpperLabel(lowerNumber + ' +')
        setOperatingSymbol('+')
        break
      case '-':
        setCalculateNumber(prev => prev - parseFloat(functionalValue))
        setUpperNumber(lowerNumber)
        setLowerNumber(0)
        break
      case '=':

      default:
        setLowerNumber(prev => prev === 0 ? functionalValue : prev + functionalValue)
        break
    }
    
  }

  return (
    <>
      <div className='container'>
        <Header currentValue={lowerNumber} savedValue={upperLabel}/>
        <div className='allButtons'>

          <div className='leftPanel'>
            
            <div className='numberButtons'>
              <Button className="btn btnDel" onClick={handleButtonClick}>AC</Button>
              <Button className="btn btnDel" onClick={handleButtonClick}>+-</Button>
              <Button className="btn btnDel" onClick={handleButtonClick}>%</Button>
              <Button className="btn" onClick={handleButtonClick}>1</Button>
              <Button className="btn" onClick={handleButtonClick}>2</Button>
              <Button className="btn" onClick={handleButtonClick}>3</Button>
              <Button className="btn" onClick={handleButtonClick}>4</Button>
              <Button className="btn" onClick={handleButtonClick}>5</Button>
              <Button className="btn" onClick={handleButtonClick}>6</Button>
              <Button className="btn" onClick={handleButtonClick}>7</Button>
              <Button className="btn" onClick={handleButtonClick}>8</Button>
              <Button className="btn" onClick={handleButtonClick}>9</Button>
              <Button className="btn btnZero" onClick={handleButtonClick}>0</Button>
              <Button className="btn" onClick={handleButtonClick}>,</Button>
            </div>
          </div>
        
          <div className='functionButtons'>
              <Button className="btn btnFunc" onClick={handleButtonClick}>/</Button>
              <Button className="btn btnFunc" onClick={handleButtonClick}>x</Button>
              <Button className="btn btnFunc" onClick={handleButtonClick}>-</Button>
              <Button className="btn btnFunc" onClick={handleButtonClick}>+</Button>
              <Button className="btn btnFunc" onClick={handleButtonClick}>=</Button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
