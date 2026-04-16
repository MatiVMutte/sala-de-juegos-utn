# Sala de Juegos - UTN Avellaneda

Este repositorio contiene el desarrollo de la aplicación **"Sala de Juegos"**, correspondiente al Trabajo Práctico N°1 de la asignatura **Programación IV**. El objetivo del proyecto es proporcionar una plataforma donde los usuarios puedan medir sus capacidades cognitivas y motrices a través de una interfaz intuitiva que registre estadísticas detalladas de cada sesión.

---

## Especificaciones Técnicas

La aplicación se ha desarrollado siguiendo los lineamientos técnicos y las restricciones de diseño establecidas en el programa de la materia:

* **Frontend:** Desarrollado con el framework **Angular**.
* **Servidor y Persistencia:** Integración con **Supabase** para la gestión de bases de datos y servicios de autenticación.
* **Interfaz de Usuario (UI):**
    * Uso de librerías de estilos para un diseño uniforme.
    * Restricción estricta sobre el uso de `alert()`; todas las notificaciones y mensajes se gestionan mediante **modales**.
* **Despliegue:** La aplicación se encuentra alojada en una plataforma de hosting (Vercel, Firebase u otro).

---

## Funcionalidades Principales

1. **Gestión de Usuarios:** Sistema de autenticación que permite el registro e inicio de sesión seguro, con persistencia de datos.
2. **Sala de Chat:** Espacio de comunicación global en tiempo real para usuarios autenticados, con diferenciación visual de mensajes propios y registro de fecha/hora.
3. **Lógica de Juegos:**
    * **Ahorcado:** Sistema de selección de letras mediante botones en pantalla, sin entrada de teclado físico.
    * **Mayor o Menor:** Juego de predicción basado en una baraja de naipes.
    * **Preguntados:** Sistema de trivia que consume datos dinámicos a través de una API externa.
    * **Juego Propio:** Desarrollo original bajo reglas específicas de capacidad cognitiva, excluyendo formatos prohibidos como Tatetí o Memotest.
4. **Estadísticas y Resultados:** Listados detallados con el desempeño de los jugadores en cada juego, ordenados jerárquicamente.

---

## Hoja de Ruta del Desarrollo (Sprints)

El desarrollo del proyecto se estructura en fases incrementales de una semana de duración:

* **Sprint #1:** Configuración inicial, despliegue y creación del componente informativo "Quién Soy" con integración de la **API de GitHub**.
* **Sprint #2:** Implementación del núcleo de autenticación, validación de usuarios y lógica de navegación condicional.
* **Sprint #3:** Desarrollo de los juegos iniciales (Ahorcado y Mayor o Menor) y la infraestructura del Chat global.
* **Sprint #4:** Integración de la API de preguntas, desarrollo del juego propio y finalización de los paneles de resultados.

---

## Datos del Alumno

La sección **"Quién Soy"** dentro de la aplicación presenta la información académica del autor:

* **Nombre:** Matías Valentín Mutte.
* **Carrera:** Tecnicatura Universitaria en Programación.
* **Institución:** Universidad Tecnológica Nacional - Facultad Regional Avellaneda (UTN).
* **Integración:** Datos personales y de perfil recuperados dinámicamente desde la API oficial de GitHub.

---

## Licencia

Este proyecto se distribuye bajo los términos de la licencia **MIT**.
