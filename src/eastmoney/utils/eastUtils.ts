export const Utils = {
    
    delay: (ms: number): Promise<void> => 
        new Promise(resolve => setTimeout(resolve, ms)),    
    
    formatDate: (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getPreviousDay: (dateStr: string): string => {
        const date = new Date(dateStr);
        date.setDate(date.getDate() - 1);
        return Utils.formatDate(date);
    }
};