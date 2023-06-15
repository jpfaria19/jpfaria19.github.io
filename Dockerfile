# Use uma imagem base do Nginx
FROM nginx:latest

# Remova a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie o arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/conf.d/

# Copie os arquivos do site estático para o diretório do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80 para tráfego HTTP
EXPOSE 80

# Execute o Nginx em primeiro plano (foreground)
CMD ["nginx", "-g", "daemon off;"]