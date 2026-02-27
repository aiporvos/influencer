# Usar una imagen ligera de Nginx para servir archivos estáticos
FROM nginx:alpine

# Copiar el contenido del proyecto a la carpeta de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80 (estándar para HTTP)
EXPOSE 80

# El comando por defecto de la imagen de Nginx ya inicia el servidor
CMD ["nginx", "-g", "daemon off;"]
