# Documentación de la API

Esta API gestiona la autenticación, el perfil profesional y el blog.

## Autenticación

### Login
* **URL:** `/api/auth/login`
* **Método:** `POST`
* **Body:**
    ```json
    {
      "email": "admin@test.com",
      "password": "password123"
    }
    ```
* **Respuesta Exitosa:** Devuelve un JWT Token.

### Registro (Público)
* **URL:** `/api/auth/register`
* **Método:** `POST`
* **Body:** `name`, `email`, `password`.

---

## Perfil Profesional

### Obtener Perfil (Público)
* **URL:** `/api/profile`
* **Método:** `GET`
* **Descripción:** Devuelve los datos del Home (Nombre, Bio, Skills, Educación, etc).

### Actualizar Perfil (Privado)
* **URL:** `/api/profile`
* **Método:** `PUT`
* **Headers:** `x-auth-token: <TOKEN_JWT>`
* **Body:** JSON con los campos a actualizar (`description`, `skills`, `education`, etc).

---

## Blog

### Obtener Todos los Posts (Público)
* **URL:** `/api/posts`
* **Método:** `GET`

### Crear Post (Privado)
* **URL:** `/api/posts`
* **Método:** `POST`
* **Headers:** `x-auth-token: <TOKEN_JWT>`
* **Body:**
    ```json
    {
      "title": "Título del post",
      "category": "Tecnología",
      "content": "Contenido del artículo..."
    }
    ```

### Eliminar Post (Privado)
* **URL:** `/api/posts/:id`
* **Método:** `DELETE`
* **Headers:** `x-auth-token: <TOKEN_JWT>`