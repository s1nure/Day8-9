<template>
  <div class="weather-info ">
    <div class="cities-container ">
      <div class="information-of-city wrapper">
        <table class="weather-info">
          <tbody>
            <tr>
              <td>{{ apiWeatherData.name }}</td>
              <td>{{ apiWeatherData.sys.country }}</td>
              <td>[{{ apiWeatherData.coord.lon }}, {{ apiWeatherData.coord.lat }}]</td>
            </tr>
            <tr>
              <td><img width="48" height="48" src="https://img.icons8.com/fluency/48/hygrometer.png" alt="hygrometer"/></td>
              <td> Humidity </td>
              <td>{{ apiWeatherData.main.humidity }}</td>
            </tr>
            <tr>
              <td><img width="48" height="48" src="https://img.icons8.com/fluency/48/temperature.png" alt="temperature"/></td>
              <td>Temperature</td>
              <td>{{ apiWeatherData.main.temp }} °F</td>
            </tr>
            <tr>
              <td><img v-if="apiWeatherData.weather[0].main == 'Clouds'" width="48" height="48" src="https://img.icons8.com/fluency/48/clouds--v3.png" alt="clouds--v3"/>
              <img v-if="apiWeatherData.weather[0].main == 'Rain'" width="48" height="48" src="https://img.icons8.com/fluency/48/rain.png" alt="rain"/>
              <img v-if="apiWeatherData.weather[0].main == 'Mainly cloudy'" width="48" height="48" src="https://img.icons8.com/fluency/48/partly-cloudy-day.png" alt="partly-cloudy-day"/>
              <img v-if="apiWeatherData.weather[0].main == 'Clear'" width="48" height="48" src="https://img.icons8.com/fluency/48/weather.png" alt="weather"/>
              </td>
              <td>Weather</td>
              <td>{{ apiWeatherData.weather[0].main }}</td>
            </tr>
            <tr>
              <td><img width="48" height="48" src="https://img.icons8.com/fluency/48/barometer-gauge.png" alt="barometer-gauge"/></td>
              <td>Pressure</td>
              <td>{{ apiWeatherData.main.pressure }} hpa</td>
            </tr>
            <tr>
              <td><img v-if="apiWeatherData.weather[0].main == 'Clouds'" width="48" height="48" src="https://img.icons8.com/fluency/48/clouds--v3.png" alt="clouds--v3"/>
              <img v-if="apiWeatherData.weather[0].main == 'Rain'" width="48" height="48" src="https://img.icons8.com/fluency/48/rain.png" alt="rain"/>
              <img v-if="apiWeatherData.weather[0].main == 'Mainly cloudy'" width="48" height="48" src="https://img.icons8.com/fluency/48/partly-cloudy-day.png" alt="partly-cloudy-day"/>
              <img v-if="apiWeatherData.weather[0].main == 'Clear'" width="48" height="48" src="https://img.icons8.com/fluency/48/weather.png" alt="weather"/>
              </td>
              <td>Description</td>
              <td>{{ apiWeatherData.weather[0].description }}</td>
            </tr>
          </tbody>
        </table>
        <router-link :to="'/'"><button class="button-back">Повернутися на головну</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    selectedCity: {}
  },
  data () {
    return {
      apiKey: '7914d5a440960cfd5df3bd0388a7ad0f',
      apiWeatherData: {
        coord: {
          lon: '',
          lat: ''
        },
        weather: [
          {
            id: '',
            main: '',
            description: '',
            icon: ''
          }
        ],
        base: '',
        main: {
          temp: 0,
          feels_like: '',
          temp_min: '',
          temp_max: '',
          pressure: '',
          humidity: ''
        },
        visibility: '',
        wind: {
          speed: '',
          deg: '',
          gust: ''
        },
        clouds: {
          all: ''
        },
        dt: '',
        sys: {
          type: '',
          id: '',
          country: '',
          sunrise: '',
          sunset: ''
        },
        timezone: '',
        id: '',
        name: '',
        cod: ''
      }
    }
  },
  methods: {
    getDataFromApiWeather () {
      if (!this.selectedCity) {
        return
      }
      axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${this.selectedCity}&appid=${this.apiKey}`).then(response => {
        this.apiWeatherData = response.data
      })
    }
  },
  mounted () {
    this.getDataFromApiWeather()
  }
}
</script>

<style>
@import url(../assets/main.css);
</style>
