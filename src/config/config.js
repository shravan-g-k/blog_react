class Config {
  static projectId = String(process.env.VITE_APPWRITE_PROJECT_ID);
  static projectName = String(process.env.VITE_APPWRITE_PROJECT_NAME);
  static endpoint = String(process.env.VITE_APPWRITE_ENDPOINT);
  static databaseId = String(process.env.APPWRITE_DATABASE_ID);
  static tableId = String(process.env.APPWRITE_TABLE_ID);
}

export default Config;