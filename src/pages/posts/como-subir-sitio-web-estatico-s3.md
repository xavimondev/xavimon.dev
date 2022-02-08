---
layout: ../../layouts/BasePost.astro
title: Sitios web estaticos en S3
publishDate: 07 Febrero 2022
description: 'S3 es un servicio de Amazon para alojamiento de archivos que tambien podemos configurarlo para servir contenido estatico de una web.'
---
Tenemos muchos servicios de alojamiento web estático como Netlify, Vercel, GitHub Pages y otros, pero sabías que podemos usar el servicio S3 de Amazon para alojar contenido web estático? En el presente tutorial, te enseñare como configurar un bucket público y servir tu contenido estático.

Para este ejemplo, he desarrollado una web que contiene HTML, CSS y Javascript:

![Demo S3](/images/posts/web-demo-s3.jpeg)

La seccion productos lo genero estáticamente mientras que la lista de usuarios lo obtengo de la [API reqres](https://reqres.in/).

## Creación de bucket en S3

Primeramente debemos ingresar a la [consola de administración de Amazon](https://aws.amazon.com/console/), una vez que estés dentro, buscamos el servicio S3 y nos mostrará una tabla con la lista de buckets.

En este punto ya podemos crear un bucket, para eso realizamos lo siguiente:

1. Pulsar en **Crear bucket**.
2. El nombre del bucket será *demo-staticweb* y dejamos por defecto la región *us-east-1*.
3. En la sección **Bloqueo de acceso público**, debemos desmarcar todas las opciones y al realizar esto nos mostrará una advertencia en la que debemos marcar **Reconozco que la configuración actual...**
4. Por último, pulsamos en **Finalizar**.

## Configuración de un bucket como alojamiento estático

Ya tenemos nuestro bucket **demo-staticweb** y hacemos clic en este para que nos lleve a los detalles:

![Bucket](/images/posts/details-bucket.jpeg)

Nos vamos a la pestaña **propiedades** y casi en la parte final encontraremos **Alojamiento de sitios web estáticos** que está deshabilitada por defecto. Para habilitarla, pulsamos en **Editar** y veremos una serie de opciones que debemos configurar:

1. Habilitar alojamientos de sitios web estáticos.
2. Tipo de alojamiento será **Alojar sitio web estático**.
3. El documento índice es la página inicial de nuestro sitio web, en esta caso le pondremos `index.html`.

Y por último, pulsamos en **Guardar cambios**.

## Subiendo nuestro sitio web a un bucket

Después de guardar los cambios, nos dirigimos a la pestaña **objetos** , pulsamos en **Cargar** y lo que haremos es arrastrar y soltar todos los archivos de nuestro proyecto, una vez completado, pulsamos en **Finalizar**.

Si regresamos a la pestaña **propiedades** y nos vamos al bloque **Alojamiento de sitios web estáticos**, encontraremos el enlace de nuestro sitio web y al pulsarlo, Amazon nos mostrará el mensaje **Forbidden**. Esto se debe que nuestros archivos no son accesibles para el usuario y lo que nos queda es crear una política de bucket.

## Creando una política de bucket

Nos vamos a la pestaña **permisos** y en la opción **Política de bucket** ingresamos la siguiente definición:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": [
                "arn:aws:s3:::demo-staticweb/*"
            ]
        }
    ]
}
```
Con esto estamos diciéndole a Amazon que nuestro bucket **demo-staticweb** será público para todos los usuarios. Ahora, al pulsar nuevamente el enlace de nuestro sitio web, veremos todo el contenido de nuestra web.

![Website host in s3](/images/posts/website-in-s3.jpeg)

De esta forma hemos logrado subir un sitio estático a S3 y ya tienes otra alternativa de alojamiento. Recuerda que Amazon nos brinda 5GB de almacenamiento en S3 usando la capa gratuita, así que podrías tener buckets para alojamiento de archivos y otros para tu sitio web.

Te dejo algunos recursos que te serán útiles, además el video en donde explico detalladamente este tutorial.

## Recursos

* [Capa gratuita](https://aws.amazon.com/free/)
* [Tutorial en youtube](https://youtu.be/w5WRs0wgG54)
* [Bucket Policy Examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html) 