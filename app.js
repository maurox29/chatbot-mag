const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowPass = addKeyword(['Pasaporte', 'pass', 'pasaporte']).addAnswer(
    [
        '📄 Aquí encontras la informacion necesaria',
        '¿Dirección de la oficina de pasaportes Magdalena?' ,
        'Carrera 1ra calle 22 esquina, Antiguo Hospital San Juan de Dios.',

        '¿Horario de atención de la oficina de pasaportes del Magdalena?',
        'Para realizar trámite de pasaporte y reclamar pasaporte',
        'De lunes a viernes (exceptos días festivos)',
        'De 8:00 am – 11:50 am   y de 2:00 pm – 4:50 pm',

        '¿Cómo puedo agendar mi cita con la oficina de pasaportes del Magdalena?',
        'Es un proceso fácil y rápido.',
	    'Debes dirigirte al portal web de la oficina',
        'https://pasaportes.gobernaciondelmagdalena.gov.co/',
        'En la parte superior encontraras el botón Agenda tu cita  Da clic.',
        'Debes presionar el botón Agendar cita Ubicado en el punto 2.',
 	    'Se despliega un formulario, Dale Continuar al mensaje que aparece, el cual indica que tus datos deben ser 100% exactos al documento de identidad.',
 	    'Ingresa los datos solicitado y da clic en Enviar datos',
 	    'Da clic en Continuar al mensaje que aparece indicando el éxito de tu registro',
 	    'Clic en Agendar cita',
	    'Aparece un botón de calendario, escoge tu fecha y hora para ser atendido',
	    'Dale Continuar para obtener la confirmación de tu cita, el código.',

        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowAser = addKeyword(['Certificados', 'cert']).addAnswer(
    [
        '🙌 ¡Un asesor te orientara en unos minutos!',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Gracias a ti Ciudadano, un gusto ayudarte',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowFree = addKeyword(['Preguntas frecuentes']).addAnswer(
    ['Aqui encontraras todas las preguntas y respuestas frecuentes', 'https://www.gobernaciondelmagdalena.gov.co/preguntas-y-respuestas-frecuentes/', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','buenas'],{sensitive:true})
    .addAnswer('🙌 Hola bienvenido a Gobernacion del Magdalena Chatbot')
    .addAnswer(
        [
            '¿En que puedo ayudarte?',
            '👉 *Pasaporte* ',
            '👉 *Certificados*',
            '👉 *Preguntas frecuentes*',
        ],
        null,
        null,
        [flowPass, flowGracias, flowAser, flowFree]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
