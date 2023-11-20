# API Sensores

Teste inicial de como obter dados de sensores através de uma API

# Obtendo o Schema de um BD

Lendo o esquema do banco de dados

```
npx prisma db pull
```

# Criando uma migração inicial

No caso que exista um banco de dados em funcionamento é necessário criar uma migração a partir destes dados.

```
mkdir -p prisma/migrations/0_init
```

Criando o arquivo de migração

```
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

Marcado a migração como aplicada

```
npx prisma migrate resolve --applied 0_init
```

## Instalação do Cliente Prisma

Instalação do pacote

```
npm install @prisma/client
```

Lê o esquema Prisma e gera a biblioteca para o Cliente Prisma.

```
npx prisma generate
```

## Instalação de outros pacotes

Para API

```
npm install express --save
```

```
npm install cors
```

## Utilização de rota

Testando no navegador:

```
http://localhost:3000/acessos?sensorId=1&dataInicio=2023-11-17&dataFim=2023-11-17&horaInicio=00:00:00&horaFim=10:00:00
```

## Referência

- [Vídeo com a explicação geral deste projeto](https://youtu.be/6SIyYjv1eyo)
- [Add Prisma to existing project - Relational databases](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-node-postgresql)
- [Teste com MQTT e Banco de Dados com NodeJS](https://github.com/orivaldosantana/teste_mqtt_nodejs_bd)
- [Teste com Prisma NodeJS](https://github.com/orivaldosantana/teste_prisma_nodejs)
