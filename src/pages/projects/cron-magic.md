---
layout: ../../layouts/BaseProject.astro
title: cronmagic generator
description: Herramienta que te permite convertir fácilmente una expresión cron en un texto entendible.
stack: [HTML,CSS,JavaScript,Vite]
linkRepository: https://github.com/d3vcloud/cronmagic-app
linkPreview: https://cronmagic.netlify.app
---

![Cronmagic generator](/images/projects/cronmagic-index.jpeg)

cronmagic generator es una herramienta que tiene como objetivo hacerte la vida más fácil convirtiendo tus expresiones cron en un texto entendible por humanos. A veces lidiamos con este tipos de expresiones al momento de programar un schedule en linux pero con esta herramienta esos dolores de cabeza desaparecerán. Además podrás ver las próximas

## Motivación

En internet puedes encontrar varias herramientas que posiblemente realicen lo mismo, pero **cronmagic generator** tiene algo que lo hace diferente a estas, sus funcionalidades y experiencia de usuario. Las herramientas que encontré, no tenian una buena UI(User Interface) ni UX(User Experience), por lo tanto, me di cuenta que era una buena oportunidad para desarrollar algo diferente sin perder el foco en el objetivo de la aplicación. 

## ¿Cómo fue desarrollada?

Tenia claro que deseaba desarrollarlo con HTML, CSS y JavaScript pero necesitaba una herramienta del lado del Frontend que facilite mi experiencia de desarrollo y así fue como me incliné por [Vite](https://vitejs.dev/guide/why.html). Para el tema de los estilos, usé **vanilla CSS** ya que por el momento no veo la necesidad de incorporar algún framework. 

Por lo tanto, habiendo definido ya las herramientas de desarrollo y el alcance, necesitaba de una libreria o dependencia que me permita lo siguiente:

1. Validar las expresiones cron.
2. Transformar la expresión en un texto entendible por humanos.
3. Obtener las próximas ejecuciones del cron.

Asi que encontré estas dependencias super buenas, la primera es [cron-parser](https://www.npmjs.com/package/cron-parser) 
y la segunda [cRonstrue](https://www.npmjs.com/package/cronstrue). En el caso de **cron-parser** se encargó de las validaciones en expresiones cron mientras que **cRonstrue** realizó el proceso de conversión a texto y obtuvo las "N" próximas ejecuciones de un cron.

A parte de estas dependencias, también encontré **cron-validator** que realiza lo mismo que **cron-parser** pero me di cuenta que algunas expresiones válidas las estaba tomando como incorrectas por esa razón opte por **cron-parser**.

En la aplicación solamente nos muestra las 10 próximas ejecuciones:

![Cronmagic executions](/images/projects/cronmagic-executions.jpeg)

Algo que tengo pendiente es darle al usuario la flexibilidad para que defina la cantidad de próximas ejecuciones que desea visualizar.

Por último, no quería tener complicaciones manejando fechas en JavaScript así que opte por [Day.js](https://www.npmjs.com/package/dayjs) que es super ligera(2Kb) y permitió un parseo y manipulación rápida de fechas. Tambien tenemos otras opciones como **luxon** y **date-fns** pero ya depende de tus necesidades si las usas o no.

## Recursos

* [cron-validator](https://www.npmjs.com/package/cron-validator)
* [cRonstrue](https://www.npmjs.com/package/cronstrue)
* [cron-parser](https://www.npmjs.com/package/cron-parser) 
* [luxon](https://www.npmjs.com/package/luxon) 
* [date-fns](https://www.npmjs.com/package/date-fns) 