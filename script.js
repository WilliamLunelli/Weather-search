document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value

    console.log(input)

    if(input !== ''){
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f0cfec47e85ce57f347027b515ea1516&units=metric&lang=pt_br`
        let response = await fetch(url)
        let json = await response.json()
        console.log(json)

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle:json.wind.deg
            })
        }else{
            clearInfo()
            showWarning('Não encontramos esta localização.')
        }
    }
});     

function showInfo(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</spam>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    
    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}