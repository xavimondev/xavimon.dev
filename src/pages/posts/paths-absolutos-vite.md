---
layout: ../../layouts/BasePost.astro
title: Configurar paths absolutos en Vite y React
publishDate: 28 Febrero 2022
description: 'Al trabajar con importaciones lo que más deseamos es que estos sean fáciles de leer y ubicar. Tenemos una configuración llamada baseUrl que nos ayuda con esa tarea. Sin embargo, cuando trabajamos en Vite, debemos realizar algunas configuraciones adicionales.'
---
Nos encontraremos con proyectos largos que tienen cientos de archivos como componentes, servicios, páginas, hojas de estilos, etc. Por lo general, para importar estos archivos usamos paths relativos:

```javascript
import { getTotalIncomingExpenses } from '../../services/transaction'
import { Card, CardBody } from '../../../components/UI/Card'
import IconBox from '../components/UI/IconBox'
```

Notaste lo complicado que es ubicar estos archivos debido a la forma como se está importando. Felizmente en Vite podemos cambiar la forma de importación usando el plugin [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths). 

## Instalación del plugin vite-tsconfig-paths

Lo primero que debemos hacer es instalar como dependencia de desarrollo el plugin desde nuestra terminal con el siguiente comando:
```
npm install vite-tsconfig-paths -D
``` 
Comentarte que en el proyecto estoy usando typescript por lo tanto tiene la extensión *.ts* y si configuraste Vite con javascript, el archivo tendrá la extensión *.js*. 

Después de la instalación, vamos a ubicar el módulo `vite.config.ts` que contiene:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
})
```

Lo que debemos hacer es importar la dependencia `vite-tsconfig-paths` e inyectar la función `tsconfigPaths()` en el arreglo de plugins. Al final el módulo `vite.config.ts` quedará así:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
})
```

Con esto, ya podemos agregar la propiedad baseUrl en nuestro archivo `tsconfig.json` quedando de la siguiente forma:

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./src"
  },
  "include": ["./src"]
}
```

Ahora ya podemos cambiar la forma como estamos importando nuestros archivos:

```javascript
import { getTotalIncomingExpenses } from 'services/transaction'
import { Card, CardBody } from 'components/UI/Card'
import IconBox from 'components/UI/IconBox'
```

De esta forma estamos mejorando la forma de importación de nuestros archivos en Vite y evitando dolores de cabeza en nuestro equipo.

## Recursos

* [Plugin vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)
* [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)