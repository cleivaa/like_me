const { readFileSync, writeFileSync } = require('fs')


const handleGetUsers = (req, res) => {
    const users = JSON.parse(readFileSync('user.json', 'utf-8'))

    res.status(200).json(users)
}

const handleCreateUser = (req, res) => {
    const user = req.body

    const prevUsers = JSON.parse(readFileSync('user.json', 'utf-8'))
    prevUsers.push(user)

    writeFileSync('user.json', JSON.stringify(prevUsers, null, 3))
    res.send('Usuario creado con éxito 🤙')
}

const handleDeleteUser = (req, res) => {
    const { id } = req.params

    const prevUsers = JSON.parse(readFileSync('user.json', 'utf-8'))

    const filteredUsers = prevUsers.filter((user) => user.id != id)

    writeFileSync('user.json', JSON.stringify(filteredUsers, null, 3))
    res.send('Usuario eliminado con éxito 🤙')
}

const handleUpdateUser = (req, res) => {
    const { id } = req.params
    const userUpdate = req.body

    const prevUsers = JSON.parse(readFileSync('user.json', 'utf-8'))

    const usersUpdated = prevUsers.map((user) => (user.id == id ? { ...user, ...userUpdate } : user))

    writeFileSync('user.json', JSON.stringify(usersUpdated, null, 3))
    res.send('Usuario actualizado con éxito 🤙')
}


module.exports = {
    handleGetUsers,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser
}