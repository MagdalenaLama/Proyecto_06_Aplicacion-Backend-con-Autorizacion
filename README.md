# Proyecto 06:

Este proyecto es una aplicación backend desarrollado en Node.js con características como registro de usuarios, inicio de sesión con JWT y manejo de roles.

---

## Características

- Registro de usuarios con validaciones.
- Inicio de sesión con autenticación basada en JWT.
- Gestión de roles para control de acceso.
- Protección de rutas.
- Documentación de la API con Swagger.

---

## Tecnologías Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB con Mongoose
- **Herramientas:**
  - Swagger para documentación
  - Postman para pruebas
  - bcrypt para encriptar contraseñas
  - jsonwebtoken para manejo de tokens

---

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

1. **Node.js**: [Descargar e instalar](https://nodejs.org/)
2. **MongoDB**: [Descargar e instalar](https://www.mongodb.com/try/download/community)
3. **Postman** (opcional): Para probar la API.

---

## Instalación

Sigue estos pasos para configurar el proyecto:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/MagdalenaLama/Proyecto_06_Aplicacion-Backend-con-Autorizacion

   ```

2. Entra en la carpeta del proyecto:

```bash
cd Proyecto_06_Aplicacion-Backend-con-Autorizacion
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```bash
 MONGODB_URI=mongodb+srv://magdalenalamalyon:s1hOqQfWulpGD9BS@cluster0.gwkmf.mongodb.net/Proyecto6_DB?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
SECRET=S_o!ym_uy12_se54c7t_!a
```

5. Inicia el servidor:

```bash
npm start
```

6. Documentación de la API

- **Swagger**: La documentación está disponible en la ruta `/api-docs` una vez iniciado el servidor.
- **Postman**: Desde Postman puedes importar el archivo `Proyecto_06.postman_collection.json` incluido en el repositorio en la carpeta postman.
