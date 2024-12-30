
interface ChinaFileData 
{
    title: string;
    link: string;
}

// File downloader class
class ChinaFileDownloader 
{
    static async downloadFiles(datas: ChinaFileData[]) {
        for (const data of datas) {
            await this.downloadSingleFile(data);
        }
    }

    static async downloadSingleFile(data: ChinaFileData) {
        const extension = data.link.split('.').pop();
        const filename = `${data.title}.${extension}`;

        try {
            const response = await fetch(data.link);
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download error:', error);
        }
    }
}