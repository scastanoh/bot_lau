const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { Pool } = require('pg');
const axios = require('axios');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'whatsapp_db',
  password: 'Sanjose4',
  port: 5432,
});

const client = new Client();

// Función para agregar una tarea pendiente
async function agregarTarea(sender, tarea) {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO tareas_pendientes (sender, tarea) VALUES ($1, $2)';
    await client.query(query, [sender, tarea]);
    client.release();
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
  }
}

// Función para marcar una tarea como completada
async function completarTarea(tareaId) {
  try {
    const client = await pool.connect();
    const query = 'UPDATE tareas_pendientes SET completada = true WHERE id = $1';
    await client.query(query, [tareaId]);
    client.release();
  } catch (error) {
    console.error('Error al completar la tarea:', error);
  }
}

// Función para obtener las tareas pendientes de un usuario
async function obtenerTareasPendientes(sender) {
  try {
    const client = await pool.connect();
    const query = 'SELECT id, tarea FROM tareas_pendientes WHERE sender = $1 AND completada = false';
    const result = await client.query(query, [sender]);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error al obtener las tareas pendientes:', error);
    return [];
  }
}

// Función para obtener el clima actual de una ciudad
async function obtenerClima(ciudad) {
  try {
    const apiKey = 'f28d15aaf412486b949860657f0d4db4'; // Reemplaza con tu propia clave de API del servicio de clima
    const url = `https://api.weatherbit.io/v2.0/current?city=${ciudad}&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data.data[0];
    const { city_name, country_code, temp, weather } = data;
    return `Clima en ${city_name}, ${country_code}:\nTemperatura: ${temp}°C\nCielo: ${weather.description}`;
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    return 'Lo siento, no pude obtener el clima en este momento. Por favor, intenta nuevamente más tarde.';
  }
}

// Función para obtener noticias según un tema de interés
async function obtenerNoticias(tema) {
  try {
    const apiKey = 'c5b7473d6f684fe6a1b12cefc1fb19ed'; // Reemplaza con tu propia clave de API de noticias
    const url = `https://newsapi.org/v2/everything?q=${tema}&apiKey=${apiKey}`;
    const response = await axios.get(url);
    const articles = response.data.articles;
    let news = '';
    articles.slice(0, 5).forEach((article) => {
      const { title, description, url } = article;
      news += `${title}\n${description}\n${url}\n\n`;
    });
    return news;
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return 'Lo siento, no pude obtener noticias en este momento. Por favor, intenta nuevamente más tarde.';
  }
}

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('Credenciales de inicio de sesión:', session);
});

client.initialize();

client.on('message', async (message) => {
  const senderName = message.from.name;
  const lowerCaseMessage = message.body.toLowerCase();

  if (lowerCaseMessage === 'hola') {
    const greeting = `¡Hola, ${senderName}! Soy tu asistente personal. ¿En qué puedo ayudarte?\n\nOpciones disponibles:\n1. Agregar tarea - Agrega una tarea pendiente.\n2. Completar tarea - Marca una tarea como completada.\n3. Mostrar tareas pendientes - Muestra las tareas pendientes.\n4. Clima - Obten el clima actual de una ciudad.\n5. Noticias - Obtén noticias sobre un tema de interés.\n\nPara seleccionar una opción, simplemente envía el número correspondiente.`;
    message.reply(greeting);
  } else if (lowerCaseMessage.startsWith('1')) {
    const tarea = message.body.slice(2).trim();
    await agregarTarea(message.from, tarea);
    message.reply(`Tarea "${tarea}" agregada correctamente.`);
  } else if (lowerCaseMessage.startsWith('2')) {
    const tareaId = parseInt(message.body.slice(2).trim());
    await completarTarea(tareaId);
    message.reply(`Tarea ${tareaId} marcada como completada.`);
  } else if (lowerCaseMessage === '3') {
    const tareasPendientes = await obtenerTareasPendientes(message.from);
    if (tareasPendientes.length === 0) {
      message.reply('No tienes tareas pendientes.');
    } else {
      let listaTareas = 'Tareas pendientes:\n';
      tareasPendientes.forEach((tarea) => {
        listaTareas += `${tarea.id}. ${tarea.tarea}\n`;
      });
      message.reply(listaTareas);
    }
  } else if (lowerCaseMessage.startsWith('4')) {
    const ciudad = message.body.slice(2).trim();
    const clima = await obtenerClima(ciudad);
    message.reply(clima);
  } else if (lowerCaseMessage.startsWith('5')) {
    const tema = message.body.slice(2).trim();
    const noticias = await obtenerNoticias(tema);
    message.reply(noticias);
  } else if (lowerCaseMessage === 'adios') {
    message.reply('Hasta luego. ¡Que tengas un buen día!');
  } else {
    message.reply('Lo siento, no entiendo ese mensaje.');
  }
});
