class Config {
  static projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  static projectName = import.meta.env.VITE_APPWRITE_PROJECT_NAME;
  static endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
  static databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  static tableId = import.meta.env.VITE_APPWRITE_TABLE_ID;
  static bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
  static tinyMceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;
}

export default Config;
