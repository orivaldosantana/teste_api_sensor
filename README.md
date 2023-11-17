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

## Referência

- [Teste com MQTT e Banco de Dados com NodeJS](https://github.com/orivaldosantana/teste_mqtt_nodejs_bd)
- [Teste com Prisma NodeJS](https://github.com/orivaldosantana/teste_prisma_nodejs)
