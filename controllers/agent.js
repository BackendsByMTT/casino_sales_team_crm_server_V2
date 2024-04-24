const FreshMessage = require("../models/FreshMessageSchema");
const AgentSchema = require("../models/AgentSchema")

//FreshMessage
const addFreshMessage = async (req, res) => {

    const { date, agentName, systemNumber, accountName, playerId, remarks } = req.body;
    try {
        if (await FreshMessage.findOne({ agentName }))
            return res.status(201).json({ status: false, error: "This agent name is not avaiable" });

        const freshMessage = await FreshMessage.create({
            date,
            agentName,
            systemNumber,
            accountName,
            playerId,
            remarks
        });

        return res.status(200).json({ status: true, message: "Fresh Message added successful!", freshMessage: freshMessage });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFreshMessages = async (req, res) => {
    try {
        const freshMessageList = await FreshMessage.find();
        return res.status(200).json({ status: true, freshMessageList });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFreshMessageDetails = async (req, res) => {
    const { agentName } = req.params;
    try {
        const freshMessageDetails = await FreshMessage.find({ agentName });
        if (!freshMessageDetails) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, freshMessageDetails: freshMessageDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }

}

const updateFreshMessage = async (req, res) => {
    const { agentName } = req.params;
    const { date, systemNumber, accountName, playerId, remarks } = req.body;

    try {
        const updatedDetails = {
            date,
            agentName,
            systemNumber,
            accountName,
            playerId,
            remarks
        }

        const updatedFreshMessage = await FreshMessage.findOneAndUpdate({ agentName }, updatedDetails, { new: true });

        if (!updatedFreshMessage) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, message: 'Agent details updated successfully', updatedFreshMessage: updatedFreshMessage });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteFreshMessage = async (req, res) => {
    const { desg } = req;

    if (desg === "Agent")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { agentName } = req.params;

    try {
        const deletedFreshMessage = await FreshMessage.findOneAndDelete({ agentName });

        if (!deletedFreshMessage) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, message: 'Agent deleted successfully', deletedFreshMessage: deletedFreshMessage });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}


//first deposit and free to play
const addAgent = async (req, res) => {

    const { name } = req.params;

    if (name !== 'firstdeposit' && name !== 'freetoplay')
        return res.status(400).json({ status: false, error: "Invalid Request!" });

    const { agentName, customerName, gameName, amountOfCoins, accountName, date, remarks } = req.body;
    try {
        if (await AgentSchema.findOne({ name, agentName }))
            return res.status(201).json({ status: false, error: "This agent name is not avaiable" });

        const agent = await AgentSchema.create({
            name,
            agentName,
            customerName,
            gameName,
            amountOfCoins,
            accountName,
            date,
            remarks
        });

        return res.status(200).json({ status: true, message: "Agent added successfully!", agent: agent });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getAgents = async (req, res) => {
    const { name } = req.params;

    if (name !== 'firstdeposit' && name !== 'freetoplay')
        return res.status(400).json({ status: false, error: "Invalid Request!" });

    try {
        const agentList = await AgentSchema.find({ name });
        return res.status(200).json({ status: true, agentList });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getAgentDetails = async (req, res) => {
    const { name, agentName } = req.params;

    if (name !== 'firstdeposit' && name !== 'freetoplay')
        return res.status(400).json({ status: false, error: "Invalid Request!" });

    try {
        const agentDetails = await AgentSchema.find({ name, agentName });
        if (agentDetails.length === 0) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, agentDetails: agentDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateAgent = async (req, res) => {

    const { name, agentName } = req.params;
    const { customerName, gameName, amountOfCoins, accountName, date, remarks } = req.body;

    if (name !== 'firstdeposit' && name !== 'freetoplay')
        return res.status(400).json({ status: false, error: "Invalid Request!" });

    try {

        const updatedDetails = {
            name,
            agentName,
            customerName,
            gameName,
            amountOfCoins,
            accountName,
            date,
            remarks,
        }

        const updateAgentDetails = await AgentSchema.findOneAndUpdate({ name, agentName }, updatedDetails, { new: true });
        if (!updateAgentDetails) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, agentDetails: updateAgentDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteAgent = async (req, res) => {
    const { desg } = req;

    if (desg === "Agent")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { name, agentName } = req.params;

    if (name !== 'firstdeposit' && name !== 'freetoplay')
        return res.status(400).json({ status: false, error: "Invalid Request!" });

    try {
        const deletedAgent = await AgentSchema.findOneAndDelete({ name, agentName });

        if (!deletedAgent) {
            return res.status(404).json({ status: false, error: 'Agent not found' });
        }

        return res.status(200).json({ status: true, message: 'Agent deleted successfully', deletedAgent: deletedAgent });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

module.exports = { addFreshMessage, getFreshMessages, getFreshMessageDetails, updateFreshMessage, deleteFreshMessage, addAgent, getAgents, getAgentDetails, updateAgent, deleteAgent }