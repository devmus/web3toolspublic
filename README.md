# Setup

## Sign up for these free services that I use in the project:
- https://bds.birdeye.so/user/overview (API key)
- https://www.mongodb.com/ (database)

## VSC
1. install dependancies in backend and frontend folders.
2. create a config.env file and put it in /backend/config/.
3. config file should look like this:

```
MONGO_URI=mongodb+srv://[user-details].pmqy45x.mongodb.net/
API_KEY=[birdeye api key]
```

4. Optional: import [web3tools.swaprewards.json](https://github.com/devmus/web3toolspublic/blob/main/web3tools.swaprewards.json) to your MongoDB Compass database or create all tokens manually.
5. Launch two terminals:
$cd backend
$npm run dev

and

$cd frontend
$npm run dev
