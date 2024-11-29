import React from "react";
import  { useEffect, useState } from "react";
import {marvelAPI} from "./api/marvel";
import "./App.css";
import Card from './components/Card';
import Carousel from "./components/Carousel";

const images = [
  "https://www.gratistodo.com/wp-content/uploads/2017/06/Marvel-Wallpapers-8.jpg",
  "https://areajugones.sport.es/wp-content/uploads/2022/05/marvel.jpg",
  "https://th.bing.com/th/id/R.0ff5a4e0e2ed41d82971f3970349f8fb?rik=JDO%2fxXfHQRP3Gg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fkO5R1kx.jpg&ehk=qKHO9brtmpmwNjR7DL4uJwqasnaMyvFrYtGv4gVlYt8%3d&risl=&pid=ImgRaw&r=0",
 
];

function App() { // const app = () => {} aquí cambiaria la logica para mostrar los datos de la api por ahora no lo hace 

const [characters, setCharacters] = useState([]);
const [comics, setComics] = useState([]);
const [newCharacter, setNewCharacter] = useState({
  name: "",
  date: "",
  description: "",
  img: "",
});

useEffect(() => {
  const fetchMarvelCharacters = async () => { //estoy obteniendo los personajes
    try {
      const response = await marvelAPI.get("characters");
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error("Error fetching Marvel characters:", error);
    }
  };

  const fetchMarvelComics = async () => { //obtengo los comics, falta por renderizar sin embargo el carrusel está estático
    try {
      const response = await marvelAPI.get("comics");
      setComics(response.data.data.results);
    } catch (error) {
      console.error("Error fetching Marvel comics:", error);
    }
  };

  fetchMarvelCharacters();
  fetchMarvelComics();
}, []);

const handleSubmit = async (e) => { //menejo el evento de envío del personaje
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/characters", newCharacter);
    setCharacters([...characters, response.data]);
    setNewCharacter({ name: "", date: "", description: "", img: "" });
  } catch (error) {
    console.error("Hay un problema enviando tu personaje:", error);
  }
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prueba Desarrollador Fullstack</h1>
      </header>
      <main>
        <Carousel images={images} />
        <Card />
      </main>
      <h2>Agregar nuevo Personaje</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fecha"
          value={newCharacter.date}
          onChange={(e) => setNewCharacter({ ...newCharacter, date: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newCharacter.description}
          onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Imagen URL"
          value={newCharacter.img}
          onChange={(e) => setNewCharacter({ ...newCharacter, img: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Agregar</button>
      </form>
    </div>
  );
}
export default App;