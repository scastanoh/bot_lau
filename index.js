const qrcode = require('qrcode-terminal');
const express = require('express');

const { Client } = require('whatsapp-web.js');
const { Pool } = require('pg');
const fs = require('fs');
const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const pool = new Pool({
  user: '****',
  host: '***',
  database: '***',
  password: '***',
  port: ***,
});

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

const scheduledTime = new Date();
scheduledTime.setHours(22);
scheduledTime.setMinutes(30);
const job = schedule.scheduleJob({ hour: 10, minute: 0 }, function() {
  // Aquí puedes personalizar el mensaje que deseas enviar
  const mensaje = '¡Hola! Este es un mensaje programado a las 10:00 AM. ¡Espero que tengas un gran día!';
  
  // Aquí debes reemplazar 'numero_de_teléfono' con el número del usuario al que deseas enviar el mensaje
  const numeroDestinatario = '+***';
  
  async function enviarMensaje() {
    try {
      await client.sendMessage(numeroDestinatario, mensaje);
      console.log('Mensaje enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }
  
  console.log(`Mensaje enviado a ${numeroDestinatario} a las 10:00 AM.`);
});

const mensajes =[
  'mensajes'
];

const nombresNovia = [
  'mensajes'
];

// Función para generar un saludo personalizado
function obtenerSaludoPersonalizado() {
  const nombre = nombresNovia[Math.floor(Math.random() * nombresNovia.length)];
  return `¡Hola, ${nombre}! Soy tu asistente personal Agatha. ¿En qué puedo ayudarte?\n\nOpciones disponibles:\n\n*1. Agregar tarea* - Agrega una tarea pendiente. (Envía "1: <tarea>")\n*2. Completar tarea* - Marca una tarea como completada. (Envía "2: <id>")\n*3. Editar tarea* - Edita una tarea existente. (Envía "3: <id> / <nueva tarea>")\n*4. Mostrar tareas pendientes* - Muestra las tareas pendientes. (Envía "4")\n*6. Recordatorio de tarea* - Pulsa 6 para ver como funciona\n*7-Horario Laurita* - Pulsa 7 para ver el horario de laurita\n*8-Horario Santi* - Pulsa 8 para ver el horario de Santi\n*10-Metas* - Pulsa 10 para ver como poner metas'\n\n*5.Poema aleatorio*-Manda 5 para un mensaje aleatorio\n\nPara seleccionar una opción, simplemente envía el número correspondiente seguido de los detalles necesarios.`;
}
function mensajealea() {
  const mens = mensajes[Math.floor(Math.random() * mensajes.length)];
  return ` ${mens}`;
}
// Agrega esta función al código
function isValidDateTimeFormat(dateTimeString) {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  return regex.test(dateTimeString);
}

async function enviarRecordatorio(tareaId, fechaHora) {
  const job = schedule.scheduleJob(fechaHora, async function() {
    // Obtener la tarea correspondiente al ID
    const tareaI = await obtenerTarea(tareaId);
    console.log('Tarea encontrada:', tareaI); // Corregir aquí, cambia "tarea" por "tareaI"
    if (tareaI) {
      // Enviar el mensaje de recordatorio
      const mensajeRecordatorio = `¡Recordatorio! No olvides completar la tarea: "${tareaI.tarea}"`;
      client.sendMessage(tareaI.sender, mensajeRecordatorio);
    }
  });
} 


async function enviarRecordatorioII(fechaHoraI) {
  const job = schedule.scheduleJob(fechaHoraI, async function() {
    try {
      // Enviar el mensaje de recordatorio
      const mensajeRecordatorioI = `Te amo \n ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️`;//mensaje para enviar
      const numeroDestinatario = '573053888892@c.us'; // Cambia esto al número del destinatario correcto
      await client.sendMessage(numeroDestinatario, mensajeRecordatorioI);
      console.log(`Mensaje de recordatorio enviado a las ${fechaHoraI}`);
    } catch (error) {
      console.error('Error al enviar el mensaje de recordatorio:', error);
    }
  });
}
// Función para agregar una nueva meta
async function nuevaMeta(sender, descripcion) {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO metas (sender, descripcion, progreso) VALUES ($1, $2, $3)';
    await client.query(query, [sender, descripcion, 0]);
    client.release();
  } catch (error) {
    console.error('Error al establecer la meta:', error);
  }
}





// Llamada a la función con la hora específica (ejemplo: 2023-08-06 21:55)
enviarRecordatorioII('2023-08-08 00:00');

async function enviarRecordatorioIII(fechaHoraII) {
  const job = schedule.scheduleJob(fechaHoraII, async function() {
    try {
      // Enviar el mensaje de recordatorio
      const mensajeRecordatorioII = `Holisss debes estar mimidita, te escribio esto. Soy la moza de Santiago, y en este día me quiero recompensar contigo porque he sido mala, entonces empezare desde las 0 horas de este día, hasta las 12 de la tarde, para desearte un feliz inicio de clases. <3`;//mensaje para enviar
      const numeroDestinatarioI = '573053888892@c.us'; // Cambia esto al número del destinatario correcto
      await client.sendMessage(numeroDestinatarioI, mensajeRecordatorioII);
      console.log(`Mensaje de recordatorio enviado a las ${fechaHoraII}`);
    } catch (error) {
      console.error('Error al enviar el mensaje de recordatorio:', error);
    }
  });
}
// Llamada a la función con la hora específica (ejemplo: 2023-08-06 21:55)
enviarRecordatorioIII('2023-08-08 00:01');


// Función para agregar una tarea pendiente
async function agregarTarea(sender, tarea) {
  try {
    if (tarea.trim() === '') {
      throw new Error('La tarea no puede estar en blanco.');
    }

    const client = await pool.connect();
    const query = 'INSERT INTO tareas_pendientes (sender, tarea) VALUES ($1, $2)';
    await client.query(query, [sender, tarea]);
    client.release();

    // Actualizar las estadísticas de productividad
    await actualizarEstadisticasProductividad(sender);
  } catch (error) {
    console.error('Error al agregar la tarea:', error);
  }
}


// Función para marcar una tarea como completada
async function completarTarea(tareaId) {
  try {
    if (isNaN(tareaId)) {
      throw new Error('El identificador de tarea debe ser un número.');
    }

    const client = await pool.connect();
    const query = 'UPDATE tareas_pendientes SET completada = true WHERE id = $1';
    await client.query(query, [tareaId]);
    client.release();

    // Actualizar las estadísticas de productividad
    const tarea = await obtenerTarea(tareaId);
    if (tarea) {
      await actualizarEstadisticasProductividad(tarea.sender);
    }
  } catch (error) {
    console.error('Error al completar la tarea:', error);
  }
}

// Función para editar una tarea
async function editarTarea(tareaId, nuevaTarea) {
  try {
    if (isNaN(tareaId)) {
      throw new Error('El identificador de tarea debe ser un número.');
    }

    if (nuevaTarea.trim() === '') {
      throw new Error('La nueva tarea no puede estar en blanco.');
    }

    const client = await pool.connect();
    const query = 'UPDATE tareas_pendientes SET tarea = $2 WHERE id = $1';
    await client.query(query, [tareaId, nuevaTarea]);
    client.release();

    // Actualizar las estadísticas de productividad
    const tarea = await obtenerTarea(tareaId);
    if (tarea) {
      await actualizarEstadisticasProductividad(tarea.sender);
    }
  } catch (error) {
    console.error('Error al editar la tarea:', error);
  }
}

// Función para obtener una tarea por su ID
async function obtenerTarea(tareaId) {
  try {
    const client = await pool.connect();
    const query = 'SELECT id, sender, tarea FROM tareas_pendientes WHERE id = $1';
    const result = await client.query(query, [tareaId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    return null;
  }
}

// Función para actualizar el progreso de una meta
async function actualizarProgreso(message, sender, metaId, nuevoProgreso) {
  try {
    if (isNaN(metaId) || isNaN(nuevoProgreso)) {
      throw new Error('El identificador de la meta y el progreso deben ser números.');
    }

    const client = await pool.connect();
    const query = 'UPDATE metas SET progreso = $2 WHERE id = $1';
    await client.query(query, [metaId, nuevoProgreso]);
    client.release();

  } catch (error) {
    console.error('Error al actualizar el progreso de la meta:', error);
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

async function obtenerProgreso(sender) {
  try {
    const client = await pool.connect();
    const query = 'SELECT progreso FROM metas WHERE sender = $1';
    const result = await client.query(query, [sender]);
    client.release();
    if (result.rowCount > 0) {
      return result.rows[0].progreso;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el progreso:', error);
    return null;
  }
}

// Función para actualizar las estadísticas de productividad
async function actualizarEstadisticasProductividad(sender) {
  try {
    const tareasPendientes = await obtenerTareasPendientes(sender);
    const totalTareas = tareasPendientes.length;
    const tareasCompletadas = tareasPendientes.filter((tarea) => tarea.completada);
    const porcentajeCompletado = (tareasCompletadas.length / totalTareas) * 100;

    const client = await pool.connect();
    const query = 'UPDATE estadisticas_productividad SET total_tareas = $1, tareas_completadas = $2, porcentaje_completado = $3 WHERE sender = $4';
    await client.query(query, [totalTareas, tareasCompletadas.length, porcentajeCompletado, sender]);
    client.release();
  } catch (error) {
    console.error('Error al actualizar las estadísticas de productividad:', error);
  }
}
async function establecerMeta(sender, descripcion) {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO metas (sender, descripcion, progreso) VALUES ($1, $2, $3)';
    await client.query(query, [sender, descripcion, 0]);
    client.release();
  } catch (error) {
    console.error('Error al establecer la meta:', error);
  }
}


// Función para obtener las estadísticas de productividad
async function obtenerEstadisticasProductividad(sender) {
  try {
    const client = await pool.connect();
    const query = 'SELECT total_tareas, tareas_completadas, porcentaje_completado FROM estadisticas_productividad WHERE sender = $1';
    const result = await client.query(query, [sender]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener las estadísticas de productividad:', error);
    return null;
  }
}
// Función para guardar un recordatorio en la base de datos
async function guardarRecordatorio(tareaId, fechaHora) {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO recordatorios (tarea_id, fecha_hora) VALUES ($1, $2)';
    await client.query(query, [tareaId, fechaHora]);
    client.release();
    console.log(`Recordatorio guardado para la tarea ${tareaId} el ${fechaHora}`);
  } catch (error) {
    console.error('Error al guardar el recordatorio:', error);
  }
}

// Función para mostrar el progreso de todas las metas de un usuario
async function mostrarProgreso(message, sender) {
  try {
    const client = await pool.connect();
    const query = 'SELECT id, descripcion, progreso FROM metas WHERE sender = $1';
    const result = await client.query(query, [sender]);
    client.release();

    if (result.rows.length === 0) {
      message.reply('No tienes metas registradas.');
    } else {
      let listaMetas = 'Tus metas y progresos:\n';
      result.rows.forEach((row) => {
        listaMetas += `${row.id}. ${row.descripcion} - ${row.progreso}% completado\n`;
      });
      message.reply(listaMetas);
    }} catch (error) {
      console.error('Error al mostrar el progreso de las metas:', error);
    }
  }



client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('Credenciales de inicio de sesión:', session);
  // Guardar las credenciales de inicio de sesión en un archivo
  try {
    fs.writeFileSync('./session.json', JSON.stringify(session));
  } catch (error) {
    console.error('Error al guardar las credenciales de inicio de sesión:', error);
  }
});

// Cargar las credenciales de inicio de sesión guardadas
if (fs.existsSync('./session.json')) {
  const sessionData = fs.readFileSync('./session.json');
  try {
    client.options.session = JSON.parse(sessionData);
  } catch (error) {
    console.error('Error al cargar las credenciales de inicio de sesión:', error);
  }
  
}

client.initialize();

client.on('message', async (message) => {
  const senderName = message.from.name;
  const lowerCaseMessage = message.body.toLowerCase();

  if (lowerCaseMessage === 'hola') {
    const saludo = obtenerSaludoPersonalizado();
    message.reply(saludo);
  } else if (lowerCaseMessage.startsWith('1 ')) {
    const tarea = message.body.slice(2).trim();
    await agregarTarea(message.from, tarea);
    message.reply(`Tarea "${tarea}" agregada correctamente.`);
  } else if (lowerCaseMessage.startsWith('2')) {
    const tareaId = parseInt(message.body.slice(2).trim());
    await completarTarea(tareaId);
    message.reply(`Tarea ${tareaId} marcada como completada.`);
  } else if (lowerCaseMessage.startsWith('3')) {
    const [tareaId, nuevaTarea] = message.body.slice(2).split('/').map((item) => item.trim());
    await editarTarea(parseInt(tareaId), nuevaTarea);
    message.reply(`Tarea ${tareaId} editada correctamente.`);
  }else if (lowerCaseMessage === '4') {
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
  } else if (lowerCaseMessage === '5') {
    const poem = mensajealea();
    message.reply(poem);
  } else if (lowerCaseMessage.startsWith('6')) {
    message.reply('Holisss, para poner un recordatorio de una tarea debes saber el id de la tarea. Para saberlo puedes pulsar 4 y ver el id y la tarea. Luego de eso copia el siguiente texto y modificalo 9: (id) / (año)-(mes)-(dia) (hora).');
    message.reply('9: 1 / 2023-08-06 21:55');
  }else if (lowerCaseMessage.startsWith('7')) {
    message.reply('Horario 🗓️ Laurita❤️:\n____Martes____\nTaller actuación 🎭 \n8:30 a.m - 10:00 a.m\nP 107\n\nRegistro de audio 🔊\n11:30 a.m - 1:00 p.m\nF 218\n\n____Miercoles____\nIntroducción al documental 📹\n7:00 a.m - 9:15 a.m\nF 202\n\nExplorar para investigar 🔎\n9:15 a.m - 10:45 a.m\nJ 503\nManejo de cámara 📹\n10:45 a.m - 1:00 p.m\nJ 401\n\n____Jueves_____\nApreciación Visual 👁\n11:30 a.m - 1:00 p.m\nF 303');
  }else if (lowerCaseMessage.startsWith('8')) {
    message.reply('Horario 🗓️ Thiam❤️:\n____Lunes____\nFísica mecánica y de fluidos-Lab🥼\n8:30 a.m - 10:00 a.m\nI2-305\nCálculo integral 🧮\n10:00 a.m - 11:30 p.m\nC7-101\nBioestadística🧬\n2:30 p.m - 4:00 p.m\nF-206\nFísica mecanica y de fluidos🔩\n4:00 p.m - 5:30 p.m\nG106\n____Martes____\nFísica mecánica y de fluidos🔩\n8:30 a.m - 10:00 a.m\nG-205\nCálculo integral 🧮\n11:30 a.m - 1:00 p.m\nC7-203\nBioestadística🧬\n2:30 p.m - 4:00 p.m\nG-204\n____Miércoles____\nBio informática🐛💻\n10:00 a.m - 12:00 m\nMorfofisiologia 🫁\n1:00 p.m - 3:00 p.m\n____Jueves____\nFísica mecánica y de fluidos🔩\n8:30 a.m - 10:00 a.m\nG-106\nCálculo integral 🧮\n10:00 a.m - 1:00 p.m\nC7-203\nBioestadística🧬\n2:30 p.m - 4:00 p.m\nF-206\n____Viernes____ \nMorfofisiologia 🫁\n1:00 p.m - 2:30 p.m\nCompetencia comunicativa 👄\n3:00 p.m - 5:00 p.m');
  }else if (lowerCaseMessage.startsWith('10')) {
    message.reply('Hola\nEsta es la nueva función de metas, donde puedes poner metas, hasta lograr el objetivo.\nPara hacerlo debes hacer lo siguiente:\n\n*Pulsa 11 más la meta*, para agregar una nueva meta\nEjemplo(11 Leer 10 libros este mes)\n\n*Actualiza la meta* Digita Actualizar progreso con el id de la meta más el porcentaje\nEjemplo(actualizar progreso 1 25)\n\n*Digita mostrar progreso* Para ver las metas junto con el progreso\n\nAhora mostrare las diferentes metas que hay junto con su ID, para que te guies, luego de ese mensaje pegare los ejemplos de como hacer las opciones, y solo pegaras y editaras lo que quieras')
    const sender = message.from;
    try {
      const client = await pool.connect();
      const query = 'SELECT id, descripcion, progreso FROM metas WHERE sender = $1';
      const result = await client.query(query, [sender]);
      client.release();
  
      if (result.rows.length === 0) {
        message.reply('No tienes metas registradas.');
      } else {
        let listaMetas = 'Tus metas y progresos:\n';
        result.rows.forEach((row) => {
          listaMetas += `│ID:│DESCRIPCIÓN│PROGRESO│\n │${row.id}│ ${row.descripcion} │ ${row.progreso}% │\n\n`;
        });
        message.reply(listaMetas);
      }
    } catch (error) {
      console.error('Error al mostrar el progreso de las metas:', error);
    }
    message.reply('Ejemplo de poner meta:');
    message.reply('11 Leer 10 libros este mes');
    message.reply('Ejemplo de actualizar progreso de una meta, importante ver id, que es el numeirito que aparece antes de la descripción:');
    message.reply('actualizar progreso 1 20');
    message.reply('Mostrar todas las metas con su progreso:')
    message.reply('mostrar progreso');
  } 
  else if (lowerCaseMessage.startsWith('11')) {
    const metaDescripcion = message.body.slice(2).trim();
    await nuevaMeta(message.from, metaDescripcion);
    message.reply(`Meta establecida: "${metaDescripcion}"`);
  } else if (lowerCaseMessage.startsWith('actualizar progreso')) {
    const parametros = message.body.slice(20).trim().split(' ');
    if (parametros.length === 2) {
      const metaId = parseInt(parametros[0]);
      const nuevoProgreso = parseInt(parametros[1]);
  
      if (!isNaN(metaId) && !isNaN(nuevoProgreso)) {
        await actualizarProgreso(message, message.from, metaId, nuevoProgreso);
        message.reply(`¡Progreso actualizado a ${nuevoProgreso}%! ¡Sigue adelante!`);
      } else {
        message.reply('Por favor, proporciona valores numéricos válidos para el identificador de la meta y el progreso.');
      }
    } else {
      message.reply('Por favor, proporciona el ID de la meta y el nuevo progreso separados por un espacio.');
    }
  } else if (lowerCaseMessage === 'mostrar progreso') {
    await mostrarProgreso(message, message.from);
  }
  

  else if (lowerCaseMessage.startsWith('9')) {
    const command = message.body.slice(2).trim();
    const [tareaId, fechaHora] = command.split('/').map(item => item.trim());
  
    // Verificar si la tareaId es un número y la fechaHora tiene un formato válido
    if (isNaN(tareaId) || !isValidDateTimeFormat(fechaHora)) {
      message.reply('El formato del comando es incorrecto. Por favor, utiliza "9: <id> / <fecha y hora>"');
      return;
    }
  
    // Guardar el recordatorio en una base de datos o en memoria
    guardarRecordatorio(parseInt(tareaId), fechaHora);  
  
    // Programar el envío del recordatorio
    enviarRecordatorio(parseInt(tareaId), new Date(fechaHora));
  
    message.reply(`Recordatorio establecido para la tarea ${tareaId} el ${fechaHora}`);
  }else if (lowerCaseMessage.startsWith('7')) {
    message.reply('Holisss, para poner un recordatorio de una tarea debes saber el id de la tarea. Para saberlo puedes pulsar 4 y ver el id y la tarea. Luego de eso copia el siguiente texto y modificalo 9: (id) / (año)-(mes)-(dia) (hora).');
    message.reply('9: 1 / 2023-08-06 21:55');
  }
  
  
  
   else if (lowerCaseMessage === 'estadisticas') {
    const estadisticas = await obtenerEstadisticasProductividad(message.from);
    if (estadisticas) {
      const { total_tareas, tareas_completadas, porcentaje_completado } = estadisticas;
      message.reply(`Estadísticas de productividad:\nTotal de tareas: ${total_tareas}\nTareas completadas: ${tareas_completadas}\nPorcentaje completado: ${porcentaje_completado}%`);
    } else {
      message.reply('No se encontraron estadísticas de productividad.');
    }
  }
});
