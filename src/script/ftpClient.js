// src/scripts/ftpClient.js
import ftp from 'basic-ftp';

export async function fetchFromFTP() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: "hosting188451.ae8d3.netcup.net",
            user: "wildhandel",
            password: "6T2r!rh14",
            secure: true
        });

        const list = await client.list();
        await client.downloadToDir("./public/ftpFiles", "/remotePath");
        return list;
    } catch (err) {
        console.error(err);
    }

    client.close();
}
