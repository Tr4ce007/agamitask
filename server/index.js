import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import * as API from './agent.js';

const app = express();
const db_url = "mongodb://localhost:27017/agents";

const PORT = 5003;

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());


app.get('/', (req, res) => { res.send("welcome....") });

app.get('/agents',API.getAgents); 
app.get('/agent/:id',API.getAgent); 
app.post('/createAgent',API.createAgent);     
app.put('/updateAgent/:id',API.updateAgent);    
app.delete('/deleteAgent/:id',API.deleteAgent);
app.get('/agentByTime',API.getAgentByTime); 



mongoose.connect(db_url)
.then(() => app.listen(PORT, () => console.log(`Server Running on: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

