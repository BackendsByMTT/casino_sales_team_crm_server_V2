const FirstDepositByAgent = require("../models/FirstDepositByAgentSchema");

const addFirstDepositByAgent = async (req, res) => {
    const { desg } = req;
    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    try {
        const { cashIn, cashOut, net } = req.body;

        if (await FirstDepositByAgent.findOne({ cashIn }))
            return res.status(201).json({ status: false, error: "Can't Add" });

        const FirstDepositDetails = await FirstDepositByAgent.create({
            cashIn,
            cashOut,
            net
        });

        return res.status(200).json({ status: true, message: "Added successful!", FirstDepositDetails: FirstDepositDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFirstDepositsByAgent = async (req, res) => {
    try {
        const FirstDepositList = await FirstDepositByAgent.find();
        return res.status(200).json({ status: true, FirstDepositList });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFirstDepositByAgent = async (req, res) => {
    const { cashIn } = req.params;

    try {
        const firstDepositDetails = await FirstDepositByAgent.find({ cashIn });
        if (firstDepositDetails.length === 0) {
            return res.status(404).json({ status: false, error: 'Not found' });
        }

        return res.status(200).json({ status: true, firstDepositDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateFirstDepositByAgent = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant update' });

    const { cashIn } = req.params;
    const { cashOut, net } = req.body;

    try {
        const updatedDetails = {
            cashIn,
            cashOut,
            net
        }

        const updatedDeposit = await FirstDepositByAgent.findOneAndUpdate({ cashIn }, updatedDetails, { new: true });

        if (!updatedDeposit) {
            return res.status(404).json({ status: false, error: 'Not found' });
        }

        return res.status(200).json({ status: true, message: 'Details updated successfully', updatedDeposit });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteFirstDepositByAgent = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant delete' });
    const { cashIn } = req.params;

    try {
        const deletedDeposit = await FirstDepositByAgent.findOneAndDelete({ cashIn });

        if (!deletedDeposit) {
            return res.status(404).json({ status: false, error: 'Not found' });
        }

        return res.status(200).json({ status: true, message: 'Deleted successfully', deletedDeposit });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

module.exports = { addFirstDepositByAgent, getFirstDepositsByAgent, getFirstDepositByAgent, updateFirstDepositByAgent, deleteFirstDepositByAgent }