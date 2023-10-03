function generateRandomNumber(max){
    return Math.floor(Math.random() * max) + 1;
}

function dice(from, diceNum, attribute=null){
    const randomNumber = generateRandomNumber(diceNum);
    let message = randomNumber

    // If the attribute of the test is specified, sum the values
    if (attribute){
        // TODO: Make a query in database
        const attributeValue = 1
        message = randomNumber + '+' + attributeValue + '($atributte)' + '=' + (randomNumber + attributeValue)
    }
    
    return message
}

export { dice }