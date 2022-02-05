---
layout: ../../layouts/BaseProject.astro
title: quoteyu
description: Genera frases motivacionales y compartelas con tu comunidad de forma sencilla.
stack: [React,Vite,Typescript]
linkRepository: https://github.com/d3vcloud/quotes-app/
linkPreview: https://quoteyu.netlify.app/
---

![quoteyu](/images/projects/quoteyu-index.jpeg)

Quoteyu genera una frase motivacional que puede ser compartida por diferentes medios. Si tienes a alguien que necesita de inspiración o motivación, visita **quoteyu** y enviale a ese amigo o ser querido la frase que tanto necesita.

## Motivación

Ampliar mis conocimientos en React y Typescript además generar una aplicación que sea de mucha ayuda a personas que atraviesan por momentos difíciles.

## ¿Cómo fue desarrollada?

Teniendo en claro el objetivo, empecé a buscar APIs que me briden frases de forma aleatoria y encontré a [Advice Slip](https://api.adviceslip.com/) que cumple con lo requerido, incluso me da la posibilidad de realizar queries para obtener frases relacionadas a una palabra específica.

Sabiendo la API y el stack a utilizar, empecé a buscar la forma de compartir el mensaje y encontre [WebShareAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) que está [compatible](https://caniuse.com/?search=Web%20Share) en la mayoria de navegadores móbiles.

![WebShareAPI](/images/projects/webshare-comp.jpeg)

### ¿Qué es Web Share API?

**Web Share API** permite a un sitio web compartir textos, enlaces, archivos y otro contenido utilizando los mecanismos nativos del dispositivo móbil. 

Me parece interesante la idea que tendré aplicaciones nativas del dispositivo para compartir mi contenido. Si estamos en un dispositivo iOS, al compartir el contenido veremos lo siguiente:

![iosWeb Share](/images/projects/ios-webshare.jpeg)

Podemos ver que también nos permite compartir usando aplicaciones no nativas como las de mensajeria(Whatsapp, Telegram, etc).

Todo bueno hasta aquí, **pero que pasará con los dispositivos en donde la API no es compatible?**, para este caso tuve que desarrollar un fallback que actua como un mecanismo "auxiliar" para compartir el contenido.

![Desk Share](/images/projects/desk-webshare.jpeg)

Al querer compartir contenido desde un dispositivo no compatible, verás ese modal que tiene las opciones de Whatsapp, Email y copiar el contenido.

## Recursos

* [Advice Slip](https://api.adviceslip.com/)
* [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
* [Using Web Share API](https://css-tricks.com/how-to-use-the-web-share-api/)
