// index.js

const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const PORT = 3000

app.use(express.json())

// Rota raiz
app.get('/', (req, res) => {
  res.send('Express app - Teste API Sensores!')
})

// Rota para obter acessos entre duas datas
app.get('/acessos', async (req, res) => {
  try {
    const { sensorId, dataInicio, dataFim } = req.query

    const acessos = await prisma.reading.findMany({
      where: {
        sensorId: parseInt(sensorId),
        createdAt: {
          gte: new Date(dataInicio),
          lte: new Date(dataFim)
        }
      }
    })

    res.json(acessos)
  } catch (error) {
    console.error('Erro ao obter acessos:', error)
    res.status(500).send('Erro interno do servidor')
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
