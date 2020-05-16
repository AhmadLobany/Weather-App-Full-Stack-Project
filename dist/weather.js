class WeatherApp {

    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        this.cityData = []
        const data = await $.get('/cities')
        for (let city of data) {
            await this.getCityData(city.name)
        }
        //this.cityData = data
    }


    async getCityData(cityName) {
        //check if already exist 
        if(this.cityData.length>0) {
        const cityEle = this.cityData.find(u => u.name.toLowerCase() == cityName.toLowerCase())
        } else {
            const cityEle = undefined
        }
        if (cityEle == undefined) {
            let city = await $.get(`/city/${cityName}`)
            this.cityData.push(city)
        }
    }

    saveCity(cityName) {
        const city = this.cityData.find(c => c.name.toLowerCase() == cityName.toLowerCase())
        $.post('/city', city)
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE'
        });
    }

}