'use strict'
const Users = require('../../models/users')
const admin = require('firebase-admin');

const serviceAccount = require(process.env.URL_JSON);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


async function findAll(req, res) {
    try {
        let users = await Users.find();
        return res.status(200).json({
            success: true,
            message: 'successfully',
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server',
            error: [{ error: [error.toString()] }]
        })
    }
}


async function findOne(req, res) {
    try {
        let { code } = req.params;
        let user = await Users.findById(code)
        if (!user)
            return res.status(404).json({
                success: false,
                message: 'not found',
                error: [{ error: ['Not found items'] }]
            })


        return res.status(200).json({
            success: true,
            message: 'successfully',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Interal server',
            error: [{ error: [error.toString()] }]
        })
    }
}

async function create(req, res) {
    try {


        let { name, lastname, age } = req.body
        let errors = [];
        if (!name) errors.push({ name: ['Name is required'] })
        if (!lastname) errors.push({ lastname: ['Lastname is required'] })
        if (!age) errors.push({ age: ['Age is required'] })

        if (errors.length > 0)
            return res.status(400).json({
                success: false,
                message: 'fields required',
                data: errors
            })
        let user = await Users.create(req.body)
        const docRef = db.collection('users').doc(`${user._id}`);
        await docRef.set({
            name: user.name,
            lastname: user.lastname,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: [{ error: error.toString() }]
        })
    }
}


async function update(req, res) {
    try {

        let { code } = req.params;

        let user = await Users.findById(code)

        if (!user)
            return res.status(404).json({
                success: false,
                message: 'not found',
                error: [{ error: ['Not found items'] }]
            })
        let updateUsers = await Users.findOneAndUpdate(code, req.body, {
            new: true,
            runValidators: true
        })

        const docRef = db.collection('users').doc(`${updateUsers._id}`);
        await docRef.set({
            name: updateUsers.name,
            lastname: updateUsers.lastname,
            age: updateUsers.age,
            createdAt: updateUsers.createdAt,
            updatedAt: updateUsers.updatedAt
        });
        return res.status(200).json({
            success: true,
            data: updateUsers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: [{ error: error.toString() }]
        })
    }
}

async function destroy(req, res) {
    try {
        let { code } = req.params;

        let user = await Users.findById(code)
        if (!user)
            return res.status(404).json({
                success: false,
                message: 'not found',
                error: [{ error: ['Not found items'] }]
            })

        user.remove();
        await db.collection('users').doc(`${code}`).delete();

        return res.status(200).json({
            success: true,
            message: 'successfully',
            data: []
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server',
            error: [{ error: error.toString() }]
        })
    }
}


module.exports = {
    findAll,
    findOne,
    create,
    update,
    destroy
}