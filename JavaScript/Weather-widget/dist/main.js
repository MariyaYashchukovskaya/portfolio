(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(t,e="GET"){return new Promise(((n,r)=>{const s=new XMLHttpRequest;s.open(e,t),s.onload=()=>{"200"==s.status?n(s.response):r(s.status+" "+s.statusText)},s.onerror=()=>{r(s.status+" "+s.statusText)},s.send()}))}t.d({},{G:()=>e}),console.log("index.js"),new class{key="1354067d4c5e5ba7d6625f68d153937b";urlWetherCurrent=`https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${this.key}`;constructor(){this.currentWeatherHtmlElement=document.querySelector(".weather__current"),this.init()}init(){this.initializationThenOne()}transformDirectionWind(t){let e="";return 360==t||0==t?e="North":0<t&&t<90?e="Northeast":90==t?e="East":90<t&&t<180?e="Southeast":180==t?e="South":180<t&&t<270?e="Southwest":270==t?e="West":270<t&&t<360&&(e="Northwest"),e}transformTime(t){return t<10?`0${t}`:t}initializationThenOne(){e(this.urlWetherCurrent).then((t=>{const e=JSON.parse(t),n=e.name,r=e.wind.deg;console.log(r);const s=this.transformDirectionWind(r);console.log(s);const a=Math.round(e.wind.speed)+"m/s";console.log(a);const i=new Date(1e3*e.dt),o=`${this.transformTime(i.getHours())}:${this.transformTime(i.getMinutes())} `,h=Math.round(e.main.temp-273.15)+"°C",c=e.sys.country,l=e.weather[0].description,p=`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`;console.log(e);let u="";u+=this.templateCurrentWeather(n,s,a,o,h,c,l,p),this.currentWeatherHtmlElement.innerHTML=u})).catch((t=>{console.error(t)}))}templateCurrentWeather(t,e,n,r,s,a,i,o){return`\n        <span>${t}, ${a}</span>\n        <span><i class="far fa-clock"></i> ${r}</span>\n        <img class="weather__current_icon" src="${o}">\n        <span class="weather__current_description">${i}</span>\n        <span class="weather__current_temp">${s}</span>\n        <div class="weather__current_wind">\n            <span><i class="fas fa-wind"></i>${e}, ${n}</span>        \n        </div>         \n        `}},new class{key="1354067d4c5e5ba7d6625f68d153937b";urlWetherByDays=`https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${this.key}`;constructor(){this.daysWeatherHtmlElement=document.querySelector(".weather__days"),this.init()}init(){this.initializationThenTwo()}initializationThenTwo(){e(this.urlWetherByDays).then((t=>{const e=JSON.parse(t);let n="";e.list.forEach(((t,e)=>{if((e+5)%8==0){let e=this.templateWeatherByDays(t);n+=e}})),this.daysWeatherHtmlElement.innerHTML=n})).catch((t=>{console.error(t)}))}templateWeatherByDays(t){const e=new Date(1e3*t.dt),n=this.transformWeekDay(e),r=this.transformMonth(e),s=e.getDate(),a=`${this.transformTime(e.getHours())}:${this.transformTime(e.getMinutes())} `,i=Math.round(t.main.temp-273.15)+"°C";return`\n        <div class="weather__day">\n            <span>\n            ${s}\n            ${r}\n            ${n}\n            ${a}\n            </span>            \n            <img class="weather__icon" src="http://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png">\n            <span>${i}</span>\n        </div>       \n            `}transformWeekDay(t){return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t.getDay()]}transformMonth(t){return["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"][t.getMonth()]}transformTime(t){return t<10?`0${t}`:t}}})();