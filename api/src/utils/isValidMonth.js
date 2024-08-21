function isValidMonth(month) {
    const validMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return validMonths.includes(month.toLowerCase());
}

module.exports = isValidMonth;

