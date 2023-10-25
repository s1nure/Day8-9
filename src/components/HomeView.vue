<template>
  <div class="weather-info">
    <ModalComponent :getLocation="getLocation" :open="isOpenModal" :close="closeModal" ></ModalComponent>
    <div class="cities-container wrapper">
      <div class="city-add">
        <label for="input-city"><h2>Додавання міста</h2></label>
        <label for="input-city"><h3>Введіть назву міста</h3></label>
        <input type="text" id="input-city" class="input-city-add" v-model="addCity" @keypress.enter="setDataToLocalStorage(this.addCity)">
        <button class="button-add" @click="setDataToLocalStorage(this.addCity)">Додати</button>
      </div>
      <div class="city-select">
        <label for="select-city"><h2>Вибір міста</h2></label>
        <label for="select-city"><h3>Оберіть місто</h3></label>
        <select class="input-city-select" id="select-city" v-model="selectedCity">
          <option v-for="(city, index) in cities" :key="index" :value="city"> {{ city }}</option>
        </select>
        <router-link :to="'/weather-info/'+selectedCity"><button class="button-select" :disabled="!selectedCity" >Погода</button></router-link>
      </div>
    </div>
    <div class="information-default wrapper">
      <div v-if="error">
        <h1>Нажаль {{ error }}</h1>
      </div>
      <div v-if="!error && apiWeatherData && location" class="info">
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
      </div>
    </div>
  </div>
  <button @click="clearLocalStorage">Clear localStorage</button>
  <button @click="getDataFromLocalStorage">Get localStorage</button>

  <h3>{{ selectedCity }}</h3>
  <h3>{{ addCity }}</h3>
  <h3>{{ cities }}</h3>
  <h3>{{ location }}</h3>
  <h3>{{ apiWeatherData }}</h3>
  <button @click="getLocation">Получить местоположение</button>

</template>

<script>
import ModalComponent from '../components/ModalComponent.vue'
import axios from 'axios'
export default {
  components: {
    ModalComponent
  },
  data () {
    return {
      selectedCity: '',
      addCity: '',
      cities: [],
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
      },
      location: {},
      error: '',
      isOpenModal: false
    }
  },
  methods: {
    getDataFromLocalStorage () {
      const arrayString = localStorage.getItem('cities')

      if (arrayString) {
        this.cities = JSON.parse(arrayString)
        return
      }
      this.cities = []
    },
    setDataToLocalStorage (value) {
      if (value) {
        this.cities.push(value)
        this.addCity = ''
        this.selectedCity = ''
        localStorage.setItem('cities', JSON.stringify(this.cities))
      }
    },
    clearLocalStorage () {
      localStorage.removeItem('cities')
      this.getDataFromLocalStorage()
      localStorage.removeItem('location')
      this.getLocationFromLocalStorage()
      this.location = null
      window.location.reload()
    },
    getDataFromApiWeather () {
      if (this.location == null) {
        return
      }
      axios.post(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude}&lon=${this.location.longitude}&appid=${this.apiKey}`).then(response => {
        this.apiWeatherData = response.data
      })
    },
    closeModal () {
      this.error = 'відказано у доступі.'
      this.isOpenModal = false
    },
    setLocationInLocalStorage () {
      localStorage.setItem('location', JSON.stringify(this.location))
    },
    getLocationFromLocalStorage () {
      if (JSON.parse(localStorage.getItem('location'))) {
        this.location = JSON.parse(localStorage.getItem('location'))
        return
      }
      this.isOpenModal = true
      this.location = null
    },
    getLocation () {
      this.isOpenModal = false
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            this.setLocationInLocalStorage()
            this.getDataFromApiWeather()
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                this.error = 'відказано у доступі.'
                break
              case error.POSITION_UNAVAILABLE:
                this.error = 'інформація о геолокації недоступна.'
                break
              case error.TIMEOUT:
                this.error = 'час запиту вийшов.'
                break
              default:
                this.error = 'виникла невідома помилка.'
            }
          }
        )
      } else {
        this.error = 'Геолокація не підтримується в вашому браузері'
      }
    }
  },
  mounted () {
    this.getDataFromLocalStorage()
    this.getLocationFromLocalStorage()
    this.getDataFromApiWeather()
  }
}
</script>

<style>
@import url(../assets/main.css);
</style>
