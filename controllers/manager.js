const Manager = require("../models/managerSchema")

const addBalanceSheet = async (req, res) => {
    try {
        const { employeeName, designation, salary, incentive, review } = req.body;

        const employDetails = await Manager.create({
            employeeName,
            designation,
            salary,
            incentive,
            review
        });

        return res.status(200).json({ message: "Added successful!", employDetails: employDetails });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

const getBalanceSheet = async (req, res) => {
    try {
        const Employees = await Manager.find();
        return res.status(200).json({ Employees });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// const getEmployeeDetails = async (req, res) => {
//     const { employeeId } = req.params;

//     try {
//         const employeeDetails = await User.find({ employeeId });
//         if (!employeeDetails) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }

//         return res.status(200).json({ employee: employeeDetails });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// }

module.exports = { addBalanceSheet, getBalanceSheet };