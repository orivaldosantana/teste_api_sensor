// index.js

const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')

const PORT = 3002

app.use(express.json())

// Configurar o middleware CORS
app.use(cors())

// Rota raiz
app.get('/', (req, res) => {
  res.send('Express app - Teste API Sensores!')
})

// Rota para obter acessos entre duas datas, incluindo hora
app.get('/acessos', async (req, res) => {
  try {
    const { sensorId, dataInicio, horaInicio, dataFim, horaFim } = req.query

    // Combine data e hora para criar objetos Date
    const startDateTime = new Date(`${dataInicio}T${horaInicio}`)
    const endDateTime = new Date(`${dataFim}T${horaFim}`)

    console.log(`${dataInicio}T${horaInicio} - ${dataFim}T${horaFim}`)

    const acessos = await prisma.reading.findMany({
      where: {
        sensorId: parseInt(sensorId),
        createdAt: {
          gte: startDateTime,
          lte: endDateTime
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
