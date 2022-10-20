require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

//import routes
const boardsRoute = require('./routes/boards')
const levelsRoute = require('./routes/levels')
const subjectCategorysRoute = require('./routes/subjectCategorys')
const subjectsRoute = require('./routes/subjects')
const questionTypesRoute = require('./routes/questionTypes')
const questionsRoute = require('./routes/questions')
const usersRoute = require('./routes/users')
const topicsRoute = require('./routes/topics')
const savedPapersRoute = require('./routes/savedPapers')

//Routes
app.use('/boards', boardsRoute)
app.use('/levels', levelsRoute)
app.use('/subjectCategorys', subjectCategorysRoute)
app.use('/subjects', subjectsRoute)
app.use('/questionTypes', questionTypesRoute)
app.use('/questions', questionsRoute)
app.use('/users', usersRoute)
app.use('/topics', topicsRoute)
app.use('/savedPapers', savedPapersRoute)

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, () => {
        console.log('Connected to Database')
    }
)

//Setting DB Port
app.listen(5000)