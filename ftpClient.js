import ftp from 'basic-ftp';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export async function fetchFromFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        console.log("FTP_HOST:", process.env.FTP_HOST);
        console.log("FTP_USER:", process.env.FTP_USER);
        console.log("FTP_PASSWORD:", process.env.FTP_PASSWORD ? '********' : 'Not provided');

        console.log("Connecting to FTP server...");
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });
        console.log("Connected to FTP server");

        console.log("Listing directory contents of /remotePath...");
        const list = await client.list('/remotePath');
        console.log("Directory contents:", list);

        if (list.length === 0) {
            console.log("No files found in /remotePath on the FTP server.");
            return;
        }

        // Ensure the local directory exists
        const localDir = "./public/ftpFiles";
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        console.log("Downloading files...");
        await client.downloadToDir(localDir, "/remotePath");
        console.log("Download complete");

        // Check if files are downloaded
        const downloadedFiles = fs.readdirSync(localDir);
        console.log("Files downloaded to local directory:", downloadedFiles);

        return list;
    } catch (err) {
        console.error("Error during FTP operation:", err);
    } finally {
        client.close();
        console.log("FTP client closed");
    }
}

fetchFromFTP();
