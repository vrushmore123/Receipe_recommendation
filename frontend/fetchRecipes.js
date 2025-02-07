import { useEffect } from "react";

function Fetch() {
  useEffect(() => {
    const apiKey = '10972795c6msha294e4539988a77p1ac91ajsn2158c46ca685';
    const ingredients = 'chicken,tomato,onion';
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=5&q=${ingredients}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Recipe Fetch Example</h1>
    </div>
  );
}

export default Fetch;
