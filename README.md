# SmartTrack  
**SmartTrack** é um sistema desenvolvido para cidades inteligentes, integrando dados de **quatro tipos de sensores**:

- **Contador de pessoas**  
- **Temperatura**  
- **Luminosidade**  
- **Umidade**  

A aplicação centraliza e organiza os dados capturados pelos sensores, permitindo que administradores monitorem e manipulem todas as informações em tempo real. Com isso, é possível tomar decisões mais eficientes para otimizar recursos urbanos, melhorar a qualidade de vida dos cidadãos e garantir uma gestão inteligente da infraestrutura da cidade.

## Tecnologias do projeto  
- Django
- React
- MySQL

## Para executar  

### BackEnd  
- Certifique-se de ter o Python instalado na máquina
- Instale um ambiente virtual (venv)
- Instale as dependências do arquivo `requirements.txt`
- Configure suas credenciais no arquivo `settings.py` para conexão com MySQL Workbench
- Execute os seguintes comandos:

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

#### Comando para criar o banco de dados
```
CREATE DATABASE smart_city_db;
```

### FrontEnd
- Tenha o Node.js instalado na máquina
- Execute os seguintes comandos:

```sh
npm i
npm run dev
```

### Link da documentação 
https://documenter.getpostman.com/view/41931861/2sB2x5Frw4

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
