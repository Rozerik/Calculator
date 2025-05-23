import { useState, useEffect } from "react";
import Button from "./Button";

export default function ButtonsComponent({ lowerNumber, upperNumber, setLowerNumber, setUpperNumber, upperLabel, setUpperLabel }) {

    const [ACbutton, setACButton] = useState(true)
    const [operationFinished, setOperationFinished] = useState(false)

    {/*Массив кнопок (кроме "АС" - у нее другая логика, выводится в App.jsx*/}
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

    {/*Хук, контролирующий изменение кнопки очистки. Если в нижнем значении 0 - тогда кнопка должна вернуться в "АС" */}
    useEffect(() =>{
      if (lowerNumber === '0') setACButton(true)
    }, [lowerNumber])

    {/*Функция обработки арифметических кнопок (+, -, *, /) */}
    const funcButtonsHandler = (mark) => {
      setUpperNumber(lowerNumber)
      setLowerNumber('0')
      setUpperLabel(lowerNumber + ` ${mark}`)
    }
    
    {/*Вывод строки в верхний span*/}
    const resetLabelandUpperNumber = (symbol) => {
      setUpperLabel(`${upperNumber} ${symbol} ${lowerNumber} =`)
      setUpperNumber('0')
      setACButton(true)
    }

    {/*В случае, если операция завершена клавишей "=", то верхнее число необходимо очистить от текста при нажатии других кнопок*/}
    const clearUpperLabel = () => {
      if (operationFinished) {
        setUpperLabel('')
        setUpperNumber('0')
        setOperationFinished(false)
      }
    }

    {/*Обработчик нажатия кнопок*/}
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
        clearUpperLabel()
      break

      case '±':
        if (lowerNumber === '0') break
        setLowerNumber(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev))
        clearUpperLabel()
      break

      case '%':
        setLowerNumber(prev => (parseFloat(prev) / 100).toString())
        clearUpperLabel()
      break

      case ',':
        if (!lowerNumber.includes('.')) {
        setLowerNumber(prev => prev + '.')
        clearUpperLabel()
        }
      break

      case '+':
      case '-':
      case 'x':
      case '/':
        funcButtonsHandler(functionalValue)
        setACButton(false)
        setOperationFinished(false)
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
            setLowerNumber(prev => {
              const multiplyResult = parseFloat(upperNumber) * parseFloat(prev)

              if (Number.isInteger(multiplyResult)) return multiplyResult.toString()
              
              return multiplyResult.toFixed(3).replace(/\.?0+$/, '')
            })
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
        setOperationFinished(true)
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

          setLowerNumber(newLowerValue)
          clearUpperLabel()
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