import { ChinaProgressIndicator } from "../components/ChinaProgressIndicator";
import { ChinaPagination } from "../components/ChinaPagination";
import { ChinaPageDataExtractor } from "./ChinaPageDataExtractor";
import { CONFIG } from "../config/chinaConfig";

export class DataCollector 
{
    private progress: ChinaProgressIndicator;
    
    /** 
     * 初始化数据收集器
     */
    constructor() {
        this.progress = new ChinaProgressIndicator();
    }

    /**
     * 收集所有页面的数据
     * @returns Promise<PageData[]> - 返回收集到的所有数据
     * @throws Error 当收集过程出错时抛出
     */
    async collectAllPagesData(): Promise<ChinaFileData[]> 
    {
        const allData: ChinaFileData[] = [];
        const startPage = ChinaPagination.getCurrentPage();
        if (!startPage) throw new Error('Unable to get current page');

        let currentPage = startPage;
        const maxPages = startPage + CONFIG.QUERY_PAGE_NUM - 1;
        this.progress.init();
        try {
            while (currentPage <= maxPages) {
                this.progress.update(`Fetching page ${currentPage}`);
                
                const pageData = await ChinaPageDataExtractor.extractFromIframe();
                if (pageData) {
                    allData.push(...pageData);
                    console.log(`Data from page ${currentPage} has been fetched!`);
                }
                if (currentPage === maxPages) {break;}
                if (!ChinaPagination.clickNextPage(currentPage)) {break;}
                //
                currentPage++;
                await new Promise(resolve => setTimeout(resolve, CONFIG.REFRESH_DELAY));
            }
            console.log(`Total pages: ${currentPage - startPage + 1}`);
            console.log('Total data count:', allData.length);
            return allData;
        } finally {
            this.progress.remove();
        }
    }
}

