const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const flowSecundario = addKeyword(['0', 'avt']).addAnswer(['🛎️Espera un momento por favor...⏳',
'\nUn asistente en línea 👨🏻‍💻 se comunicará contigo',
'\n*cbt* para regresar al menu principal'])

const flowComprar = addKeyword(['comprar']).addAnswer(['🛎️Espera un momento por favor...⏳',
'\nUn asistente en línea 👨🏻‍💻 se comunicará contigo',
'\n*cbt* para regresar al menu principal'])


const flowMenu = addKeyword(['menu', 'menú']).addAnswer('¡Ya casi! Ahora solo escribe *cbt*')


    const flowPromo4= addKeyword(['4', 'los mas vendidos', 'Los Productos Más vendidos 🔝', 'cuatro'])
    .addAnswer('Los Productos Más Vendidos son:')
    .addAnswer('*AUDIFONO PLUG H05 s/15* ',{
      media:'https://daphtech.com/wp-content/uploads/2023/09/MG_1393-1-768x768.jpg'
    })
    .addAnswer('*Camara Foco Seguridad Espía Hd Usb 128gb – Vista 360 s/85* ',{
      media:'https://daphtech.com/wp-content/uploads/2024/04/1-4-768x768.jpg'
    })
    .addAnswer('*CABLE OPTICO INTERMEDIO 1.5MT Y 3MT s/12* ',{
      media:'https://daphtech.com/wp-content/uploads/2023/06/MG_1099-copia-768x768.jpg'
    })
    .addAnswer('*PROTECTOR DE TABLET UNIVERSAL EVA 7”(MALETIN CORBATA) s/30* ',{
      media:'https://daphtech.com/wp-content/uploads/2021/12/case_maletincorbata_daphtech_1-768x768.jpg'
    })
.addAnswer(
    [

      'Si deseas comprarlo escribe *comprar*',
      'Aquí te dejo más información: https://daphtech.com/',
      '\n*menu* para regresar al menu principal',
  '*avt* Si quieres comunicarte con un asistente en línea 👨🏻‍💻'
    
        ],
        null,
        null,
        [flowSecundario,flowMenu, flowComprar])

const flowPromo3= addKeyword(['3', 'nuevos productos', 'los nuevos productos', 'tres'])
.addAnswer('Los Nuevos Productos son:')
    .addAnswer('*HUB USB 3.0 + 7 PUERTOS MD.LISO s/40* ',{
      media:'https://daphtech.com/wp-content/uploads/2022/03/HUB-USB-3.0-7-PUERTOS-MD.LISO-_daphtech_1-768x768.jpg'
    })
    .addAnswer('*CARGADOR AZ19V-3.42A 4.0*1.35MM s/40* ',{
      media:'https://daphtech.com/wp-content/uploads/2023/11/reemplazo-1-768x768.jpg'
    })
    .addAnswer('*TECLADO MECANICO CYBERTEL GK1001 s/160* ',{
      media:'https://daphtech.com/wp-content/uploads/2023/09/TECLADO-MECANICO-CYBERTEL-GK1001-768x768.jpg'
    })
    .addAnswer('*MOUSE INALAMBRICO WEIBO (RF-2820B) s/18* ',{
      media:'https://daphtech.com/wp-content/uploads/2022/02/D_NQ_NP_704587-MLA43978593276_112020-O1.webp'
    })
.addAnswer(
    [

      'Si deseas comprarlo escribe *comprar*',
      'Aquí te dejo más información: https://daphtech.com/',
      '\n*menu* para regresar al menu principal',
  '*avt* Si quieres comunicarte con un asistente en línea 👨🏻‍💻'


    ],
    null,
    null,
    [flowSecundario,flowMenu, flowComprar])


const flowPromo2 = addKeyword(['2', 'comprar por mayor','Quiero Comprar por mayor'])
.addAnswer('Para ser mayorista')
    .addAnswer('Regístrate en neustra página web')
    .addAnswer('https://daphtech.com/rm/ ',{
      media:'https://daphtech.com/wp-content/uploads/2021/11/side-bar2.jpg'
    })
.addAnswer(
    [
        '\n*menu* para regresar al menu principal',
        '*avt* Si quieres comunicarte con un asistente en línea 👨🏻‍💻'

    ],
    null,
    null,
    [flowSecundario,flowMenu ])
    
const flowPromo1 = addKeyword(['1', 'Quiero hacer una compra', 'uno'])
.addAnswer('Puedes ver todos nuestros productos en nuestra página web')
.addAnswer(' https://daphtech.com/',{
      media:'https://daphtech.com/wp-content/uploads/2021/11/sidebar1.png'
    })
.addAnswer('Por favor responde a la información solicitada a continuación:')
.addAnswer('Productos que deseas comprar: ')
.addAnswer('Ciudad - Distrito (para el envío): ')

.addAnswer(
    ['🛎️Espera un momento por favor...⏳',
    '\nUn asistente en línea 👨🏻‍💻 se comunicará contigo',

    ],
    null,
    null,
    [flowSecundario,flowMenu]
)








const flowPrincipal = addKeyword(['cbt'])
  .addAnswer('¡Hola! Soy el Chatbot 🤖 Automatizado de Daphtech ')
  .addAnswer('¿Cómo puedo ayudarte?')
  .addAnswer(
    [
        '1️⃣ Quiero Hacer Una Compra 🪙',
        '2️⃣ Quiero Comprar Por Mayor 📦',
        '3️⃣ Los Nuevos Productos 🥳 ',
        '4️⃣ Los Productos Más vendidos 🔝',
        
        '\n0️⃣ Si quieres comunicarte con un asistente en línea 👨🏻‍💻',
        
        '*(Escribe alguna opción del 0 al 4)*'
    ],
    null,
      null,
      [flowSecundario,  flowMenu, flowPromo1, flowPromo2, flowPromo3, flowPromo4]
    
  )
  
  



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)


    createBot( {
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    

    QRPortalWeb({port:20203})
}

main()