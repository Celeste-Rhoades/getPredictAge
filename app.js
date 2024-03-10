async function getPredictedAge() {
    const name = document.getElementById('name').value.trim()
    console.log(name)
    const country = document.getElementById('country').value.trim().toUpperCase()
    console.log(country)

    let apiUrl = `https://api.agify.io?name=${name}`

    if (country) {
        apiUrl += `&country_id=${country}`
    }

    try {
        const response = await fetch(apiUrl)
        if(!response.ok) {
            throw new Error('Network error')
        }
        const data = await response.json()
        console.log(data)
        const resultDiv = document.getElementById('result')
        if (data.age) {
            resultDiv.innerText = `Predicted Age for ${data.name}${country ? ` from ${country}`: ''} : ${data.age}`
            askUserAgeComaprison()
        }else {
            resultDiv.innerText = 'Age not available'
        }
    } catch (error) {
        console.error('Error fetching the age data:', error)
        document.getElementById('result').innerText = ' Failed to retrieve age prediction.'
    }
}

function askUserAgeComaprison() {
    const questionDiv = document.createElement('div')
    questionDiv.innerText = "Are you younger, older, or same age as prediction?"
    const buttons = ['Younger', 'Older', 'Same Age'].map(ageRelation => {
        const button = document.createElement('button')
        button.innerText = ageRelation
        button.onclick = () => displayJoke(ageRelation.toLowerCase())
        return button
    })
    buttons.forEach(button => questionDiv.appendChild(button))
    document.getElementById('result').appendChild(questionDiv)
}

function displayJoke(relation) {
    let joke = ''
    switch (relation) {
        case 'younger' :
        joke = 'Hey, it would have been right if you lived on Venus!'
        break;
        case 'older' :
        joke = 'You got the high score so you win!'
        break;
        case 'same age' :
        joke = 'Spot on! That means the data is always correct and never wrong!'
        break;
    }

    const jokeDiv = document.getElementById('joke') || 
    document.createElement('div')
    jokeDiv.id = 'joke'
    jokeDiv.innerText = joke
    if(!document.getElementById('joke')) {
        document.getElementById('result').appendChild(jokeDiv)
    }
}

function resetForm() {
    document.getElementById('name').value = ''
    document.getElementById('country').value = ''

    const resultDiv = document.getElementById('result')
    resultDiv.innerHTML = ''
}