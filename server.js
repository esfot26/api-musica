const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();

const puerto = 8000;

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

function generarCancion() {
  return {
    id: faker.string.uuid(), // Cambiado correctamente
    titulo: faker.music.songName(),
    artista: faker.music.genre(),
    album: faker.commerce.productName(),
    duracion: faker.number.int({ min: 1, max: 8 })+' '+'minutos', 
    genero: faker.music.genre(),
    fechaLanzamiento: faker.date.past().toISOString().split('T')[0],
  };
}

function generarPlaylist() {
  const numCanciones = faker.number.int({ min: 5, max: 15 }); // Cambiado de datatype.number a number.int
  const canciones = Array.from({ length: numCanciones }, generarCancion);

  return {
    idPlaylist: faker.string.uuid(),
    nombre: faker.company.name(),
    descripcion: faker.lorem.sentence(),
    canciones: canciones,
    creador: faker.person.fullName(),
    fechaCreacion: faker.date.past(5).toISOString().split('T')[0], 
  };
}

app.get('/cancion', (_req, res) => {
  const cancion = generarCancion();
  res.json(cancion);
});

// Ruta para obtener una playlist aleatoria
app.get('/playlist', (_req, res) => {
  const playlist = generarPlaylist();
  res.json(playlist);
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
