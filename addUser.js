
// Route pour ajouter un nouvel utilisateur
app.post('/addUser', async (req, res) => {
    const { name, login, password } = req.body;

    // Validation basique
    if (!name || !login || !password) {
        return res.status(400).send({ error: 'Name, login, and password are required' });
    }

    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = { name, login, password: hashedPassword };

        res.status(201).send({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});


