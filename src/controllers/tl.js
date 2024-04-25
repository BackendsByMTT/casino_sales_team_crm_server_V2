const Customer = require("../models/CustomerSchema")

const addCustomer = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    try {
        const { customerName, gameName, amount, accountName, date, remarks } = req.body;

        if (await Customer.findOne({ customerName }))
            return res.status(201).json({ status: false, error: "This customer name is not avaiable" });

        const customer = await Customer.create({
            customerName,
            gameName,
            amount,
            accountName,
            date,
            remarks
        });

        return res.status(200).json({ status: true, message: "Customer Added successful!", customer: customer });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getCustomers = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    try {
        const customers = await Customer.find();
        return res.status(200).json({ status: true, customers });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getCustomerDetails = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You do not have access to this' });

    const { customerName } = req.params;

    try {
        const customerDetails = await Customer.find({ customerName });
        if (!customerDetails) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, customer: customerDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateCustomer = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant update' });

    const { customerName } = req.params;
    const { gameName, amount, accountName, date, remarks } = req.body;

    try {
        const updatedDetails = {
            customerName,
            gameName,
            amount,
            accountName,
            date,
            remarks
        }

        const updatedCustomer = await Customer.findOneAndUpdate({ customerName }, updatedDetails, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, message: 'Customer details updated successfully', customer: updatedCustomer });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteCustomer = async (req, res) => {
    const { desg } = req;

    if (desg === "agent")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { customerName } = req.params;

    try {
        const deletedCustomer = await Customer.findOneAndDelete({ customerName });

        if (!deletedCustomer) {
            return res.status(404).json({ status: false, error: 'Customer not found' });
        }

        return res.status(200).json({ status: true, message: 'Customer deleted successfully', deletedCustomer: deletedCustomer });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

module.exports = { addCustomer, getCustomers, getCustomerDetails, updateCustomer, deleteCustomer }