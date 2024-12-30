import { CONFIG } from './src/chinaclear/config/chinaConfig.ts';
import { ChinaDataCollector } from './src/chinaclear/services/ChinaDataCollector.ts';
import { ChinaFileDownloader } from './src/chinaclear/services/ChinaFileDownloader.ts';

function initScript() 
{
    // Create container for button and input
    const container = document.createElement('div');
    Object.assign(container.style, CONFIG.BUTTON_CONTAINER_STYLES);

    // Create input group
    const inputGroup = document.createElement('div');
    inputGroup.style.display = 'flex';
    inputGroup.style.alignItems = 'center';
    
    const label = document.createElement('label');
    label.textContent = 'TotalPages:';
    
    const input = document.createElement('input');
    Object.assign(input.style, CONFIG.INPUT_STYLES);
    input.type = 'number';
    input.min = '1';
    input.value = CONFIG.QUERY_PAGE_NUM;
    input.addEventListener('change', (e) => {
        CONFIG.QUERY_PAGE_NUM = parseInt(e.target.value) || 1;
    });

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    // Create button
    const button = document.createElement('button');
    button.textContent = 'GetData';
    button.style.padding = '10px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', async () => {
        const collector = new ChinaDataCollector();
        const datas = await collector.collectAllPagesData();
        // console.log('Retrieved data:', datas);
        await ChinaFileDownloader.downloadFiles(datas);
    });
    
    // Append elements to container
    container.appendChild(button);
    container.appendChild(inputGroup);
    document.body.appendChild(container);
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScript);
} else {
    initScript();
}