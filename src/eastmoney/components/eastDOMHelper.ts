export const DOMHelper = {
    
    getSelectedMarketType: () => {
        const marketLi = document.querySelector('#detail_type li.at');
        return marketLi ? marketLi.getAttribute('data') : null;
    },
    
    getSelectedTimeRange: () => {
        const timeLi = document.querySelector('#detail_time li.at');
        return timeLi ? timeLi.getAttribute('data') : null;
    },
    
    getDatePicker: () => document.querySelector('.search.time #inputDate') as HTMLInputElement,    
    
    getTable: () => document.querySelector('.table-model:not(.floathead)'),
    
    getPaginator: () => document.querySelector('.tablepager'),
    
    getDateAndTitle: () => {
        const titleDiv = document.querySelector('.title-wrap-auto .left-title .title');
        return titleDiv ? titleDiv.textContent?.trim() : '';
    },
    
    getCurrentPage: () => {
        const pageDiv = document.querySelector('.tablepager .pagerbox .active');
        return pageDiv ? parseInt(pageDiv.textContent?.trim() ?? '0', 10) : null;
    },

    getHeaders: () => {
        const headers: string[] = [];
        const table = DOMHelper.getTable();
        if (!table) return headers;
        
        const thead = table.getElementsByTagName('thead')[0];
        if (!thead) return headers;
        
        const headerRows = thead.getElementsByTagName('tr');
        const firstRow = headerRows[0];
        const firstRowCells = firstRow.getElementsByTagName('th');
        const tempHeaders: { text: string; colspan: string | number }[] = [];
        
        for (let cell of firstRowCells) {
            const rowspan = cell.getAttribute('rowspan') || 1;
            const colspan = cell.getAttribute('colspan') || 1;
            const text = cell.textContent?.trim() || '';
            
            if (rowspan === '2') {
                headers.push(text);
            } else {
                tempHeaders.push({ text, colspan});
            }
        }
        
        if (headerRows.length > 1) {
            const secondRow = headerRows[1];
            const secondRowCells = secondRow.getElementsByTagName('th');
            for (let cell of secondRowCells) {
                const text = cell.textContent?.trim() || '';
                if (headers.length < secondRowCells.length) {
                    headers.push(`${text}`);
                }
            }
        }  
        return headers;
    },

    
    createProgressDiv: () => {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.right = '20px';
        div.style.padding = '10px';
        div.style.background = 'rgba(0,0,0,0.7)';
        div.style.color = 'white';
        div.style.zIndex = '9999';
        return div;
    },
    
    createDateInputA: () => {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.right = '5%';
        container.style.zIndex = '9999';
        container.style.backgroundColor = 'black';
        container.style.color = 'white';
        
        const buttonTop = '50%'; 
        const containerHeight = 30; 
        const marginBottom = 10; 
        
        // 计算容器的 top 值，使其底部紧贴按钮顶部
        container.style.top = `calc(${buttonTop} - ${containerHeight + marginBottom}px)`;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'dateA';
        input.style.padding = '5px';
        
        const datePickerB = DOMHelper.getDatePicker();
        input.value = datePickerB?.value || '';
        
        container.appendChild(input);
        return container;
    },
    
    createGetDataButton: () => {
        const button = document.createElement('button');
        button.textContent = 'getDatas';
        button.style.position = 'fixed';
        button.style.top = '50%';
        button.style.right = '5%';
        button.style.zIndex = '9999';
        button.style.backgroundColor = 'rgba(0,0,0,0.7)';
        button.style.color = 'white';
        button.style.padding = '20px';
        return button;
    }
};