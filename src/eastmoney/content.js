import { DOMHelper } from './components/eastDOMHelper.ts';


function initScript() 
{
    const collector = new DataCollectorClass();
    const button = DOMHelper.createGetDataButton();
    const datePicker = DOMHelper.getDatePicker();
    if (datePicker) {
        const dateInputA = DOMHelper.createDateInputA();
        document.body.appendChild(dateInputA);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autorun')) {
        window.history.replaceState({}, '', window.location.pathname);
        setTimeout(() => collector.processAllDates(), 1000);
    }
    
    button.addEventListener('click', () => {
        //bug fix
        if (localStorage.getItem('targetDate')) {
            localStorage.removeItem('targetDate');
        }
        collector.processAllDates();
    });
    document.body.appendChild(button);
}

console.log('script start');
(document.readyState === 'complete') ? initScript() : window.addEventListener('load', initScript);