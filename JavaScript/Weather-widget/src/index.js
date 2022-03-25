console.log('index.js')

function fetchDataPromise(url, method = 'GET') {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.onload = () => {
            if (xhr.status == '200') {
                resolve(xhr.response)
            } else {
                reject(xhr.status + ' ' + xhr.statusText)
            }
        }

        xhr.onerror = () => {
            reject(xhr.status + ' ' + xhr.statusText)
        }

        xhr.send()
    })
}

export { fetchDataPromise }

import { WeatherHead } from './weather-head'
new WeatherHead()

import { WeatherBody } from './weather-body'
new WeatherBody()
