import { useEffect, useState } from 'react';
import './App.css';
import $ from 'jquery'
import { min, sqrt} from 'math'


function App() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();

  useEffect(() => {
  // declare the data fetching function
    const fetchCity = async () => {
      const data = await fetch("https://api.ipregistry.co/?key=5mjvwtc2ysy6mh4f");
      const json = await data.json();
      console.log(json.location.city);
      await setCity(json.location.city.toLowerCase())
      return json.location.city;
    }
    // call the function
    fetchCity()
      // make sure to catch any error
      .catch(console.error);
    
    const fetchWeather = async () => {
      const data = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=f6c6ad460804dcdf62484283dfd28efc");
      const json = await data.json();
      await setCities(json.list)
    }
    const timer = setTimeout(() => {
      fetchWeather();
    }, 1000);
    return () => clearTimeout(timer);
  }, [city])


  console.log(city,cities);


  var i = 0
  $('.weather').each(function(){
    i++;
    var newID='weather'+i;
    $(this).attr('id',newID);
    $(this).val(i);

  })
  function Colorize(){
    var children = document.getElementById('maindiv').children;
    cities.forEach((element,j) => {
      for (var i = 0; i < children.length; i++) {
        if (i===j){
          var tableChild = children[i];
          tableChild.style.backgroundColor = 
          'rgb(' + min(255,(parseInt(element.main.feels_like-273.15)**2)) + ',' + 150 + ',' + min(100+sqrt(parseInt(element.main.feels_like-273.15))) + ')';
        }
      }
    });
  }
  setTimeout(Colorize,100)
    
  return (
    <div className="App">
      <h1>{city}</h1>
      <div id='maindiv'>
      {
        cities.map((city)=>{
          return <div className='weather' id='weather' key={city.key}>
            <h2>{city.dt_txt.toUpperCase()}</h2>
            <h1>{parseInt(city.main.feels_like-273.15)} °C </h1>
          </div>
        })
      }
      </div>
    </div>
  );
  
}

export default App;
