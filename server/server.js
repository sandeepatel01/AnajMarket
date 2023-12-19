const express = require('express');
const app = express();

// server listen in porst -> load config from  env file 
require("dotenv").config();
const PORT = process.env.PORT || 8080;


const githubData = {
    "login": "sandeepatel01",
    "id": 115567883,
    "node_id": "U_kgDOBuNtCw",
    "avatar_url": "https://avatars.githubusercontent.com/u/115567883?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/sandeepatel01",
    "html_url": "https://github.com/sandeepatel01",
    "followers_url": "https://api.github.com/users/sandeepatel01/followers",
    "following_url": "https://api.github.com/users/sandeepatel01/following{/other_user}",
    "gists_url": "https://api.github.com/users/sandeepatel01/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/sandeepatel01/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/sandeepatel01/subscriptions",
    "organizations_url": "https://api.github.com/users/sandeepatel01/orgs",
    "repos_url": "https://api.github.com/users/sandeepatel01/repos",
    "events_url": "https://api.github.com/users/sandeepatel01/events{/privacy}",
    "received_events_url": "https://api.github.com/users/sandeepatel01/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Sandeep Patel",
    "company": null,
    "blog": "",
    "location": "Bareilly",
    "email": null,
    "hireable": null,
    "bio": "Think slow and code fast | Software developer | react.js | node.js | mongodb | freelancer",
    "twitter_username": null,
    "public_repos": 24,
    "public_gists": 0,
    "followers": 7,
    "following": 22,
    "created_at": "2022-10-11T14:38:59Z",
    "updated_at": "2023-11-09T04:35:13Z"
}

app.get('/', (req, res) => {
    res.send('How to Deploy Backend code in Production')
})

app.get('/facebook', (req, res) => {
    res.send("sandeepatel.in")
})

app.get('/github', (req, res) => {
    res.json(githubData)
})



// start server 
app.listen(PORT, () => {
    console.log(`server started successfully at ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


// CONNECTION TO THE DATABASE 
const dbConnect = require("./config/database");
dbConnect();


// default route 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to ecommerce app</h1>`);
});