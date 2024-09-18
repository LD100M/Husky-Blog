A blogging app built with React and Tailwind CSS on the front end, and powered by Appwrite on the backend

## Local Environment Setup

To run this project locally, you need to configure environment variables for Appwrite and TinyMCE. Follow the instructions below to set up your environment.

### Step 1: Rename the `env_template` File

In the root directory of the project, you will find a file named `env_template`.

1. Rename the `env_template` file to `.env`. 

2. After renaming, the `.env` file will be used to store the environment variables necessary for the project.

### Step 2: Set Up Appwrite Variables

You need to configure the Appwrite-related variables in the `.env` file. Here's how to do it:

1. **Appwrite URL (`VITE_APPWRITE_URL`)**:  
   - If you are using Appwrite Cloud, set this to `https://cloud.appwrite.io/v1`.  
   - If you are using a self-hosted Appwrite instance, replace it with your own Appwrite server URL.

2. **Appwrite Project ID (`VITE_APPWRITE_PROJECT_ID`)**:  
   - Go to your Appwrite dashboard and navigate to your project settings.  
   - Copy the **Project ID** and paste it into the `.env` file.

3. **Appwrite Database ID (`VITE_APPWRITE_DATABASE_ID`)**:  
   - In your Appwrite dashboard, find the database you are using.  
   - Copy the **Database ID** and paste it into the `.env` file.

4. **Appwrite Collection ID (`VITE_APPWRITE_COLLECTION_ID`)**:  
   - Navigate to your collection within Appwrite.  
   - Copy the **Collection ID** and paste it into the `.env` file.

5. **Appwrite Bucket ID (`VITE_APPWRITE_BUCKET_ID`)**:  
   - If you're using Appwrite storage (buckets), copy the **Bucket ID** from your dashboard.  
   - Paste the **Bucket ID** into the `.env` file.

### Step 3: Set Up TinyMCE

1. **API Key for TinyMCE (`VITE_API_KEY`)**:
   - Go to [TinyMCE's website](https://www.tiny.cloud/) and sign up for an account (if you don’t already have one). 
   - Create a new API key from the TinyMCE dashboard. The key can be acquired for free.
   - Copy the **API key** and paste it into the `.env` file under `VITE_API_KEY`.

### Step 4: Run the Project

Once you've configured the environment variables in the `.env` file, you can run the project locally by following these steps:

1. Install the dependencies:
   ```bash
   npm install

2. Run the project
    ```bash
   npm run dev
