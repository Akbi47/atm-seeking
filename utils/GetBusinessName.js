export default function GetBusinessName(businessName) {


  const regex = /\b\w*bank\w*\b/gi; // Matches words containing "bank"
  const matches = businessName.match(regex);

  if (matches) {
    
    if (matches[0].toLowerCase() === 'bank') {
      return 'ATM-default';
    }

    const businessName = matches[0].charAt(0).toUpperCase() + matches[0].slice(1).toLowerCase();
    return businessName; // Get the first matching word in array of business name

  } else {
    return 'ATM-default'; // No matching word found
  }
}


