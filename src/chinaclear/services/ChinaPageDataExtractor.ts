export class ChinaPageDataExtractor 
{
    static async extractFromIframe(): Promise<ChinaFileData[]> {
        const iframe = document.querySelector('iframe[id^="code_"]') as HTMLIFrameElement;
        if (!iframe)  throw new Error('iframe not found');

        return new Promise((resolve) => {
            try {
                const items = iframe.contentDocument?.body.querySelectorAll('li')
                resolve(Array.from(items || []).map(item => {
                    const anchor = item.querySelector("a");
                    return {
                        title: anchor?.innerText?.trim() || '',
                        link: anchor?.href || ''
                    };
                }));
            } catch (e) {
                throw new Error(`Failed to get iframe content: ${e.message}`);
            }
        });
    }
}