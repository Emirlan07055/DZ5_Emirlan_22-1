const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')

som.addEventListener('input', (e) => {
    console.log(e.target.value)
    const request = new XMLHttpRequest()
    request.open("GET", "data.json")
    request.setRequestHeader("Content-Type", "application/json")
    request.send()
    request.addEventListener("load", () => {
        const data = JSON.parse(request.response)
        console.log(data)
        usd.value = (e.target.value / data.usd).toFixed(2)
        usd.value = (e.target.value / data.usd).toFixed(2)
        euro.value = (e.target.value / data.euro).toFixed(2)
        euro.value = (e.target.value / data.euro).toFixed(2)
    })
})

const convert = (elem, target, areTrue) => {
    elem.addEventListener('input', () => {
        const request = new XMLHttpRequest()
        request.open("GET", "data.json")
        request.setRequestHeader("Content-Type", "application/json")
        request.send()
        request.addEventListener("load", () => {
            const data = JSON.parse(request.response)
            console.log(data)
            areTrue
                ?target.value = (elem.value / data.euro).toFixed(2)
                ?target.value = (elem.value / data.usd).toFixed(2)
                :target.value = (elem.value * data.euro).toFixed(2)
                :target.value = (elem.value * data.usd).toFixed(2)
            elem.value === "" ? (target.value = "") : null
            elem.value === "" ? (areTrue.value = "") : null
        })
    })
}
convert(som, usd, 57)
convert(euro, som, 57)
convert(euro, usd, 57)
convert(usd, euro, 57)
convert(som, usd,  euro, "")




