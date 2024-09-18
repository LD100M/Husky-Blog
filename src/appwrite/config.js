import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite";

/**
 * Appwrite backend authservice for getting the 
 * data of a single post, all the posts, create
 * a post, update a post, delete a post, uploding
 * file, deleting file, getting file preview(usually image)
 */
export class Service {
    client = new Client()
    databases;
    bucket;
    
    /**
     * constructor initializes a client and
     * an account for the appwrite service.
     */
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    /**
     * function gets info about a
     * specific post given a slug.
     * @param: The slug of a post(derived from
     * the post's title)
     * @returns the document object representing
     * the blog with the slug
     * @error Log the error if the post object
     * based on the slug is not retrieved 
     * successfully
     */
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service :: getPost() :: ", error);
            return false
        }
    }

    /**
     * function gets a list of posts
     * based on their status(status should
     * be active)
     * @param: The queries to filter the posts
     * to be selected(select based on the post's
     * status attribute)
     * @returns an array of document object representing
     * the blogs with active status
     * @error Log the error if the list of posts object
     * is not retrieved successfully
     */
    async getPosts(queries = [Query.equal("status", "active")] ){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false
        }
    }

    /**
     * function creates a new document object 
     * representing a post based on all 
     * attributes of a blog post 
     * @param {}: all attributes of a blog post
     * @returns a document object carrying these attribute
     * @error logs the error if the post is not created
     * successfully
     */
    async createPost({title, slug, content, featuredimage, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredimage, status, userid
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
            return false
        }
    }

    /**
     * function updates a document object 
     * representing a post based on all 
     * attributes of a new blog post 
     * @param slug: the id of the document(post)
     * @param {}: all attributes of a blog post
     * @returns the new document object carrying these 
     * attribute
     * @error logs the error if the post is not updated
     * successfully
     */
    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredimage, status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateDocument() :: ", error);
            return false
        }
    }

    /**
     * function deletes a post based on its 
     * unique document id
     * @param slug: the id of the document(post)
     * @error logs the error if the post is not deleted
     * successfully
     */
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                )
            return true;    
        } catch (error) {
            console.log("Appwrite service :: deleteDocument() :: ", error);
            return false
        }
    }

    /**
     * function creates a file based on the 
     * given file object
     * @param file: the file to be uploaded to 
     * the appwrite storage
     * @error logs the error if the post is not uploadded
     * successfully
     */
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    /**
     * function deletes a file based on the 
     * given file object
     * @param fileId: the id of the file to be 
     * deleted from the appwrite storage
     * @error logs the error if the post is not
     * deleted successfully
     */
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
                
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }   

    /**
     * function gets the url of the preview
     * of a file
     * @param fileId: the id of the file to be 
     * displayed from the appwrite storage
     * @error logs the error if the preview
     * image is not returned as expected
     */ 
    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            ).href
        } catch (error) {
            console.log("Appwrite service :: getFilePreview() :: ", error)
        }
    }
}

// export the database and storage service 
const service = new Service()
export default service;

