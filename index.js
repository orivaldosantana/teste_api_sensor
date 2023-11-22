// index.js
const ss = require('simple-statistics')
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const cors = require('cors')

const PORT = 3002

/* Obtem os dados vindos do banco de dados e organiza de modo que cada
   hora do dia tenha sua respectiva leitura. O banco de dados pode conter 
   várias leituras em um intervalo de uma hora. Este código junta todas 
   leituras que ocorrerm em uma determinda hora, calcula a mediana e no final 
   associa cada hora com sua respectiva leitura. 
*/
function filterSensorData(rawData) {
  const filteredData = []
  const aggregatedData = {}
  const filteredAggregatedData = []
  // passa por cada registro vindo do banco de dados
  for (const e of rawData) {
    // criar uma variável hora para seu respectivo registro do bd
    const tmpDate = new Date(e.createdAt)
    // define uma string simplificada apenas com dia, mês e hora 
    // o método 'getMonth' retorna valores entre 0 e 11
    const fd = {
      time: `${tmpDate.getUTCDate()}/${
        tmpDate.getMonth() + 1
      } ${tmpDate.getHours()}h`,
      value: e.value
    }
    // adiciona as leituras, formatadas como data simples, em um vetor
    filteredData.push(fd)
    // num discionário, criar um vetor para cada string de data simplificada
    if (aggregatedData[fd.time] === undefined) {
      aggregatedData[fd.time] = []
    }
    // adiciona cada leitura em seu respectivo vetor
    aggregatedData[fd.time].push(fd.value)
  }
  // Adiciona num vetor a mediana da leitura do sensor e
  // sua respectiva data simplificada
  for (const p in aggregatedData) {
    filteredAggregatedData.push({
      time: p,
      value: ss.median(aggregatedData[p])
    })
  }
  return filteredAggregatedData
}

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

    res.json(filterSensorData(acessos))
  } catch (error) {
    console.error('Erro ao obter acessos:', error)
    res.status(500).send('Erro interno do servidor')
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
