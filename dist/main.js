const App = new WeatherApp()
const renderer = new Renderer()
const render = renderer.renderData

const loadPage = function() {
    App.getDataFromDB().then( ()=>render(App.cityData))
}

loadPage()

const handleSearch  = async function(cityName) {
    await App.getCityData(cityName)
    render(App.cityData)
}

$('button').on('click',function() {
    const cityName = $('input').val()
    if(cityName) handleSearch(cityName)
})

$('#cities-container').on('click','.fa-plus-circle',function() {
    const cityName = $(this).siblings('.cityName').text()
    App.saveCity(cityName)
})

$('#cities-container').on('click','.fa-minus-circle',function() {
    const cityName = $(this).siblings('.cityName').text()
    App.removeCity(cityName)
})