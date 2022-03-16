import React, { useState } from 'react';
import axios from 'axios';

function App() 
{
  const [query, setQuery] = useState('');
  const [food, setFood] = useState( null
    // { calories: '',
    // carbohydrates_total_g: '',
    // cholesterol_mg: '',
    // fat_saturated_g: '',
    // fat_total_g: '',
    // fiber_g: '',
    // name: '',
    // potassium_mg: '',
    // protein_g: '',
    // serving_size_g: '',
    // sodium_mg: '',
    // sugar_g: '', }
    );
  const [error, setError] = useState(''); 

  var options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: query},
    headers: {
      'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
      'x-rapidapi-key': '2b42e0b829msh548ad463fe29e98p185282jsnad0888fb5232'
    }
  };
  const search=async(e) =>
  {
    if (e.key === "Enter") {
      await axios.request(options)
      .then((response) => 
      {
        const data= (response.data.items);
        if(data.length)
        {
         const d= data[0];

         setFood(
          { 
          calories: d.calories,
          carbohydrates_total_g: d.carbohydrates_total_g,
          cholesterol_mg: d.cholesterol_mg,
          fat_saturated_g: d.fat_saturated_g,
          fat_total_g: d.fat_total_g,
          fiber_g: d.fiber_g,
          potassium_mg: d.potassium_mg,
          protein_g: d.protein_g,
          sodium_mg: d.sodium_mg,
          name: d.name,
          sugar_g: d.sugar_g, }
         );
         setError(null);
        }
        else
        {
          setError("Food item not found. Try Again!");
          setFood(null);      
        }
      }
      )
      .catch(function (error) {
        setFood(null);
        setError(error);
      });
    }         
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
          type="text" placeholder="Enter Food Item"
          onChange= {(e)=> setQuery(e.target.value)}
          value= {query}
          onKeyPress= {search}
          />
        </div>
        <div>
          {
            food && 
            <div className="contents">
              <h1> {food.name.charAt(0).toUpperCase() + food.name.slice(1)} </h1>
              <ul className="list" >
              <li> Calories : {food.calories} </li>
              <li> Carbohydrates in gram : {food.carbohydrates_total_g} </li>
              <li> Cholesterol in mg : {food.cholesterol_mg} </li>
              <li> Carbohydrates in gram : {food.cholesterol_mg} </li>
              <li> Saturated fat in gram : {food.fat_saturated_g} </li>
              <li> Total fat in gram : {food.fat_total_g} </li>
              <li> Fiber in gram : {food.fiber_g} </li>
              <li> Potassium in mg : {food.potassium_mg} </li>
              <li> Sodium in mg : {food.sodium_mg} </li>
              <li> Sugar in gram : {food.sugar_g} </li>   
              </ul>
            </div>       
          } 
          </div>
        <div>{error && <div className="contents">{error} </div>} </div>
      </main>
    </div>
  );
}

export default App;
