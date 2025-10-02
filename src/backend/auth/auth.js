import { Client, Account, ID } from "appwrite";
import config from "../../config/config.js";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.endpoint) // Your Appwrite Endpoint
            .setProject(config.projectId); // Your project ID

        this.account = new Account(this.client);
    }

    async createUser({ email, password, name }) {
        try {
            const user = await this.account.create({
              userId: ID.unique(),
              email: email,
              password: password,
            });
            if(user) {
                return this.loginUser({email, password});
            }else{
                throw new Error("User creation failed");
            }
            
        } catch (error) {
            console.log("AUTH SERVICE :: createUser ::", error);
            throw error;
        }
    }

    // Login User
    async loginUser({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession({
                email: email,
                password: password,
            });
            return session;
        } catch (error) {
            console.log("AUTH SERVICE :: loginUser ::", error);
            throw error;
        }
    }

    //Current User
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
           console.log("AUTH SERVICE :: getCurrentUser ::", error);
           return null;
        }
    }
    
    // Logout User
    async logoutUser() {
        try {
            const result = await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("AUTH SERVICE :: logoutUser ::", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService; 