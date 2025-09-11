import { Client,Databases,Query,Storage, ID } from "appwrite";
import Config from '../../config/config.js';

class DataBase{
    client = new Client();
    databases;
    bucket;    
  constructor() {
     this.client 
      .setEndpoint(Config.endpoint) // Your API Endpoint
      .setProject(Config.projectId); // Your project ID

     this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
  }

  async getPost(slug){
    try {
        const post = await this.databases.getDocument(Config.databaseId, Config.tableId, slug);
        return post;
    } catch (error) {
       console.log("Appwrite Service :: getPost ::", error);
       return false;
    }
  }

  async getPosts(
    query = [Query.equal("status","active")]
  ){
    try {
        const posts = await this.databases.listDocuments(Config.databaseId, Config.tableId,query);
        return posts;
    } catch (error) {
        console.log("Appwrite Service :: getPosts ::",error);
        return false;
    }
  }

  async createPost({
    title,
    content,
    featuredImage,
    status,
    userId,
    slug,
  }){
    try {
        const post = await this.databases.createDocument(Config.databaseId, Config.tableId, slug, {
            title,
            content,
            featuredImage,
            status,
            userId,
        });
        return post;
    } catch (error) {
        console.log("Appwrite Service :: createPost ::",error);
        return false;
    }
  }


  async updatePost({
    title,
    content,
    featuredImage,
    status,
    userId,
    slug,
  }){
    try {
        const post = await this.databases.updateDocument(Config.databaseId, Config.tableId, slug, {
            title,
            content,
            featuredImage,
            status,
            userId,
        });
        return post;
    } catch (error) {
        console.log("Appwrite Service :: updatePost ::",error);
        return false;
    }
  }

  async deletePost(slug){
    try { await this.databases.deleteDocument(Config.databaseId, Config.tableId, slug);
        return true;
    } catch (error) {
        console.log("Appwrite Service :: deletePost ::",error);
        return false;
    }
  }

  //Storage
  async uploadFile(file){
    try {
        const response = await this.bucket.createFile(
            Config.bucketId,
            ID.unique(),
            file,
         
        );
        return response;
    } catch (error) {
        console.log("Appwrite Service :: uploadFile ::",error);
        return false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(Config.bucketId, fileId);
        return true;
    } catch (error) {
        console.log("Appwrite Service :: deleteFile ::",error);
        return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(Config.bucketId, fileId).href;
  }
}

const db = new DataBase();

export default db;