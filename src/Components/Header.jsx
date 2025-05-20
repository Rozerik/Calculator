export default function Header({ currentValue, savedValue }) {
    return (
        <header>
                  <span
                    id="upperCalculatinNumber"
                    className='upperLabel'>
                    {savedValue}
                  </span>
                  
                  <span
                  id="calculatingNumber"
                  className='mainLabel'>
                  {currentValue}
                  </span>
                </header>
    )
}