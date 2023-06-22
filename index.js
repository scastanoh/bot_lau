const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'whatsapp_db',
  password: 'Sanjose4',
  port: 5432,
});

const client = new Client();

const mensajes =[
  'Claro, tu te mereces todas las formas de arte, porque tu no eres de este mundo, porque eres diferente, especial, hermosa, bella, radiante, gloriosa. Y siempre miro hacia todas las partes bellas de este mundo: pájaros, atardeceres, lunas, sol, lluvia, películas, poemas, pinturas, canciones, mereces todo y voy poco a poco dedicándote cada una.',
  'La luna se asoma en el cielo nocturno, y el paisaje se viste de plata y de ensueño. El amor se hace presente en mi pecho, y mi corazón late fuerte y despierto.',
  'En este escenario tan mágico y bello, mi mente solo piensa en un nombre, Laura. Ella es mi amor, mi musa y mi anhelo, y mi corazón por ella late con fuerza.',
  'Bajo la luz de la luna, pienso en ella, en su sonrisa, su piel y su mirada. En el paisaje que nos rodea juntos, y en los momentos que a su lado he vivido.',
  'La luna, el amor, el paisaje y Laura, se mezclan en mi mente en un solo sentimiento. Un sentimiento que no puedo explicar, solo sé que es amor, puro y verdadero',
  'Laura, mi dulce novia, hoy te escribo estas palabras, en este poema que surge de lo más profundo de mi corazón. Sé que vas a llorar  lágrimas de dolor, de incertidumbre, de miedo o felicidad, pero quiero que sepas que no estás sola, que mi amor siempre estará contigo pase lo que pase.',
  'Tu valentía y tu lucha son ejemplo de fortaleza, y aunque el camino sea duro, no te rindas, sigue adelante, en cada paso que des estaré cerca tuyo. Juntos aprenderemos y nuestro amor vencerá cualquier obstáculo, solo toca saber cómo utilizarlo. ',
  'Laura, mi amor, mi vida, mi novia, mi dulce bombón, mi sol, mi luna, mi todo, no importa cuán difícil sea el camino, yo estaré a tu lado, para ayudarte a levantarte cuando te caigas, y para amarte y protegerte cada día que pase.',
  'Así que no temas, mi Reina 👑. Recuerda siempre que te quiero y que eres lo más importante en mi vida, y que siempre estarás a tu lado, como tu novio, para amarte con pasión, alegría, emoción y respeto',
  'En tu rostro en cada línea está la muestra clara de tu valentía, tu rostro es la musa de aquellos que buscan la luz, y un amor que mueve el corazón. ',
  'Tus ojos brillan con determinación,\n  Y tú sonrisa es un bálsamo para mi alma. ',
  'Tu rostro es un poema vivo, que me recuerda amor y dedicación, las cuales son las claves para alcanzar cualquier objetivo. ',
  'Tu boca es un mundo de placer, una puerta abierta a la sensualidad, un abismo de deseo y pasión, que me invita a explorar. Es una flor que se abre en primavera, un puente que une mi alma y cuerpo, y que estoy dispuesto a recorrer con suavidad y ternura. En tus labios se encuentra el néctar del amor, un dulce que me embriaga, y es una chispa que enciende la pasión, iluminando el camino hacia la felicidad.',
  'Tú cuello es una extensión de tu belleza natural, un camino hacia tu corazón, en el se posan mis labios, en busca de sabor dulce y delicado, y en tu piel siento el pulso, de un amor intenso y apasionado. ',
  'Tus senos son un paisaje que se dibuja con suavidad, una forma que se desliza entre mis dedos, una figura que me cautiva y me seduce, son una obra de arte que admiro con devoción, una creación perfecta que celebró, y que guardo en el corazón como un tesoro.',
  'Tus brazos son un refugio seguro ante la tempestad, una extensión de un amor que se siente, y que me brindas con generosidad.  Son una camino hacia la calma y la paz, una acaricia que acaricia mi alma. ',
  'Tú cintura es una curva que inspira la admiración, una forma perfecta que despierta la emoción, en ella se encuentra la pasión y es el lugar perfecto para casa ocasión. ',
  'Tú trasero geometría que escapa a mi deseo, territorio ocupado por mis sueños, siento la necesidad de posar mis desnudas manos, y dibujar en él, el mapa de mis sentimientos, urbe donde habitan mis anhelos, arrebato lujurioso en mis mañanas, incluído el simple proceso de tocar tus nalgas siento el deseo y el ardor de un alma que clama más que amor. ',
  'Tus piernas son una poesía es una obra de arte que admiro con mi corazón, son la promesa por un camino por recorrer conmigo, y es una curva que me invita a caer y siempre me sostendra con fuerza y pasión.',
  'Tu vagina estrecho espacio, aliento del mar. Donde siento la brisa al introducir mis dedos, siempre la deseo y la espero comer sin compasión, lugar donde reposa miles de sueños y anhelos, y lugar donde quiero recorrer mis sueños',
  ' Aunque las sombras te persigan sin cesar\n  Y el peso del mundo te haga tambalear\n  Recuerda que en tu vida también hay luz\n  Y que esa luz te acompaña, sin excusas.\nAunque las malas noticias te asedien sin piedad\n  Y el dolor te invada sin previo aviso\n  No pierdas de vista lo bueno que tienes\n  Pues eso es lo que te mantendrá viva.,\n Puede que el cielo esté nublado y gris\n  Y que el futuro parezca incierto y frío\n  Pero no olvides las cosas que te hacen feliz\n  Y te llenan el alma de alegría y orgullo.\n\n  Piensa en los amigos que te quieren de verdad\n  Y en mi que te apoyo sin condiciones\n  Recuerda que siempre hay un rayo de esperanza\n  Y que tú eres dueña de tu vida, que se joda el resto.\n \n  Así que no te rindas, sigue adelante\n  Con la frente en alto y el corazón en paz\n  Porque aunque las cosas negativas te abrumen\n  Siempre habrá algo positivo que te haga sentir capaz.',
  'Ya son las 10 de la mañana y todavia te pienso,  cuando la noche es un misterio que despierta el deseo, y la pasión se enciende como una llama que no se apaga, te digo al oído, cuánto te quiero, cuánto te necesito, mi amor,  cuando el mundo se rinde al sueño,  y la oscuridad parece inundarlo todo, pienso en ti, mi amor, y siento que mi corazón late con fuerza.  ',
  'Son las 9 de la noche y todavia te pienso, cuando la ciudad comienza a dormir, y solo los enamorados caminan de la mano, anhelo estar a tu lado, para que juntos vivamos este momento de pasión. Espero que llege el día en el que te diga, te espero en nuestra casa, no te demores, o un día que estemos los dos juntos sin importar nada.\n  A las nueve de la noche, cuando el futuro es incierto,y solo el presente es lo que importa, te prometo que juntos enfrentaremos cada desafío y cada alegría.\n  Así que a las 9 de la noche, recordemos lo que somos, lo que queremos ser, y juntos crearemos una historia de amor, que jamás dejaremos de escribir y de leer',
  'Laura, mi dulce novia, hoy te escribo estas palabras, en este poema que surge de lo más profundo de mi corazón. Sé que vas a llorar  lágrimas de dolor, de incertidumbre, de miedo o felicidad, pero quiero que sepas que no estás sola, que mi amor siempre estará contigo pase lo que pase.\n\n  Tu valentía y tu lucha son ejemplo de fortaleza, y aunque el camino sea duro, no te rindas, sigue adelante, en cada paso que des estaré cerca tuyo. Juntos aprenderemos y nuestro amor vencerá cualquier obstáculo, solo toca saber cómo utilizarlo. \n\n  Laura, mi amor, mi vida, mi novia, mi dulce bombón, mi sol, mi luna, mi todo, no importa cuán difícil sea el camino, yo estaré a tu lado, para ayudarte a levantarte cuando te caigas, y para amarte y protegerte cada día que pase.\n\n  Así que no temas, mi Reina 👑. Recuerda siempre que te quiero y que eres lo más importante en mi vida, y que siempre estarás a tu lado, como tu novio, para amarte con pasión, alegría, emoción y respeto'
];

const nombresNovia = [
  '😈😈😈 monstrico😈😈😈',
  '🌟 Laurita',
  '☁️ cielito',
  '🍑 culisucia',
  '☀️ mi sol',
  '👩‍❤️‍💋‍👨 mi luna',
  '👸 mi mujer',
  '👸 mi reina',
  '👸 mi princesa',
  '🎀 mi niña de los ojos',
  '💃 guapa',
  '🔥 mamasota',
  '🐎 potra',
  '👑 duki',
  '🖤 traperito',
  '❤️‍🩹💜 mi todo',
  '❤️ mi vida',
  '✨ mi existencia',
  '💝 mi razon de vivir',
  '🔞❤️‍🔥🍑mi culona',
  '🍈 mi corazon de melon',
  '💕 mi culicagadita'
];

// Función para generar un saludo personalizado
function obtenerSaludoPersonalizado() {
  const nombre = nombresNovia[Math.floor(Math.random() * nombresNovia.length)];
  return `¡Hola, ${nombre}! Soy tu asistente personal Agatha. ¿En qué puedo ayudarte?\n\nOpciones disponibles:\n\n*1. Agregar tarea* - Agrega una tarea pendiente. (Envía "1: <tarea>")\n*2. Completar tarea* - Marca una tarea como completada. (Envía "2: <id>")\n*3. Editar tarea* - Edita una tarea existente. (Envía "3: <id> / <nueva tarea>")\n*4. Mostrar tareas pendientes* - Muestra las tareas pendientes. (Envía "4")\n\n*5.Poema aleatorio*-Manda 5 para un mensaje aleatorio\n\nPara seleccionar una opción, simplemente envía el número correspondiente seguido de los detalles necesarios.`;
}
function mensajealea() {
  const mens = mensajes[Math.floor(Math.random() * mensajes.length)];
  return ` ${mens}`;
}
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
    const query = 'SELECT id, sender FROM tareas_pendientes WHERE id = $1';
    const result = await client.query(query, [tareaId]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    return null;
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
  client.options.session = JSON.parse(sessionData);
}

client.initialize();

client.on('message', async (message) => {
  const senderName = message.from.name;
  const lowerCaseMessage = message.body.toLowerCase();

  if (lowerCaseMessage === 'hola') {
    const saludo = obtenerSaludoPersonalizado();
    message.reply(saludo);
  } else if (lowerCaseMessage.startsWith('1')) {
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

