import { DOMHelper } from '../components/eastDOMHelper';

export const DataScraper = {

    getPageData: () => {
        const data: string[][] = [];
        const table = DOMHelper.getTable();
        if (!table) return null;
        //
        const rows = table.getElementsByTagName('tr');
        for (let row of rows) {
            const rowData: string[] = [];
            const cells = row.getElementsByTagName('td');
            for (let cell of cells) {
                rowData.push(cell.textContent?.trim() || '');
            }
            if (rowData.length > 0) {
                data.push(rowData);
            }
        }
        return data;
    },
    
    getTotalPages: () => {
        const pagePager = DOMHelper.getPaginator();
        if (!pagePager) return 0;
        
        const pageLinks = pagePager.querySelectorAll('.pagerbox a[data-page]');
        if (pageLinks.length > 0) {
             const lastNumberPage = Array.from(pageLinks)
             .filter(link => {
                 const pageNum = link.getAttribute('data-page') ?? '';
                 return !Number.isNaN(Number(pageNum)) && 
                        !link.textContent?.includes('下一页') &&
                        !link.textContent?.includes('...');
             })
             .pop();     
            const pageNum = lastNumberPage?.getAttribute('data-page') ?? '1';
            return parseInt(pageNum);
        }
        return 0;
    }
    
};