import { useState, useEffect } from "react";
import Button from "./Button";

export default function Buttons({ lowerNumber, upperNumber, setLowerNumber, setUpperNumber, upperLabel, setUpperLabel }) {

      const [ACbutton, setACButton] = useState(true)

      const buttons = [
      { symbol: '±', className: 'btn btnDel' },
      { symbol: '%', className: 'btn btnDel' },
      { symbol: '/', className: 'btn btnFunc' },
      { symbol: '1', className: 'btn' },
      { symbol: '2', className: 'btn' },
      { symbol: '3', className: 'btn' },
      { symbol: 'x', className: 'btn btnFunc' },
      { symbol: '4', className: 'btn' },
      { symbol: '5', className: 'btn' },
      { symbol: '6', className: 'btn' },
      { symbol: '-', className: 'btn btnFunc' },
      { symbol: '7', className: 'btn' },
      { symbol: '8', className: 'btn' },
      { symbol: '9', className: 'btn' },
      { symbol: '+', className: 'btn btnFunc' },
      { symbol: '0', className: 'btn btnZero' },
      { symbol: ',', className: 'btn' },
      { symbol: '=', className: 'btn btnFunc' },
    ];

      useEffect(() =>{
      if (lowerNumber === '0') setACButton(true)
      }, [lowerNumber])

     const funcButtonsHandler = (mark) => {
        setUpperNumber(lowerNumber)
        setLowerNumber('0')
        setUpperLabel(lowerNumber + ` ${mark}`)
      }
    
      const resetLabelandUpperNumber = (symbol) => {
        setUpperLabel(`${upperNumber} ${symbol} ${lowerNumber} =`)
        setUpperNumber('0')
        setACButton(true)
      }

    const handleButtonClick = (event) => {
    const functionalValue = event.target.textContent;
    switch(functionalValue) {

      case 'AC':
        setLowerNumber(`0`)
        setUpperNumber('0')
        setUpperLabel('')
        break

      case '⟵':
        setLowerNumber(prev => prev.length === 1 ? '0' : prev.slice(0, -1))
        if ((lowerNumber.length === 2 && lowerNumber.includes('-')) || (
        lowerNumber.length === 3 && lowerNumber[1] === `0` && lowerNumber.includes(`-`))) 
        setLowerNumber('0')
        break

      case '±':
        if (lowerNumber === '0') break
        setLowerNumber(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev))
        break

      case '%':
        setLowerNumber(prev => (parseFloat(prev) / 100).toString())
        break

      case ',':
        if (!lowerNumber.includes('.')) {
        setLowerNumber(prev => prev + '.')
        }
        break

      case '+':
      case '-':
      case 'x':
      case '/':
        funcButtonsHandler(functionalValue)
        setACButton(false)
        break

      //ОПЕРАЦИЯ РАВЕНСТВА
      case '=':
        if (upperLabel === '') break
        switch(upperLabel.slice(-1)) {
          case '+':
            setLowerNumber(prev => (parseFloat(upperNumber) + parseFloat(prev)).toString())
            resetLabelandUpperNumber(`+`)
          break

          case '-':
            setLowerNumber(prev => (parseFloat(upperNumber) - parseFloat(prev)).toString())
            resetLabelandUpperNumber(`-`)
          break

          case 'x':
            setLowerNumber(prev => (parseFloat(upperNumber) * parseFloat(prev)).toString())
            resetLabelandUpperNumber(`x`)
          break

          case '/':
            setLowerNumber(prev => {
              const divideResult = parseFloat(upperNumber) / parseFloat(prev)

              if (Number.isInteger(divideResult)) return divideResult.toString()
              
              return divideResult.toFixed(3).replace(/\.?0+$/, '')
            })
            resetLabelandUpperNumber(`/`)
          break

        }
        break
      default:
        if (lowerNumber.length < 15) {
          let newLowerValue;
          if (lowerNumber === '0' || lowerNumber === 'NaN' || lowerNumber === 'Infinity') {
            newLowerValue = functionalValue;
          } else {
            newLowerValue = lowerNumber + functionalValue;
          }

          if (newLowerValue !== '0') {
          setACButton(false);
          }

          setLowerNumber(newLowerValue);
        }
      break
    }
    
  }

    return (
        <div className='allButtons'>

          {/*Вывод кнопки АС - не подходит под вывод через .map*/}
            <Button className="btn btnDel" onClick={handleButtonClick}>
              {(ACbutton && 'AC')}
              {(!ACbutton && '⟵')}
            </Button>

            {/*Вывод кнопок*/}
            {buttons.map(({ symbol, className }) => (
            <Button
              key={symbol}
              className={className}
              onClick={handleButtonClick}
            >
              {symbol}
            </Button>
          ))}

        </div>
    )
}