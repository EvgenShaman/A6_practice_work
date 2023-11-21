const express = require('express');
const {graphqlHTTP} = require("express-graphql")
const port = 1235;
const schema = require('C:\\Users\\evgen\\Downloads\\Telegram Desktop\\A6\\A6\\schema\\schema.js');
const app = express()

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
)
app.listen(port);
