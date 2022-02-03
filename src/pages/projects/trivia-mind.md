---
layout: ../../layouts/BaseProject.astro
title: Triviamind
description: Diviertete con Triviamind poniendo a prueba tus conocimientos. Podrás obtener un 10/10 ? 
stack: [React,Vite,Typescript]
linkRepository: https://github.com/d3vcloud/trivia-app
linkPreview: https://triviafun.netlify.app
---

![Trivia](/images/projects/triviamind-question.jpeg)

Triviamind te ofrece 12 categorías y 3 niveles de dificultad. Cada una cuenta con 10 preguntas que te permirán saber que tanto sabes de un tema específico. Si eres un experto en todas las materias, entonces la primera categoría es la idónea para ti pero ten cuidado 👀 porque a pesar del nivel te encontrarás con preguntas nuncas antes vistas.

![Home Triviamind](/images/projects/triviamind-index.jpeg)

## Motivación

Actualmente una de las mejores formas para obtener experiencia en determinadas tecnologías o herramientas es desarrollando proyectos, no solo suma la experiencia laboral sino tambien tus proyectos personales. Así que para incrementar mis habilidades en React y Typescript fue que nació este proyecto. 
No quería que sea un proyecto aburrido, asi que se me vino a la mente desarrollador una aplicación inspirandome en **Preguntados**; que por si no lo conoces, es una de las plataformas número 1 en juegos de trivia. Tengo muchas features pendientes de agregar y lo haré de forma progresiva.

## ¿Cómo fue desarrollada?

Al tener ya la idea de lo que deseaba desarrollar, empecé a buscar APIs que me briden un banco de preguntas con diferentes niveles y asi fue como llegué a [Api Open Trivia DB](https://opentdb.com/) que a mi parecer es una API completa ya que contamos con más de 20 categorías de preguntas, 3 niveles de dificultad, preguntas de seleción multiple o única y la posibilidad de personalizar la cantidad de preguntas que deseas por categoría.

Teniendo la API, estaba claro que lo iba a desarrollar con React y Typescript,sin embargo, debía definir dos puntos:
1. Una herramienta que tenga buena experiencia de desarrollo y están podía ser: CRA(Create React App) o Vite.
2. Una herramienta como ChakraUI o Tailwind CSS que me facilite el desarrollo de la UI.

Después de revisar comparativas y escuchar las experiencias de otros desarrolladores, me incliné por Vite y ChackraUI. En el caso de Vite fue porque tiene por detrás a [Esbuild](https://esbuild.github.io/) que acelera el proceso de build y su HMR(Hot Module Replacement) super rápido. Con ChakraUI siento que estoy trabajando con React por el hecho que utiliza componentes para armar la UI. 

Algo que no me gustó de Tailwind, fue el echo de llenar mis componentes de clases y que algunas utilidades no sigan el patrón que normalmente manejamos en css. 
Pero no me malinterpretes, Tailwind es ideal para prototipar de forma rápida y estoy seguro que lo utilizaré en proyectos futuros. 

Cuando estes en la trivia, la aplicación producirá un sonido para la respuesta correcta o incorrecta. Para esto, usé Howler que es una dependencia para manejo de sonidos.

## Recursos

* [Api Open Trivia DB](https://opentdb.com/)
* [Howler](https://www.npmjs.com/package/howler)
