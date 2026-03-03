# 🤖 AI Influencer Studio

<img width="409" height="637" alt="image" src="https://github.com/user-attachments/assets/c7419563-3f90-49b0-a625-592759e39e7c" />


**AI Influencer Studio** es una plataforma de vanguardia que permite a creadores y agencias generar contenido multimedia de influencers altamente realista utilizando Inteligencia Artificial Generativa. Combina una interfaz web elegante con un potente motor de automatización en n8n.

## ✨ Características Principales

- **Consistencia Visual:** Mantiene la apariencia del personaje, el escenario y el producto en todas las generaciones.
- **Generación Multimodal:** Crea tanto imágenes estáticas como videos animados (Google Veo 3.1).
- **Ingeniería de Prompts Automatizada:** Un agente de IA (GPT-4o) traduce instrucciones simples en prompts técnicos complejos.
- **Notificaciones Automáticas:** Recibe los resultados directamente en tu correo electrónico.
- **Interfaz Premium:** Diseño moderno basado en Glassmorphism con previsualización en tiempo real.

## 🚀 Tecnologías

### Frontend
- HTML5, CSS3 (Custom Design System), Vanilla JavaScript.
- **Estética:** Glassmorphism, animaciones fluidas y diseño responsivo.

### Automatización (n8n Workflow)
- **Orquestación:** n8n.
- **IA Generativa:** 
  - GPT-4o mini (Razonamiento y Prompts).
  - Nano-Banana (Edición de Imagen).
  - Google Veo 3.1 (Generación de Video).
- **Integraciones:** Gmail API, n8n Data Tables.

## 🛠️ Instalación y Uso

### Requisitos Previos
- Docker y Docker Compose.
- Una instancia de n8n activa.
- Credenciales para OpenAI y Kie AI.

### Despliegue Local
1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio>
   cd influencer-studio
   ```
2. Levanta el contenedor:
   ```bash
   docker-compose up -d
   ```
3. Configura tu Webhook de n8n en `main.js`:
   ```javascript
   const N8N_WEBHOOK_URL = 'TU_URL_DE_WEBHOOK_AQUÍ';
   ```

## 📂 Estructura del Proyecto

```text
├── assets/             # Recursos visuales
├── index.html          # Interfaz principal
├── index.css           # Estilos (Design System)
├── main.js             # Lógica del cliente
├── DOCUMENTACION.md    # Detalles técnicos profundos
├── Dockerfile          # Configuración de contenedor
└── docker-compose.yml  # Orquestación de servicios
```

## 📄 Documentación
Para detalles más técnicos sobre el flujo de n8n y la arquitectura de datos, consulta el archivo [DOCUMENTACION.md](./DOCUMENTACION.md).

---
Desarrollado con ❤️ para la nueva era de contenido digital.
