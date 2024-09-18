import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

/**
 * Appwrite backend authservice for creating
 * account, login, get current user's data, 
 * and logging out
 */
export class AuthService {
    client = new Client();
    account;

    /**
     * constructor initializes a client and
     * an account for the appwrite service.
     */
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    /**
     * @param email: user's email
     * @param password: password of the account
     * @param name: name of the user
     * @returns a promise that resolves to an user object
     * if the operation is successful. 
     * @error log the error if the user account fails to
     * be created
     */
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            }
            //  else {
            //     return userAccount
            // }
        } catch (error) {
            console.log("Appwrite service :: createAccount() :: ", error)
        }
    }

    /**
     * function logs the user in and
     * return the logged in user's
     * information
     * @param email: user's email
     * @param password: password of the account
     * @returns a promise that resolves to an user object
     * if the operation is successful
     * @error log the error if the email session fails to be
     * created
     */
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    /**
     * function gets the currently logged in user. 
     * @returns the currently logged in user object
     * @error log the error if the currently logged
     * in user data is not successfully received
     */
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }

    /**
     * function gets the currently logged out user.
     * @error deletion of the current user is unsuccessful.
     * The error message is logged
     */
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }
}

const authService = new AuthService()

// export the authentication service 
// to be used by other components
export default authService