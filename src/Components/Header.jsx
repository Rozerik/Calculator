export default function Header({ currentValue, savedValue}) {

    const maxLength = 8; // После скольки знаков начинать уменьшать
    const maxFontSize = 70;
    const minFontSize = 38;

    // Расчёт размера шрифта
    const calculateFontSize = () => {
      const length = currentValue.length;
      if (length <= maxLength) return maxFontSize;
  
      // Уменьшаем шрифт пропорционально длине
      const reduction = (length - maxLength) * 6; // На сколько пикселей уменьшать
      const newFontSize = Math.max(minFontSize, maxFontSize - reduction);
      return newFontSize;
    };
  
    const fontSize = calculateFontSize();

    const formatBigNumber = () => {
    if (Math.abs(parseFloat(currentValue)) >= 1e20) {
      return parseFloat(currentValue).toExponential(3)
    }
    return currentValue
    }

    return (
        <header>
          <span
            id="upperCalculatinNumber"
            className='upperLabel'>
            {savedValue.length > 20 ? "...=" : savedValue}
          </span>
                  
          <span
            id="calculatingNumber"
            className='mainLabel' style={{ fontSize: `${fontSize}px` }}>
            {formatBigNumber()}
          </span>
        </header>
    )
}