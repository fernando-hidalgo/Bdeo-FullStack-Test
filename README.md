# Sequence Angular Tech Test

## Configuración Inicial
### Backend
-   En primer lugar, se debe correr el comando `npm i` en la carpeta donde se localiza el package.json, para instalar las dependecias
-   Será necesario descargar MongoDB en el equipo, iniciar el programa (recomendado el uso de Mongo Compass) e iniciar la conexión al servidor local
-   Se incia el servidor de Node mediante el comando `nest start`, ubicandose en [http://localhost:3000/](http://localhost:3000/)

### Frontend

-   En primer lugar, se debe correr el comando `npm i` en la carpeta donde se localiza el package.json, para instalar las dependecias
-   Finalmente, se arranca el proyecto Angular mediante `ng serve`, el proyecto está configurado para consumir el servidor ubicado en localhost:3000 como apiRest

## Documentación

### Resumen

La prueba consiste en la creación de un gestor de tareas, con capacidad para listarlas, editarlas y eliminarlas. Dichas tareas pueden presentar solo 3 estados (To Do, In Progress y Done)

### Backend (Nest)

Como framework para el backend se ha optado por Nest, al ser con el que más comodo me siento. En concreto, la API cuenta con los siguientes endpoints:
- findAll() : Devulve todas las tareas
- findOne() : Devuelve una tarea concreta
- create() : Crea una tarea
- update() : Modifica una tarea
- delete() : Elimina una tarea

Todos los endpoints están envueltos en estructuras `try-catch`, para el correcto tratmiento de los errores, así como totalmente documentados mediante Swagger, accesible en la direccón [http://localhost:3000/api](http://localhost:3000/api)

Para la interacción de dichos endpoints con la base de datos, se recurre a la librería Mongoose y, mediante un schema que define los campos del documento task, se construyen las consultas a la BD. Asímismo, para la transmisión de datos entre el frontend y el backend, se definen modelos DTO para la correcta construcción y validación de los elementos tratados

### Frontend (Angular)

### Componentes y Vistas

La gestión de los componentes se ha realizado dividiéndolos entre aquellos reutilizables, ubicados en la carpeta _components_, siguiendo la nomenclatura _c-NOMBRE_. Para este caso, se cuenta con un componente de esta índole, denominado _c-song-card_, una carta donde se muestra información de la tarea

Por otro lado, los componentes que hacen las veces de vistas, ubicados en la carpeta _views_, siguiendo la nomenclatura _v-NOMBRE_. Para este caso, existen 2 vistas, cada una relacionada con las funcionalidades implementadas

-   v-home: Vista inicial donde se muestra el listado de canciones
-   v-task-crud: Vista CRUD para la creación de una nueva tarea, o edición de una ya existente, mediante el uso de un formulario

### Formulario

El formulario está principalmente construido mediante el uso de componentes de la librería Angular Material, de rápida configuración y convenientemente mantenida por Google. Además dichos campos cuentan con validaciones por defecto, aunque se han incluido otras como campos requeridos, así validaciones para el correcto flujo de los estados de las tareas (To Do <-> In Progress <-> Done, NUNCA To Do <-> Done), así como el requisito de solo permitir la edición del título en las tareas con estado To Do

En concreto, se ha optado por recurrir a inputs de texto básico, textarea y selector (dropdown) para los 3 estados

### Services

La interacción con el backend se ha realizado mediante la creación de un servicio por cada una de las vistas, con los endpoints necesarios para nutrir al frontend de los datos.

Cada endpoint recurre a un archivo de constantes para conocer la ruta en cuestión, facilitando el mantenimiento del proyecto y la escalabilidad y, de la misma manera, al host en el que se encuentre el backend, dejándolo preparado para despegarlo en un futuro

### Lazy Loading

Se ha configurado el routing de las vistas para funcionar mediante Lazy Loading, permitiendo así una mayor velocidad de respuesta y una escalabilidad más aproximada a la realidad según el proyecto crezca

### i18n

El proyecto se encuentra configurado para la internacionalización mediante la librería `ngx-translate`

Una vez añadidos los módulos correspondientes, se crea un archivo .json por cada uno de los idiomas disponibles (para este caso, solo se ha requerido el español), donde se alojan los literales a mostrar. En cada una de las vistas, se recurre a dichos literales mediante la estructura `{{LANGUAGE.LITERAL | translate}}`

### CSS
Para el estilado, se ha recurrido a SCSS (Sass: Syntactically Awesome Style Sheets), por las capacidades extra que aporta frente a CSS convencional, con el anidamiento de las clases.

Para facilitar dicho anidamiento, se usa una nomenclatura padre-hijo para las clases, por ejemplo

-   div padre -> class="card"
-   div hijo -> class="card__content"

El diseño en escritorio se muestra apegado a la vista móvil, siendo esta responsiva en múltiples dispositivos

### Testing
Para el testing, se ha utilizado la herramienta Karma Jasmine, opción por defecto de Agular, desarrollando tests para las nuevas vistas, componentes y servicios de interacción con el backend. En el caso del backend, el testing se ha realizado con Jest

## Mejoras Futuras
En caso de contar con más tiempo para el desarrollo de la prueba, sería conveniente añadir elementos de alerta al usuario, según sus interacciones (toasts)
Asímismo, pero mejorar aún más la escalabilidad del proyecto, la inclusón de gestión de estados mediante NgRx, para reducir el tiempo de respuesta de la aplicación en las constantes consultas al backend
