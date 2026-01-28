# Portafolio Profesional Full-Stack (MERN)

La aplicación permite gestionar dinámicamente la información profesional (Hoja de Vida) y publicar artículos técnicos a través de un panel de administración.

## 🚀 Enlaces de Despliegue
* **Frontend (Vercel):** https://portafolio-josue-herrera.vercel.app
* **Backend (Render):**  https://portafolio-josueherrera.onrender.com

## Stack Tecnológico

El proyecto utiliza (MongoDB, Express, React, Node.js) por su eficiencia y escalabilidad basada en JavaScript.

### **Frontend**(client)
* **React + Vite:** Para una construcción rápida, modular y optimizada.
* **Tailwind CSS:** Para un diseño responsive, moderno y accesible sin sobrecarga de estilos.
* **React Router DOM:** Gestión de navegación SPA (Single Page Application).
* **Axios:** Consumo de API y manejo de interceptores para tokens.
* **Context API:** Gestión global del estado de autenticación.

### **Backend**(server)
* **Node.js & Express:** Servidor RESTful escalable.
* **Mongoose:** ODM para modelado de datos y validaciones.
* **JWT (JSON Web Tokens):** Manejo de sesiones sin estado (stateless).
* **BcryptJS:** Hashing de contraseñas para almacenamiento seguro.

---

## Seguridad Implementada

Siguiendo las mejores prácticas de OWASP y los requisitos del proyecto, se implementaron las siguientes capas de seguridad:

1.  **Helmet:** Middleware para configurar cabeceras HTTP seguras (protección contra sniffing, XSS, etc.).
2.  **CORS (Cross-Origin Resource Sharing):** Restricción de acceso a la API únicamente desde el dominio del Frontend desplegado.
3.  **Rate Limiting:** Protección contra ataques de fuerza bruta y DDoS, limitando el número de peticiones por IP.
4.  **Validación de Datos:** Uso de `express-validator` para sanitizar entradas en todas las rutas.
5.  **Variables de Entorno:** Credenciales sensibles (`DB_URL`, `JWT_SECRET`) ocultas en el servidor y nunca expuestas en el código fuente.

---

## Justificación de Base de Datos


### **1. ¿Por qué se eligio NoSQL (MongoDB) sobre SQL?**
Opté por **MongoDB** (NoSQL) debido a la **flexibilidad del esquema**. En el desarrollo de software moderno, y específicamente en un portafolio personal, los requisitos de datos cambian con frecuencia.
* **Agilidad:** A diferencia de SQL (PostgreSQL/MySQL), donde un cambio en la estructura requiere migraciones complejas (`ALTER TABLE`), MongoDB permite iterar rápidamente. Si mañana decido agregar un campo de "Redes Sociales" o "Galería de Proyectos", puedo hacerlo sin romper la base de datos existente.
* **Formato JSON:** Al usar el stack MERN, todo el flujo de datos es JSON. MongoDB almacena documentos BSON (Binary JSON), lo que elimina la necesidad de un mapeo complejo (ORM) entre filas de tablas y objetos de JavaScript. La integración es nativa y natural.

### **2. ¿Cómo se adapta a las necesidades de un portafolio?**
Un portafolio es una aplicación **intensiva en lectura** (Read-Heavy). El 99% de las veces, los usuarios (reclutadores, clientes) están *leyendo* el perfil y los blogs, mientras que solo el administrador *escribe* ocasionalmente.
* **Rendimiento de Lectura:** MongoDB sobresale en la recuperación rápida de documentos completos. Al cargar el "Perfil", obtengo un solo objeto con toda la información anidada (habilidades, experiencia, educación) en una sola consulta, sin necesidad de costosos `JOINs` que serían necesarios en SQL para unir múltiples tablas normalizadas.
* **Escalabilidad de Contenido:** Para el Blog Técnico, la estructura de documentos permite que cada post tenga atributos variados (tags, categorías, metadatos) sin obligar a que todos los posts tengan exactamente las mismas columnas, adaptándose perfectamente a la naturaleza dinámica del contenido web.

## Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/jxherrera/Portafolio-JosueHerrera.git
cd portafolio
```
## instalacion de backend
```bash
cd server
npm install
```
### Variables de Entorno: Crea un archivo llamado .env dentro de la carpeta server y agrega lo siguiente:

PORT=4000
DB_URL=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster...
JWT_SECRET=tu_palabra_secreta

## prender el servidor
```bash
npx nodemon index.js
```

## instalacion de frontend
```bash
cd client
npm install
```
## prender el frontend
```bash
npm run dev
```
