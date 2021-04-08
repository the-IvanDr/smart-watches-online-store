require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const sequelize = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolvers
}));


const PORT = process.env.PORT || 5500;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    } catch (err) {
        console.log(err.message)
    }
}

start();