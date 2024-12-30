import { DOMHelper } from '../components/eastDOMHelper.ts';
import { DataScraper } from './eastScraper.ts';
import { Utils } from '../utils/eastUtils.ts';

export class DataCollectorClass 
{
    private progressDiv: HTMLDivElement | null;

    constructor() 
    {
        this.progressDiv = null;
    }

    // 获取当前URL所有页面的数据
    async getAllPagesData() 
    {
        const allData: string[][] = [];
        const totalPages = DataScraper.getTotalPages();
        // fix bug 时间段范围内某天为空数据，不做处理，直接返回
        if (!totalPages) {return allData;}
        let currentPage = DOMHelper.getCurrentPage();
        if (!currentPage) {return allData;} 
        //
        try {
            this.progressDiv = DOMHelper.createProgressDiv();
            document.body.appendChild(this.progressDiv);
            
            while (currentPage <= totalPages) {
                this.progressDiv.textContent = `正在抓取第 ${currentPage}/${totalPages} 页...`;
                const pageData = DataScraper.getPageData();
                if (pageData) {
                    allData.push(...pageData);
                    console.log(`${currentPage} ’s page has been fetched, nums：${pageData.length}`);
                }
                if (currentPage < totalPages) {
                    const success = this.clickNextPage();
                    if (!success) break;
                    await Utils.delay(1000 + Math.random() * 1000);
                }
                currentPage++;
            }
            this.progressDiv.remove();
            return allData;
            
        } catch (error) {
            console.error('fetch error：', error);
            return null;
        }
    }

    // 获取指定日期范围内的URL对应的所有页面数据
    async processAllDates() 
    {
        const datePicker = DOMHelper.getDatePicker() as HTMLInputElement;
        if (!datePicker) {
            const datas = await this.getAllPagesData();
            if (datas) {this.exportToCSV(datas);}
            return;
        }
        
        let currentDate = datePicker.value;
        let targetDate = localStorage.getItem('targetDate') || (document.getElementById('dateA') as HTMLInputElement)?.value;
        if (new Date(currentDate) < new Date(targetDate)) {
            alert('设定日期大于当前数据日期！');
            return;
        }

        if (!localStorage.getItem('targetDate')) {
            localStorage.setItem('targetDate', targetDate);
        }
        
        while (new Date(currentDate) >= new Date(targetDate)) {
            console.log(`currentdate: ${currentDate}`);
            
            const dateData = await this.getAllPagesData();
            if (dateData) {this.exportToCSV(dateData);}
            
            if (currentDate === targetDate) {
                localStorage.removeItem('targetDate');
                // console.log('all dates in this range has been fetched');
                alert('all dates in this range has been fetched');
                break;
            }
            const prevDate = Utils.getPreviousDay(currentDate);
            const marketType = DOMHelper.getSelectedMarketType();
            const timeRange = DOMHelper.getSelectedTimeRange();
            const baseUrl = window.location.href.split('/detail/')[0] + '/detail/';
            const newUrl = `${baseUrl}${marketType}.${timeRange}.${prevDate}.html`;
            console.log('newUrl: ', newUrl);
            window.location.href = newUrl + '?autorun=1';
            return;
        }
    }
    
    exportToCSV(data) 
    {
        if (!data || data.length === 0) return;
        const headers = DOMHelper.getHeaders();
        const csvContent = [
            headers.join(','),
            ...data.map(row => row.join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${DOMHelper.getDateAndTitle()}.csv`;
        link.click();
    }

    /**
     * @returns {boolean} 
     */
    clickNextPage = (): boolean => {
        const pagePager = DOMHelper.getPaginator();
        if (!pagePager) {
            console.log('can not find page pager');
            return false;
        }
        
        const currentPage = pagePager.querySelector('.pagerbox a.active');
        const currentPageText = currentPage?.getAttribute('data-page');
        if (!currentPageText) {
            return false;
        }
        const currentPageNum = parseInt(currentPageText, 10);
        const nextButton = pagePager.querySelector('.pagerbox a:last-child');
        
        if (nextButton && nextButton.textContent === '下一页') {
            const nextPageNum = currentPageNum + 1;
            console.log(`from ${currentPageNum} to ${nextPageNum} page`);
            const nextPageLink = pagePager.querySelector(`a[data-page="${nextPageNum}"]`) as HTMLElement;
            if (nextPageLink) {
                nextPageLink.click();
                return true;
            }
        }
        console.log('last page!');
        return false;
    }
}