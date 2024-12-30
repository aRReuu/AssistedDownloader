
export class ChinaPagination
{
    static getCurrentPage() {
        const pageDiv = document.querySelector('.page_num #page_div');
        const currentPageElement = pageDiv?.querySelector('li.page_index a.current');
        return currentPageElement ? parseInt(currentPageElement.textContent?.trim() || '', 10) : null;
    }

    static clickNextPage(currentPage:number) {
        const pagePager = document.querySelectorAll('.page_num #page_div .prev_page')[1];
        if (!pagePager) {
            console.log('Pagination not found');
            return false;
        }

        const nextButton = pagePager.querySelector('a');
        if (nextButton?.textContent === '下一页') {
            console.log(`Moving from page ${currentPage} to page ${currentPage + 1}`);
            nextButton.click();
            return true;
        }
        
        console.log('Last page reached or next button not found');
        return false;
    }
}