# Documentación Técnica: AI Influencer Studio

Este documento detalla la arquitectura, tecnologías y el flujo de trabajo del proyecto **AI Influencer Studio**, una plataforma automatizada para la generación de contenido multimedia para influencers utilizando Inteligencia Artificial.

---

## 🛠️ Stack Tecnológico

### **Frontend**
- **HTML5 & CSS3:** Estructura y diseño basado en **Glassmorphism** (efecto de vidrio esmerilado) para una estética premium y moderna.
- **Vanilla JavaScript:** Lógica de cliente sin frameworks pesados, manejando la captura de archivos y comunicación asíncrona.
- **Google Fonts (Outfit):** Tipografía moderna y minimalista.
- **FontAwesome:** Iconografía vectorial para la interfaz.

### **Backend & Orquestación (n8n)**
- **n8n Workflow:** El núcleo que conecta todas las piezas.
- **LangChain + OpenAI (GPT-4o mini):** Razonamiento de IA para generación de prompts y estructuración de contenido.
- **Kie AI APIs:** 
    - Generación de imágenes (Nano-Banana).
    - Generación de video (Google Veo 3.1).
    - Hosting temporal de archivos base64.
- **n8n Data Tables:** Base de datos interna para persistencia de tareas y resultados.
- **Gmail API:** Sistema de notificaciones por correo electrónico.

### **Infraestructura**
- **Docker & Docker Compose:** Contenedorización para un despliegue sencillo y consistente.

---

## 🎨 Arquitectura del Frontend

El frontend actúa como el portal de entrada de datos primarios.

1. **Sistema de Drop-Zones:** Implementación de zonas de arrastre con previsualización en tiempo real usando el `FileReader` de JavaScript.
2. **Gestión de FormData:** Captura de archivos binarios y campos de texto (email, instrucciones, relación de aspecto).
3. **Comunicación Webhook:** Envío de datos mediante `fetch` al endpoint de producción de n8n.
4. **Diseño Responsivo:** Adaptabilidad para dispositivos móviles y escritorio mediante Media Queries y un sistema de cuadrícula flexible.

---

## ⚙️ Flujo Lógico en n8n (El Workflow)

El flujo de trabajo se divide en etapas críticas que transforman una idea en contenido multimedia final:

### **Fase 1: Ingesta de Datos y Vínculos**
*   **Webhook Trigger:** Punto de entrada que recibe las imágenes y parámetros del sitio web.
*   **Binario a Propiedad:** Extracción de las imágenes del flujo binario para su procesamiento.
*   **Upload Base64:** Las imágenes se suben a una URL pública temporal para que los modelos de IA puedan acceder a ellas mediante enlaces HTTP.

### **Fase 2: Inteligencia Creativa**
*   **AI Agent (GPT-4o mini):** Procesa la "Dirección Creativa" del usuario junto con los nombres de los archivos de referencia.
*   **Structured Output Parser:** Obliga a la IA a devolver un JSON con campos específicos: `titulo`, `descripcion`, `prompt_imagen` y `prompt_video`. Esto garantiza que los siguientes nodos siempre reciban datos válidos.
*   **Tool 'Think':** Permite al modelo de lenguaje razonar internamente antes de generar la respuesta final.

### **Fase 3: Generación de Imagen (Edit Lab)**
*   **Generar Imagen:** Se envía una petición a la API de Kie AI usando el modelo `google/nano-banana-edit`. Este modelo toma el personaje, el escenario y el producto para crear una imagen compuesta coherente.
*   **Wait & Poll:** El flujo espera a que la generación termine (proceso asíncrono) para descargar el resultado.

### **Fase 4: Generación de Video (Google Veo)**
*   **Filtrado:** El sistema identifica si el post requiere video según la respuesta del Agente AI.
*   **Veo 3.1 Integration:** Toma la imagen generada en el paso anterior como referencia visual clave y aplica el prompt de video para crear una animación cinematográfica.

### **Fase 5: Persistencia y Notificación**
*   **Data Table:** Se registra cada publicación con su estado (`programado` o `listo`), links multimedia y metadatos.
*   **Gmail Notification:** Al finalizar todo el proceso, se envía un correo al usuario con el enlace directo al contenido generado para su descarga o revisión.

---

## 🚀 Cómo se logró la Integración

1.  **Consistencia de Personaje:** Se logró enviando las 3 imágenes de referencia (personaje, fondo, objeto) simultáneamente al modelo de edición, permitiendo que la IA entienda la relación espacial entre ellos.
2.  **Automatización de "Punta a Punta":** Al usar n8n como orquestador, el usuario solo necesita hacer clic en un botón en la web y esperar el correo, eliminando toda la complejidad técnica manual.
3.  **JSON Schema:** El uso de esquemas manuales en el parseador de salida asegura que el sistema nunca falle por un "formato de respuesta inesperado" de la IA.

---
*Documentación generada por el equipo de desarrollo de AI Influencer Studio.*
