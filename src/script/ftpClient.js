import ftp from 'basic-ftp';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchFromFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: true
        });

        const list = await client.list();
        await client.downloadToDir("./public/ftpFiles", "/remotePath");
        return list;
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}
