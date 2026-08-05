# ACBB — Mockups HTML · Panel del Funcionario Académico

Contexto e instrucciones para la construcción de los mockups en HTML del
prototipo ACBB.

Proyecto: Prototipo de aplicación web para la gestión de los procesos académicos
de Cancelación de Matrícula, Cancelación de Asignatura y Examen Supletorio —
FIET, Universidad del Cauca.

Autor: Andersson Camilo Bonilla Belalcazar

---

## 1. Alcance de este documento

Especifica únicamente el panel del **Funcionario Académico**. Los paneles de
Estudiante y Decano no están cubiertos.

Los mockups son estáticos e interactivos en HTML de archivo único. No hay
backend. Los datos son de ejemplo.

## 2. Actores y procesos

Actores del sistema: **Estudiante**, **Funcionario Académico**, **Decano**.

Procesos académicos: **Cancelación de Matrícula**, **Cancelación de Asignatura**,
**Examen Supletorio**.

Escribir siempre los nombres de actores y de procesos con esta capitalización
exacta. No alternar mayúsculas y minúsculas.

## 3. Modelo de estados (panel del Funcionario)

Los estados son relativos al actor. El sistema almacena dos campos internos —
`Responsable Actual` y `Decisión` — y de ellos deriva la etiqueta visible.

| Estado | Significado | Acción esperada del Funcionario |
|---|---|---|
| Pendiente | La solicitud acaba de llegar del Estudiante | Revisar y remitir al Decano, o rechazar |
| En Gestión | No es su turno | Ninguna; seguimiento |
| Pendiente de Respuesta | El Decano ya decidió y devolvió el trámite | Enviar la respuesta al Estudiante |
| Pendiente de Verificación | El Estudiante subió el comprobante de pago | Verificar el comprobante y cerrar |
| Respondida | Trámite cerrado | Ninguna; solo consulta |

Estados por proceso académico:

- Cancelación de Matrícula y Cancelación de Asignatura: Pendiente, En Gestión,
  Pendiente de Respuesta, Respondida.
- Examen Supletorio: los cuatro anteriores más Pendiente de Verificación.

`Pendiente de Verificación` **no existe** para los procesos de cancelación. El
filtro por estado debe reflejar esta dependencia (ver sección 5.3).

`En Gestión` agrupa deliberadamente dos situaciones: espera del Decano y espera
del Estudiante. Decisión declarada; no desambiguar en la tabla.

## 4. Estructura del menú

El menú lateral del Funcionario Académico tiene **exactamente tres ítems**. No
agregar ninguno más.

1. **Mi Usuario**
2. **Solicitudes**
3. **Respuestas**

## 5. Vista: Solicitudes

### 5.1. Contenido

Tabla única con **todas las solicitudes activas** asignadas al Funcionario
autenticado, es decir, todas las que **no** están en estado `Respondida`.

Estados presentes en esta vista: `Pendiente`, `En Gestión`,
`Pendiente de Respuesta`, `Pendiente de Verificación`.

Una vez la solicitud pasa a `Respondida`, desaparece de esta vista y aparece en
el módulo Respuestas.

### 5.2. Columnas de la tabla

| Columna | Contenido |
|---|---|
| Nombre del Estudiante | Nombre completo |
| Número de documento | Documento de identidad del Estudiante |
| Tipo de proceso | Cancelación de Matrícula / Cancelación de Asignatura / Examen Supletorio |
| Fecha de radicación | Fecha en que el Estudiante envió la solicitud |
| Estado | Chip de color según sección 3 |
| Acciones | Botones contextuales según el estado |

### 5.3. Filtros

| Filtro | Tipo | Valores |
|---|---|---|
| Tipo de proceso académico | Desplegable | Los procesos asignados al Funcionario autenticado, más "Todos" |
| Estado | Desplegable | Pendiente, En Gestión, Pendiente de Respuesta, Pendiente de Verificación, más "Todos" |
| Número de identificación | Campo de búsqueda | Documento del Estudiante |

El filtro por estado **no debe ofrecer** `Pendiente de Verificación` si el
Funcionario autenticado no tiene asignado el proceso de Examen Supletorio.

El filtro por estado **nunca ofrece** `Respondida` en esta vista.

Debe existir un botón de limpiar filtros que restaure la tabla sin filtros
aplicados.

Cuando la combinación de filtros no arroja resultados, mostrar la tabla vacía
con un mensaje informativo. El estado vacío no debe parecer un error.

### 5.4. Acciones por estado

| Estado | Acciones disponibles |
|---|---|
| Pendiente | Ver detalle · Remitir al Decano · Rechazar |
| En Gestión | Ver detalle |
| Pendiente de Respuesta | Ver detalle · Enviar respuesta al Estudiante |
| Pendiente de Verificación | Ver detalle · Verificar comprobante |

Ninguna acción de gestión debe estar habilitada sobre una solicitud en estado
`En Gestión`: no es el turno del Funcionario.

## 6. Vista: Respuestas

### 6.1. Contenido

Historial de **solo lectura**. Lista todas las solicitudes en estado
`Respondida` de los procesos académicos asignados al Funcionario, con
independencia de si la Decisión fue Aprobado o Rechazado.

Esta vista **no permite ninguna modificación**. No incluir botones de editar,
reabrir, reasignar ni eliminar.

### 6.2. Columnas de la tabla

| Columna | Contenido |
|---|---|
| Nombre del Estudiante | Nombre completo |
| Número de documento | Documento de identidad del Estudiante |
| Tipo de proceso | Cancelación de Matrícula / Cancelación de Asignatura / Examen Supletorio |
| Decisión | Aprobada / Rechazada, diferenciadas visualmente |
| Acciones | Ver detalle · Descargar resolución (condicional) |

### 6.3. Filtros

| Filtro | Tipo | Valores |
|---|---|---|
| Tipo de proceso académico | Desplegable | Los procesos asignados al Funcionario, más "Todos" |
| Decisión | Desplegable | Aprobada, Rechazada, Todos |
| Número de identificación | Campo de búsqueda | Documento del Estudiante |

En esta vista **no aplica un filtro por estado**: todos los registros están en
`Respondida`. El filtro equivalente es el de Decisión.

Mismo comportamiento de limpiar filtros y de estado vacío que en la sección 5.3.

### 6.4. Acciones

**Ver detalle** — siempre disponible. Abre una vista de solo lectura con:

- Los datos de la solicitud y los anexos que adjuntó el Estudiante.
- La respuesta que se envió al Estudiante y sus documentos adjuntos.
- Si la Decisión fue Rechazada: la **observación** que registró el motivo del
  rechazo.

**Descargar resolución** — disponible **únicamente** cuando se cumplen las dos
condiciones:

1. Decisión = Aprobada, y
2. Tipo de proceso = Cancelación de Matrícula **o** Cancelación de Asignatura.

Descarga la resolución asociada a esa solicitud específica. No aparece para
Examen Supletorio ni para solicitudes rechazadas.

## 7. Vista: Mi Usuario

Vista de consulta con la información básica del usuario autenticado: nombre,
documento, rol, correo institucional y procesos académicos asignados.

Sin capacidad de edición salvo que se especifique lo contrario más adelante.

## 8. Estilo visual

El prototipo debe mantener coherencia visual con el sistema JDCE, que convive
en el mismo entorno institucional.

| Elemento | Valor |
|---|---|
| Barra lateral | `#1B2660` |
| Barra superior | Blanca |
| Encabezado de tabla | `#2A3A86`, texto blanco |
| Filas | Cebra alternada |
| Acento (subrayado de pestaña o ítem activo) | `#B23B2E` |

Tipografía sans-serif institucional. Sin sombras pronunciadas ni degradados.

## 9. Reglas transversales

- Toda tabla debe tener paginación, columnas ordenables y un estado vacío con
  mensaje informativo.
- Los mensajes de estado vacío deben distinguirse claramente de los mensajes de
  error.
- Los formularios que exigen adjuntos deben bloquear el envío y mostrar un
  mensaje de validación si falta el archivo obligatorio.
- Formatos aceptados: PDF para resoluciones; PDF, JPG y PNG para comprobantes y
  anexos.

## 10. Funcionalidades explícitamente excluidas

No implementar en el prototipo. Están declaradas como fuera de alcance en el
documento del proyecto.

- Semáforo de antigüedad de solicitudes.
- Devolución al Estudiante para subsanación.
- Reasignación de solicitudes entre funcionarios.

Sí está en alcance la **línea de tiempo del trámite** dentro de la vista de
detalle.

## 11. Cambios respecto a decisiones anteriores

**11.1. El módulo Solicitudes deja de estar dividido en cuatro sub-bandejas.**
La versión previa contemplaba las pestañas *Por revisar*, *Por responder*,
*Por verificar pago* y *En gestión*. Se reemplazan por una tabla única con
filtro por estado. Consecuencia favorable: la columna Estado deja de ser
redundante, lo que sí ocurría dentro de cada pestaña.

**11.2. El módulo Respuestas se confirma como historial de solo lectura.**
Cubre exclusivamente HU-07. No es una bandeja de trabajo activa.

## 12. Puntos abiertos

Pendientes de decisión. No inventar una solución: dejarlos visibles o usar un
marcador de posición evidente.

1. **Número de radicado.** No aparece en las columnas especificadas para
   ninguna de las dos tablas, pero HU-07 Escenario 1 y HU-02 Escenario 1 sí lo
   exigen. Falta además definir el formato de la convención de radicado.
2. **Etiqueta visual de los chips de estado.** Los nombres canónicos de la
   sección 3 son los que van en la documentación y en las HU. Está pendiente
   decidir si el chip de la tabla usa esos mismos nombres o las etiquetas
   cortas `Por Revisar`, `Por Responder`, `Por Verificar`. Mientras no se
   decida, usar los nombres canónicos.
3. **Descarga de resolución.** HU-07 Escenario 2 especifica la descarga de
   **dos copias** en carpetas separadas, DARCA y DECANATURA, identificadas con
   el número de radicado. La especificación de la sección 6.4 menciona una sola
   descarga. Debe unificarse.
4. **Contenido de "Ver detalle" en Respuestas.** Falta precisar exactamente qué
   documentos adjuntos se listan además de la observación de rechazo.
   Cauca.
6. **Campo Programa.** Sin definir si va como columna y filtro de la tabla o
   únicamente en la vista de detalle.