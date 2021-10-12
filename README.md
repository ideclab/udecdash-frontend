# UDECDash Frontend
UDECDash Frontend es un componente de UDECDash, visite la wiki del repositorio para encontrar más información sobre este y otros componentes.

## Requisitos
- [Vue-cli](https://cli.vuejs.org/ "Vue-cli")

UDECDash frontend está desarrollada en VueJS 2, por lo cual, hereda todos los requisitos de instalación de una aplicación vuejs tradicional ([Ver requisitos aquí](https://vuejs.org/v2/guide/installation.html "Requisitos de vuejs")).

## Instalación

1) Descarga el proyecto

`git clone https://github.com/xxxxx/interactive_dashboard_backend/`

2) Instala las dependencias

`npm install`

3) Configura el archivo de entorno ubicado en la raiz. En el apartado configuración se explican las claves.

`/Global.js`

4) Compila el proyecto

`npm run build`

5) Exporta la carpeta dist a tu servidor

## Configuración
La aplicación hará uso de algunas propiedades globales definidas en la instancia de Vuejs que permitirán el lanzamiento inicial de Oauth y vincular el frontend con el backend, para ello se debe modificar el archivo `Global.js` ubicado en la raiz del proyecto. 

*** 

Agrega la url de tu instancia de Canvas LMS. Registra una nueva aplicación OAuth en Canvas LMS y agrega el id y secreto que te proporcionará.

**Observación:** La instancia Oauth creada en Canvas LMS es la misma que se utilizará en UDECDash Frontend e UDECDash Backend, si ya haz creado una deberás reutilizar las credenciales.

````
Vue.prototype.$CLIENT_ID = 'xxxxx'

Vue.prototype.$CLIENT_SECRET = 'xxxxxxxxx'
````

***

Url al end point de lanzanmiento de OAuth. Por defecto todas las instancias tienen el mismo uri, sin embargo puedes revisar la [api de canvas](https://canvas.instructure.com/doc/api/ "api de canvas") para asegurarte que no ha cambiado. 

````
Vue.prototype.$CANVAS_LOGIN_URL = 'https://YOUR_INSTANCE.instructure.com/login/oauth2/'
````

***

Url de tu instalación del backend

````
Vue.prototype.$URL_BACKEND = 'https://example.com'
````
