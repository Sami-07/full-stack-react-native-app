import { Alert } from 'react-native';
import { Account, ID, Client, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: process.env.ENDPOINT,
    platform: process.env.PLATFORM,
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
    userCollectionId: process.env.USER_COLLECTION_ID,
    videosCollectionId: process.env.VIDEOS_COLLECTION_ID,
    storageId: process.env.STORAGE_ID
}

const { endpoint, platform, projectId, databaseId, userCollectionId, videosCollectionId, storageId } = appwriteConfig

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform) 
    ;
    
const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(ID.unique(),
            email,
            password,
            username)
        if (!newAccount) {
            throw new Error("User not created")
        }
        const avatarUrl = avatars.getInitials(username)

        await Signin(email, password)
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        })
        return newUser
    } catch (error) {
        console.error(error)
        throw new Error(error)

    }

}

export async function Signin(email, password) {
    try {
        const session = await account.createEmailSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) {
            throw Error
        }
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)])

        if (!currentUser) {
            throw Error
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

//Fetch all posts
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [Query.orderDesc("$createdAt")])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [Query.search('title', query)])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(databaseId, videosCollectionId, [Query.equal('creator', userId), Query.orderDesc('$createdAt')])
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current")
        return session
    } catch (error) {
        throw new Error(error);

    }
}


export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {

        if (type === "video") {
            console.log("type inside getFilePreview", type)
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === "image") {
            console.log("type inside getFilePreview", type)
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100);
        } else {
            throw new Error("Invalid file type");
        }

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

//uploadFile uses getFilePreview
export const uploadFile = async (file, type) => {
    if (!file) return

    const asset = {
        name: file.fileName,
        type: file.MimeType,
        size: file.fileSize,
        uri: file.uri
    }
    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(),
            asset)

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

//createVideo uses uploadFile
export const createVideo = async (form) => {
    console.log("form", form)
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video")
        ])
        console.log("urls", thumbnailUrl, videoUrl)
        const newPost = await databases.createDocument(databaseId, videosCollectionId, ID.unique(), {
            title: form.title,
            prompt: form.prompt,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            creator: form.userId
        })
        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}