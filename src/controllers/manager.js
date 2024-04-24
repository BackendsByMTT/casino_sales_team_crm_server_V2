const BalanceSheet = require("../models/BalanceSheetSchema")
const CoinSheet = require("../models/CoinSheetSchema")
const FacebookRecord = require("../models/FacebookRecordSchema")
const bcrypt = require('bcrypt');

//BalanceSheet
const addEmployee = async (req, res) => {
    const { desg } = req;

    if (desg !== "bb" && desg !== "manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const { employeeName, designation, salary, incentive, review } = req.body;

        if (await BalanceSheet.findOne({ employeeName }))
            return res.status(201).json({ status: false, error: "This employee name is not avaiable" });

        const employDetails = await BalanceSheet.create({
            employeeName,
            designation,
            salary,
            incentive,
            review
        });

        return res.status(200).json({ status: true, message: "Added successful!", employDetails: employDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err });
    }
}

const getBalanceSheetList = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const Employees = await BalanceSheet.find();
        return res.status(200).json({ status: true, Employees });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getEmployeeDetails = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    const { employeeName } = req.params;

    try {
        const employeeDetails = await BalanceSheet.find({ employeeName });
        if (!employeeDetails) {
            return res.status(404).json({ status: false, error: 'Employee not found' });
        }

        return res.status(200).json({ status: true, employee: employeeDetails });
    } catch (err) {
        return res.status(500).json({ status: false, rror: err.message });
    }
}

const updateEmployee = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant update' });

    const { employeeName } = req.params;
    const { designation, salary, incentive, review } = req.body;
    const totalSalary = salary + incentive;

    try {
        const updatedDetails = {
            employeeName,
            designation,
            salary,
            incentive,
            totalSalary,
            review
        }

        const updatedEmployee = await BalanceSheet.findOneAndUpdate({ employeeName }, updatedDetails, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ status: false, error: 'Employee not found' });
        }

        return res.status(200).json({ status: true, message: 'Employee details updated successfully', employee: updatedEmployee });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteEmployee = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { employeeName } = req.params;

    try {
        const deletedEmployee = await BalanceSheet.findOneAndDelete({ employeeName });

        if (!deletedEmployee) {
            return res.status(404).json({ status: false, error: 'Employee not found' });
        }

        return res.status(200).json({ status: true, message: 'Employee deleted successfully', Employee: deletedEmployee });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

//CoinSheet
const getCoinSheetList = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const coinLists = await CoinSheet.find();
        return res.status(200).json({ status: true, coinLists });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const addToCoinSheet = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const { initialCoins, spend } = req.body;
        const parsedInitialCoins = parseInt(initialCoins);
        const parsedSpend = parseInt(spend);

        if (parsedInitialCoins < 0 || parsedSpend > parsedInitialCoins) {
            return res.status(400).json({ status: false, error: 'Invalid request' });
        }

        const coinDetails = await CoinSheet.create({
            initialCoins: parsedInitialCoins,
            spend: parsedSpend
        });

        return res.status(200).json({ status: true, message: "Added successful!", coinDetails: coinDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getCoinDetails = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    const { initialCoins } = req.params;

    try {
        const coinDetails = await CoinSheet.find({ initialCoins });
        if (!coinDetails) {
            return res.status(404).json({ status: false, error: ' Not found' });
        }

        return res.status(200).json({ status: true, coinDetails: coinDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateCoinDetails = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant update' });

    let initialCoins = parseInt(req.params.initialCoins);
    let spend = parseInt(req.body.spend);
    if (initialCoins < 0 || spend > initialCoins) {
        return res.status(400).json({ status: false, error: 'Invalid request' });
    }

    const remaining = initialCoins - spend;

    try {
        const updatedDetails = {
            initialCoins,
            spend,
            remaining
        }

        const updatedCoins = await CoinSheet.findOneAndUpdate({ initialCoins }, updatedDetails, { new: true });

        if (!updatedCoins) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.status(200).json({ status: true, message: 'Details updated successfully', coinDetails: updatedCoins });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteCoinDetails = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { initialCoins } = req.params;

    try {
        const deletedCoins = await CoinSheet.findOneAndDelete({ initialCoins });

        if (!deletedCoins) {
            return res.status(404).json({ status: false, error: 'Not found' });
        }

        return res.status(200).json({ status: true, message: 'Deleted successfully', deletedCoins: deletedCoins });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

//Fb Accounts Records
const addFbUser = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const { userName, password, fbLink, status, agentName } = req.body;

        if (await FacebookRecord.findOne({ userName }))
            return res.status(201).json({ status: false, error: "This userName is not avaiable" });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await FacebookRecord.create({
            userName,
            password: hashPassword,
            fbLink,
            status,
            agentName
        });
        return res.status(200).json({ status: true, message: "User added successful!", user: user });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFbUsers = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    try {
        const fbUsersList = await FacebookRecord.find();
        return res.status(200).json({ status: true, fbUsersList });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const getFbUserDetail = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You don not have access to this' });

    const { userName } = req.params;
    try {
        const fbUserDetails = await FacebookRecord.find({ userName });
        if (!fbUserDetails) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        return res.status(200).json({ status: true, userDetails: fbUserDetails });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const updateFbUser = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant update' });

    const { userName } = req.params;
    const { password, fbLink, status, agentName } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);
        const updatedUser = {
            userName: userName,
            password: hashPassword,
            fbLink,
            status,
            agentName
        };

        const updatedFbUser = await FacebookRecord.findOneAndUpdate({ userName }, updatedUser, { new: true });

        if (!updatedFbUser) {
            return res.status(404).json({ status: false, error: 'Fb User not found' });
        }

        return res.status(200).json({ status: true, message: 'Fb User details updated successfully', updatedUser: updatedFbUser });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

const deleteFbUser = async (req, res) => {
    const { desg } = req;

    if (desg !== "BB" && desg !== "Manager")
        return res.status(403).json({ status: false, error: 'You cant delete' });

    const { userName } = req.params;

    try {
        const deletedFbUser = await FacebookRecord.findOneAndDelete({ userName });

        if (!deletedFbUser) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        return res.status(200).json({ status: true, message: 'User deleted successfully', user: deletedFbUser });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
}

module.exports = { addEmployee, getBalanceSheetList, getEmployeeDetails, updateEmployee, deleteEmployee, getCoinSheetList, addToCoinSheet, getCoinDetails, updateCoinDetails, deleteCoinDetails, addFbUser, getFbUsers, getFbUserDetail, updateFbUser, deleteFbUser };