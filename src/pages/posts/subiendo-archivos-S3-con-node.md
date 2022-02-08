---
layout: ../../layouts/BasePost.astro
title: Subiendo archivos a S3 usando NodeJS
publishDate: 27 Enero 2022
description: 
    'S3 es un servicio de Amazon Web Services(AWS) muy popular para alojamiento de archivos, 
    con NodeJS podremos acceder a todas las características que nos provee el SDK de Amazon.'
---
En la actualidad tenemos varios servicios de almacenamiento como S3, Cloudinary, Google Drive, Mega, etc. Para el siguiente tutorial usaremos S3 y aprovecharemos que Amazon nos brinda durante un año servicios gratuitos que forman parte de su **Free Tier**.
![Free Tier](/images/posts/free-tier.jpeg)

Como podemos ver, Amazon nos ofrece 5GB de almacenamiento en su capa gratuita y este le suma 20,000 peticiones GET y 2,000 peticiones PUT.
Si consideras que la quota es pequeña, podrias ampliarla, pero ten en cuenta que te cobrarian dinero extra.

Antes de empezar con el código, te mostraré algunas definiciones claves en el mundo de S3: 
* Bucket: Un repositorio en donde almacenaras objetos. 
* Objeto: Archivos como imagenes, fotos, videos, documentos, etc
* IAM(Identity and Access Management): Servicio de Amazon que se encarga de definir que grupos o usuarios tienen acceso a un recurso o servicio específico.

## Creación de un usuario y política en IAM

Para cargar archivos usando el SDK de Amazon, necesitamos de credenciales que nos brindarán acceso a los buckets que creemos en S3. Todo este procedimiento lo realizaremos en la [consola de administración de Amazon](https://aws.amazon.com/console/), como mencioné antes, estaré haciendo uso de la capa gratuita.

Una vez dentro de la consola, nos dirigimos al servicio IAM y veremos la siguiente pantalla:
![IAM Console](/images/posts/iam-console.jpeg)

Nos dirigimos a **Políticas** y alli dentro realizamos lo siguiente:

1. Pulsamos en **Crear una politica**.
2. Seleccionamos el servicio S3.
3. En acciones, marcamos **Enumeración - ListAllMyBuckets** , **Lectura - GetObject** y **Escritura - PutObject**.
4. En recursos, dejamos marcado **Especifico** y marcamos **Cualquiera**.
5. Pulsamos en siguiente y nos muestra la interfaz para ingresar el nombre de nuestra politica, en este caso le he puesto *s3-tutorial-policy* y la descripción la dejo en blanco.
6. Por último, pulsamos en **Crear**.

Nuestra política quedará como la imagen:
![Creation Policy](/images/posts/final-step-policy.jpeg)

Culminada la creación de nuestra política, procedemos a crear un usuario. Para eso nos dirigimos a **Usuarios** y realizamos lo siguiente:

1. Pulsamos en **Añadir usuario** e ingresamos el nombre del usuario.
3. En tipo de acceso, seleccionamos **Acceso mediante programación**.
4. Pulsamos en **Establecer permisos** y **Asociar directamente las políticas existentes**.
5. En la lista de políticas disponibles, buscamos *s3-tutorial-policy*, lo seleccionamos y pulsamos en **Crear un usuario**.
6. Por último, visualizarás tu ACCESS_KEY y SECRET_KEY, estos datos guardalos en un lugar seguro ya que lo utilizaremos más adelante.

## Creación de un bucket en S3

Con las credenciales creadas, ya podemos configurar nuestro bucket, nos dirigimos al servicio **S3** y realizamos lo siguiente:

1. Pulsamos en **Crear bucket**.
2. En nombre del bucket ingresamos *family-photos-node* y dejamos seleccionado la región *us-east-1* por defecto.
2. Por último, pulsamos en finalizar.

Ya tenemos definido nuestras credenciales y el bucket, con todo esto ya podemos ir al código.

## Creación del proyecto en Node

Vamos a nuestra terminal y empezamos creando un proyecto en node con el siguiente comando:
```
npm init -y
``` 
Este comando crea un proyecto con un `package.json` que contiene configuraciones por defecto. Sientete libre de modificarlo a tu gusto.

Despues, crearemos la estructura de directorios. Si estas en un entorno UNIX y la terminal CMD en Windows, puedes hacerlo ejecutando el siguiente comando:
```
mkdir controllers routes helpers config middlewares
```
Luego, instalamos las dependencias que necesitamos en nuestro proyecto:
```
npm install express express-fileupload dotenv aws-sdk
```
## Creación de servidor en Express

Abrimos el proyecto en nuestro editor y creamos los archivos `app.js` y `.env` en la raiz de nuestro proyecto. El primero ejecutará el servidor en Express y en el segundo definiremos nuestras variables de entorno necesarias para el proyecto. 

En el archivo `.env` ingresamos la región del bucket y las credenciales que nos brindó Amazon al crear el usuario:
```
PORT = 4000
AWS_REGION=
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

Una vez culminado, en nuestra carpeta `config`, creamos el archivo server.js que contiene lo siguiente:

```javascript
require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');

```
Estamos haciendo referencia a nuestras dependencias que usaremos en este script, después creamos nuestra clase `Server.js` que definira la lógica para el servidor.

Ahora que tenemos la clase, en el constructor definimos una instancia de express, el puerto y la invocación de los métodos que crearemos más adelante:

```javascript
class Server {
  constructor(){
      this.app = express();
      this.port = process.env.PORT || '8080';
      this.middlewares();
      this.routes();
  }
}
```
En el método middlewares definimos lo siguiente:

```javascript
  middlewares(){
    //Todos los datos que vengan del formulario serán en formato JSON
    this.app.use(express.json());
    //Los archivos serán almacenados en una carpeta temporal antes de ser enviados a S3
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        debug:true
    }));
  }
```
Y por último, definimos dos métodos. El primero contiene las rutas y en el segundo la aplicación estará escuchando en el puerto especificado en el archivo `.env`

```javascript
routes(){
  this.app.use('/upload',require('../routes/upload.routes'))
}

listen(){
  this.app.listen(this.port,()=>{
      console.log('Listening on port',this.port);
  });
}

module.exports = Server;
```

Con esta lógica, ya podemos ejecutar nuestro servidor, para eso definimos lo siguiente en nuestro archivo `app.js`
```javascript
const Server = require('./config/server');

const app = new Server();

app.listen();
```
Al ejecutar en la terminal: 
```
node app.js
```
Veremos el mensaje *Listening on port 4000*, en este caso yo definí el puerto 4000 pero tu puedes hacerlo en otro puerto.

## Creación de rutas

Ahora que tenemos el servidor ejecutándose, necesitamos de rutas, las cuales serán llamadas al hacer la petición. En la carpeta **routes**, creamos el archivo `upload.routes.js` y definimos la siguiente lógica:

```javascript
const {Router} = require('express');
const {upload} = require('../controllers/upload.controller');
const {verifyFile} = require('../middlewares/verifyFile');
const router = Router();

router.post('/',verifyFile,upload);

module.exports = router;
```
Estamos obteniendo las funciones **Router()** de express y la función **upload()** del controlador index. Los controladores los definiremos más adelante, mientras tanto, estoy seguro que has visto la función **verifyFile()** de un middleware. Gracias a esta función validaremos que los archivos enviados por el cliente, sean correctos. 

Basicamente un middleware es una funcion validadora o intermediaria que se encarga de dar el visto bueno a la petición y según el resultado, puede que ejecute o no la función. Por lo tanto, en la carpeta **middlewares** vamos a definir un middleware con el nombre `verifyFile.js` y la lógica es la siguiente:
```javascript
const verifyFile = (req,res,next) => {
  
  if(!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).json({msg:'No files were uploaded'});

  next();
};

module.exports = {
    verifyFile
};
```
Como podrás ver, la función recibe como parámetros un objeto Request, un objeto Response y la función next(). 

En la condicional estamos evaluando lo siguiente:
1. Si en la request no viene un objeto files.
2. Si el objeto files no tiene keys.
3. Si la key "file" del objeto files no existe.

En caso contrario, ejecuta la función **next()** para siga con el flujo de ejecución de la aplicación.

## Creación de nuestro controlador

En la carpeta **controllers** creamos el archivo `upload.controller.js` y definimos la siguiente lógica:
```javascript
const { uploadToBucket } = require('../helpers/s3');

const upload = async (req,res) => {
  const bucket = 'family-photos-node';
  const file = req.files.file;
  await uploadToBucket(bucket,file);

  res.json('Uploading');
};

module.exports = {
  upload
}
```
Definimos la función **upload()** que recibe la request y response y en el cuerpo de la función estamos obteniendo el archivo que nos envia el cliente, además, tenemos una constante bucket que tiene el nombre de nuestro bucket en S3. Como puedes ver estos datos son enviados a una funcion **uploadToBucket()** cuyo objetivo es enviar nuestros archivos a S3.

Vamos a codificar la lógica de esta función, para eso en la carpeta **helpers**, creamos el archivo `s3.js` y definimos lo siguiente:
```javascript
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadToBucket = (bucketName,file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const params = {
      Bucket:bucketName,
      Key:file.name,
      Body:stream
  };
  return storage.upload(params).promise();
};

module.exports = {
  uploadToBucket
};
```

Como notaste, estamos haciendo uso del ACCESS_KEY y SECRET_KEY que nos brindó Amazon al crear un usuario, por lo tanto, asegurate que el archivo `.env` tenga configurado de forma correcta las variables de entorno.

En este punto ya tenemos configurado la lógica para cargar una imagen asi que vamos a probarlo. Estaré usando postman para testear nuestro endpoint.

Primeramente, quiero asegurarme que al no enviar un archivo en la petición me muestre el mensaje de error definido en el middleware.
![Error upload file](/images/posts/error-upload.jpeg)

Como podemos ver, al hacer una petición sin enviar archivos, el middleware hace su trabajo mostrándonos *No files were uploaded*

Ahora subiremos un archivo a nuestro bucket en S3, realizamos la misma petición
![Uploading file](/images/posts/upload-file.jpeg)

Al ingresar a nuestro bucket, observamos lo siguiente
![File uploaded](/images/posts/result-upload.jpeg)

Nuestro archivo ha sido cargado satisfactoriamente 🚀 

De esta forma hemos desarrollado un endpoint capaz de subir archivos a un bucket gracias al SDK de Amazon.
Espero que este tutorial te haya servido de mucha ayuda.

## Recursos

* [Capa gratuita](https://aws.amazon.com/free/)
* [Documentación SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
* [Tutorial en youtube](https://youtu.be/XKJFxkh3hqo)
* [Repositorio](https://github.com/d3vcloud/s3-upload-files) 