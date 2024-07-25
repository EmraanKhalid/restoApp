const {usernamedb,password} = process.env;
export const connectionStr ="mongodb+srv://"+usernamedb+":"+password+"@cluster0.tozhwzq.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0";