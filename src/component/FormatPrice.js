export const formatCoins = (value) => {
    if (value >= 1000000000) {  // Check if the value is in billions
      return (value / 1000000000).toFixed(1) + 'b';
    } else if (value >= 1000000) {  // Check if the value is in millions
      return (value / 1000000).toFixed(1) + 'm';
    } else if (value >= 1000) {  // Check if the value is in thousands
      return (value / 1000).toFixed(1) + 'k';
    } else {  // Return the value as is for numbers less than 1000
      return value.toString();
    }
  };
  