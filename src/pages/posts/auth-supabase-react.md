---
layout: ../../layouts/BasePost.astro
title: Autenticación con Magic Link en Supabase y React
publishDate: 03 Marzo 2022
description: 'Supabase es una plataforma open source para administrar el backend. Es considerada como una alternativa a Firebase y contamos con algunos servicios como autenticación, almacenamiento, base de datos. En este post revisaremos tres formas de autenticación en Supabase'
---
Supabase es una plataforma open source para administrar el backend. Es considerada como una alternativa a Firebase y contamos con servicios como autenticación, almacenamiento y base de datos.

En Supabase tenemos hasta 4 formas para autenticarnos:

1. Email y password.
2. Magic links (login con un click).
3. Social providers.
4. Login con móbil.

En este tutorial, implementaremos la autenticación por Magic Link y con ayuda de [Vite](https://vitejs.dev/) desarrollaremos una aplicación simple en React.

## Creando proyecto en Supabase

Visita [Supabase](https://supabase.com/docs) para crear una nueva cuenta. Click en el botón 'New Project' y un modal como este aparecerá:

![Modal new project](/images/posts/auth-supabase-react/modal-new-project.jpeg)

Debes ingresar los datos como el nombre del proyecto, contraseña y región. 

El proceso de creación tomará algunos minutos. Después que ha culminado, dirígite a Settings > API y copia la URL y anonymous API Key. Guarda estos datos en alguna parte ya que lo necesitaremos más adelante.

Ahora para acelerar el proceso de sign up, necesitamos desactivar la confirmación de email en Authentication > Settings > Double confirm email changes and email confirmations.

## Configurando proyecto en Vite

Vite es un empaquetador de aplicaciones agnóstico, es decir, puedes trabajar con Vue, Angular, React e incluso vanilla javascript. Se caracteriza porque utiliza esbuild que acelera el proceso de desarrollo de aplicaciones.

Para crear un proyecto en Vite utiliza el siguiente comando:
```bash
npm create vite@latest auth-app-supabase -- --template react
```

Por defecto, Vite define una estructura de proyecto pero he retirado algunos archivos y carpetas quedando de la siguiente forma:
```
├── package.json
├── vite.config.js
├── .env.development.local
├── index.html
└── src
    ├── components
    │   ├── MagicLinkForm.jsx
    │   ├── Welcome.jsx
    ├── context
    │   └── AuthContext.jsx
    │── services
    │   ├── auth.js
    │── routers
    │   ├── index.jsx
    │── api
    │   ├── config.js
    ├── App.jsx
    └── main.jsx
```

Recuerda que puedes cambiar la estructura como desees. Los archivos `App.jsx` y `main.jsx` fueron creados por Vite y lo que haremos es modificarlos de forma que quedará así:

```javascript
// src/components/main.jsx
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

```javascript
// src/components/App.jsx
import AppRouter from './routers'

function App () {
  return (
    <AppRouter />
  )
}

export default App
```

## Configurando el cliente de Supabase en React

Primeramente, instalamos la dependencia de Supabase para JavaScript:
```bash
npm install @supabase/supabase-js
```

En el archivo `.env.development.local` copiamos la URL y anonymous API Key que lo obtuvimos en la parte uno del tutorial:

```
VITE_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_URL.supabase.co
VITE_PUBLIC_ANON_KEY=YOUR_ANON_KEY
```

Ahora vamos a implementar nuestro cliente en `src/api/config.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_PUBLIC_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Creación de componentes

Para el tutorial implementaremos dos componentes `src/components/MagicLinkForm.jsx` y `src/components/Welcome.jsx`, 

```javascript
import { useState } from 'react'

const MagicLinkForm = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default MagicLinkForm
``` 

El componente `Welcome.jsx` es un componente que muestra la información del usuario autenticado:
```javascript
const Welcome = () => {

  const handleLogout = () => { }

  return (
    <div style={{
        marginTop: '4px',
        paddingRight: '8px',
        paddingLeft: '8px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <div>
        <h1 style={{marginBottom: '10px'}}>Welcome</h1>
        <span style={{
          fontSize:'1.2rem',
          color:'#718096',
          fontWeight:'600'
        }}>{/* user information más adelante*/}</span>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Welcome
```

## Creación de rutas

Hasta este punto nuestros componentes no ningún tipo de enrutamiento. Para el tutorial usaremos [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) y lo instalamos con:

```bash
npm install react-router-dom@6
```

En `src/routers/index.jsx` definiremos nuestras rutas por cada componente creado:

```javascript
// src/routers/index.jsx
import { Routes, Route } from 'react-router-dom'

import Welcome from '../components/Welcome'
import MagicLinkForm from '../components/MagicLinkForm'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='login' element={<MagicLinkForm />} />
    </Routes>
  )
}

export default AppRouter
```

Recuerda que debemos modificar nuestro componente `src/main.jsx` agregando el wrapper `BrowserRouter`:
```javascript
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

## Implementando la lógica de autenticación

Para agregar la lógica de autenticación, usaremos el Context API de React.

El Context API nos permite compartir información en el árbol de componentes sin necesidad de enviar props a cada componente.

Vamos a empezar agregando nuestra lógica en `src/context/AuthContext.jsx`. Primero crearemos un objeto Context:

```javascript
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../api/config'

export const AuthContext = createContext({
  user: null
})
```

Ahora, en el mismo archivo crearemos nuestro provider: 

```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async () => checkUser()
    )

    const checkUser = async () => {
      const user = supabase.auth.user()
      if (user) {
        setUser(user)
        navigate('/', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }
    checkUser()
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}
```

En el provider observamos lo siguiente:
- Estamos usando el hook `useNavigate` para el redireccionamiento del usuario.
- Tenemos la función `supabase.auth.onAuthStateChange` que está pendiente del estado de la autenticación(login y logout).
- La función `checkUser` es la responsable de obtener la información del usuario y según el estado, realizar el redireccionamiento.

Con nuestro `AuthProvider` listo, ya podemos hacer un wrap de nuestra aplicación. Para eso modificamos `src/index.jsx`:
```javascript
{/* imports ....*/}
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

Ahora, crearemos nuestros servicios para autenticarnos con magic link y logout. En `src/services/auth.js` agregamos las siguientes funciones:

```javascript
import { supabase } from '../api/config'

export const signInWithMagicLink = async (email) => {
  const result = await supabase.auth.signIn({
    email
  })
  return result
}
```

La función `signInWithMagicLink` recibe el email como parámetro. Ten en cuenta que este email recibirá un correo con el enlace para la autenticación. 

El servicio para logout es el siguiente:

```javascript
export const logout = async () => {
  const result = await supabase.auth.signOut()
  return result
}
```

Con pocas líneas de código ya tenemos nuestra función logout.

## Agregando autenticación a los componentes

Vamos a empezar agregando la lógica de `signInWithMagicLink` en nuestro componente `app/components/MagicLinkForm.jsx`:
```javascript
import { signInWithMagicLink } from '../services/auth'

const MagicLinkForm = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signInWithMagicLink(email)
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>{/* input controls */}</form>
    </>
  )
}
```

Sí, tan solo con agregar esa línea ya tenemos implementado 🚀 nuestro magic link. 

Vamos a probar ingresando nuestro email y recibiremos un mensaje como el siguiente:
![Magic email](/images/posts/auth-supabase-react/magic-link-email.jpeg)

Al pulsar en el enlace `Log In`, nos llevará a la página de bienvenida y lo que tenemos pendiente es mostrar el usuario autenticado. Para eso realizamos las modificaciones en el componente `src/componentes/Welcome.jsx`:
```javascript
import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

import { logout } from '../services/auth'

const Welcome = () => {
  const { user } = useContext(AuthContext)

  const handleLogout = async () => await logout()

  return (
    <div style={{
        marginTop: '4px',
        paddingRight: '8px',
        paddingLeft: '8px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <div>
        <h1 style={{marginBottom: '10px'}}>Welcome</h1>
        <span style={{
          fontSize:'1.2rem',
          color:'#718096',
          fontWeight:'600'
        }}>{user?.email}</span>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Welcome
```

Actualizamos y veremos el email del usuario autenticado.

Como verás, Supabase nos facilita mucho el proceso de autenticación con Magic Link. Tenlo en cuenta para tus futuros proyectos ya que es algo que se está viendo mucho en aplicaciones modernas.


## Recursos

* [Tutorial en Youtube](https://youtu.be/TTPEjf3R5hU) 
* [Supabase guía en react](https://supabase.com/docs/guides/with-react)
* [Supabase auth](https://supabase.com/docs/guides/auth)
* [Vite variables](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)