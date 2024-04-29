const FirstDepositByTlAndManager = require("../models/FirstDepositByTlAndManagerSchema");

const addFirstDepositByTlAndManager = async (req, res) => {
    const { desg } = req;
    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    try {
        const { customerName, cashIn, cashOut, net } = req.body;

        if (await FirstDepositByTlAndManager.findOne({ customerName }))
            return res.status(201).json({ status: false, error: "This customer name already exists!" });

        const FirstDepositDetails = await FirstDepositByTlAndManager.create({
            customerName,
            cashIn,
            cashOut,
            net
        });

        return res.status(200).json({ status: true, message: "Added successful!", FirstDepositDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFirstDepositsByTlAndManager = async (req, res) => {
    const { desg } = req;
    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    try {
        const FirstDepositList = await FirstDepositByTlAndManager.find();
        return res.status(200).json({ status: true, FirstDepositList });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFirstDepositByTlAndManager = async (req, res) => {
    const { customerName } = req.params;
    const { desg } = req;
    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });


    try {
        const firstDepositDetails = await FirstDepositByTlAndManager.find({ customerName });
        if (firstDepositDetails.length === 0) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, firstDepositDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateFirstDepositByTlAndManager = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant update' });

    const { customerName } = req.params;
    const { cashIn, cashOut, net } = req.body;

    try {
        const updatedDetails = {
            customerName,
            cashIn,
            cashOut,
            net
        }

        const updatedDeposit = await FirstDepositByTlAndManager.findOneAndUpdate({ customerName }, updatedDetails, { new: true });

        if (!updatedDeposit) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, message: 'Details updated successfully', updatedDeposit });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteFirstDepositByTlAndManager = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant delete' });
    const { customerName } = req.params;

    try {
        const deletedDeposit = await FirstDepositByTlAndManager.findOneAndDelete({ customerName });

        if (!deletedDeposit) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, message: 'Deleted successfully', deletedDeposit });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

module.exports = { addFirstDepositByTlAndManager, getFirstDepositsByTlAndManager, getFirstDepositByTlAndManager, updateFirstDepositByTlAndManager, deleteFirstDepositByTlAndManager }