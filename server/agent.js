import mongoose from 'mongoose';

import Agents from './model/agent.js';


export const getAgents = async (req, res) => {      // done
    try {
        const agentList = await Agents.find();
        res.status(200).json({ data: agentList });
        console.log(req.url);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad Request" });
    }
}

export const getAgent = async (req, res) => {   // done
    try {
        const { id } = req.params;
        const agentList = await Agents.find({ _id: id });
        res.status(200).json(agentList);
        console.log(req.url);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad Request" });
    }
}

export const createAgent = async (req, res) => {        // Done
    const { name, availableFrom, availableTo, availableDay, email } = req.body;
    try {
        const newAgent = new Agents({ name, availableFrom, availableTo, availableDay, email });

        await newAgent.save();
        res.status(200).json(newAgent);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad Request" });
    }
}

export const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { name, availableFrom, availableTo, availableDay, email } = req.body;
    try {

        const updated = await Agents.findOneAndUpdate({ _id: id }, req.body)

        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad Request" });
    }
}



export const deleteAgent = async (req, res) => {    // Done
    try {
        const { id } = req.params;
        await Agents.deleteOne({ _id: id });
        res.status(200).json({ message: "Deleted Successfully" });
        console.log(req.url);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad Request" });
    }
}

export const getAgentByTime = async (req, res) => {
    try {
        const { day, time } = req.query;

        if (day == '') {
            res.status(200).json(await Agents.find());
        }

        else {
            const list = await Agents.find({
                availableDay: day
            });
            const t = parseInt(time);
            const neList = list.filter((agent) => {
                const a = parseInt(agent.availableFrom);
                const b = parseInt(agent.availableTo);
                if (a <= t && t <= b) return true;
                return false;
            })
            res.status(200).json(neList);
        }
        console.log(req.url);
    } catch (error) {
        console.log(error.message);
        res.send({ message: "Bad Request" })
    }
}

/*
,
            availableFrom:{$lte:parseInt(time)},
            availableTo:{$gt:parseInt(time)}
*/