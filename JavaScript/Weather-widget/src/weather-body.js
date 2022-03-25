import { fetchDataPromise } from './index'
class WeatherBody {
    key = '1354067d4c5e5ba7d6625f68d153937b'
    urlWetherByDays = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${this.key}`

    constructor() {
        this.daysWeatherHtmlElement = document.querySelector('.weather__days')
        this.init()
    }

    init() {
        this.initializationThenTwo()

    }
    
    initializationThenTwo() {
        fetchDataPromise(this.urlWetherByDays)
            .then((response) => {
                const data = JSON.parse(response)
                let result = ""
                data.list.forEach((item, index) => {
                    if ((index + 5) % 8 == 0) {

                        let template = this.templateWeatherByDays(item)
                        result = result + template
                    }
                })
                this.daysWeatherHtmlElement.innerHTML = result
            })

            .catch((error) => {
                console.error(error)
            })
    }


    templateWeatherByDays(item) {
        const date = new Date(item.dt * 1000)
        const weekDay = this.transformWeekDay(date)
        const monthNow = this.transformMonth(date)
        const day = date.getDate()
        const time = `${this.transformTime(date.getHours())}:${this.transformTime(date.getMinutes())} `
        const temp = Math.round(item.main.temp - 273.15) + '°C'
        const iconSrc = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        return `
        <div class="weather__day">
            <span>
            ${day}
            ${monthNow}
            ${weekDay}
            ${time}
            </span>            
            <img class="weather__icon" src="${iconSrc}">
            <span>${temp}</span>
        </div>       
            `
    }

    transformWeekDay(date) {
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const dateDay = date.getDay()
        const weekDay = day[dateDay]
        return weekDay
    }

    transformMonth(date) {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const dateMonth = date.getMonth()
        const monthNow = month[dateMonth]
        return monthNow
    }
    transformTime(time) {
        return time < 10 ? `0${time}` : time
    }
}

export { WeatherBody }