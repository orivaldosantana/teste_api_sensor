// index.js

const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const PORT = 3000

app.use(express.json())

// Rota para obter acessos entre duas datas
app.get('/acessos', async (req, res) => {
  try {
    const { userId, dataInicio, dataFim } = req.query

    const acessos = await prisma.acesso.findMany({
      where: {
        userId: parseInt(userId),
        data: {
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
