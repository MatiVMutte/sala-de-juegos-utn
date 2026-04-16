# Sala de Juegos - UTN Avellaneda

[cite_start]Este repositorio contiene el desarrollo de la aplicación **"Sala de Juegos"**, correspondiente al Trabajo Práctico N°1 de la asignatura **Programación IV**[cite: 1, 4]. [cite_start]El objetivo del proyecto es proporcionar una plataforma donde los usuarios puedan medir sus capacidades cognitivas y motrices a través de una interfaz intuitiva que registre estadísticas detalladas de cada sesión[cite: 8].

---

## Especificaciones Técnicas

[cite_start]La aplicación se ha desarrollado siguiendo los lineamientos técnicos y las restricciones de diseño establecidas en el programa de la materia[cite: 14, 19, 20]:

* [cite_start]**Frontend:** Desarrollado con el framework **Angular**[cite: 19].
* [cite_start]**Servidor y Persistencia:** Integración con **Supabase** para la gestión de bases de datos y servicios de autenticación[cite: 20, 21].
* **Interfaz de Usuario (UI):**
    * [cite_start]Uso de librerías de estilos como **Tailwind**[cite: 43].
    * [cite_start]Restricción estricta sobre el uso de `alert()`; todas las notificaciones y mensajes se gestionan mediante **modales**[cite: 15].
* [cite_start]**Despliegue:** La aplicación se encuentra alojada en una plataforma de hosting (Vercel, Firebase u otro)[cite: 54].

---

## Funcionalidades Principales

1.  [cite_start]**Gestión de Usuarios:** Sistema de autenticación que permite el registro e inicio de sesión seguro, con persistencia de datos[cite: 21, 80, 86].
2.  [cite_start]**Sala de Chat:** Espacio de comunicación global en tiempo real para usuarios autenticados, con diferenciación visual de mensajes propios y registro de fecha/hora[cite: 35, 36, 110].
3.  **Lógica de Juegos:**
    * [cite_start]**Ahorcado:** Sistema de selección de letras mediante botones en pantalla, sin entrada de teclado físico[cite: 93, 95].
    * [cite_start]**Mayor o Menor:** Juego de predicción basado en una baraja de naipes[cite: 97, 99].
    * [cite_start]**Preguntados:** Sistema de trivia que consume datos dinámicos a través de una API externa[cite: 111, 114].
    * [cite_start]**Juego Propio:** Desarrollo original bajo reglas específicas de capacidad cognitiva, excluyendo formatos prohibidos (Tatetí, Memotest, etc.)[cite: 26, 27, 31, 32].
4.  [cite_start]**Estadísticas y Resultados:** Listados detallados con el desempeño de los jugadores en cada juego, ordenados jerárquicamente[cite: 46, 123, 126].

---

## Hoja de Ruta del Desarrollo (Sprints)

[cite_start]El desarrollo del proyecto se estructura en fases incrementales de una semana de duración[cite: 7, 51]:

* [cite_start]**Sprint #1:** Configuración inicial, despliegue y creación del componente informativo "Quién Soy" con integración de la **API de GitHub**[cite: 52, 61].
* [cite_start]**Sprint #2:** Implementación del núcleo de autenticación, validación de usuarios y lógica de navegación condicional[cite: 70, 78, 84].
* [cite_start]**Sprint #3:** Desarrollo de los juegos iniciales (Ahorcado y Mayor o Menor) y la infraestructura del Chat global[cite: 89, 93, 97, 103].
* [cite_start]**Sprint #4:** Integración de la API de preguntas, desarrollo del juego propio y finalización de los paneles de resultados[cite: 107, 111, 119, 123].

---

## Datos del Alumno

[cite_start]La sección **"Quién Soy"** dentro de la aplicación presenta la información académica del autor[cite: 47, 59]:

* **Nombre:** Matías Valentín Mutte.
* [cite_start]**Carrera:** Tecnicatura Universitaria en Programación[cite: 3].
* [cite_start]**Institución:** Universidad Tecnológica Nacional - Facultad Regional Avellaneda (UTN)[cite: 2, 3].
* [cite_start]**Integración:** Datos personales y de perfil recuperados dinámicos desde la API oficial de GitHub[cite: 61, 64].

---

## Licencia

Este proyecto se distribuye bajo los términos de la licencia **MIT**.
