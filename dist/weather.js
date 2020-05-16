class WeatherApp {

    constructor() {
        this.cityData = []
    }
 
    async getDataFromDB() {
        this.cityData = []
        const data = await $.get('/cities')
        for (city of data) {
            await this.getCityData(city.name)
        }
        //this.cityData = data
    } 
    

    async getCityData(cityName) {
       let city = await $.get(`/city/${cityName}`)
       this.cityData.push(city)
    }

    saveCity(cityName) {
        const city = this.cityData.find(c => c.name.toLowerCase()==cityName.toLowerCase())
        $.post('/city',city)
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE'
        });
    }

}