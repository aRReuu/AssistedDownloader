
export class ChinaProgressIndicator 
{
    private div: HTMLDivElement | null = null;
    private style: Partial<CSSStyleDeclaration> = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        zIndex: '9998'
    };

    constructor() {
        this.div = null;
    }

    init() {
        if (!this.div) {
            this.div = document.createElement('div');
            Object.assign(this.div.style, this.style);
            document.body.appendChild(this.div);
        }
        return this.div;
    }

    update(text: string) {
        if (!this.div) this.init();
        this.div!.textContent = text;
    }

    remove() {
        if (this.div) {
            this.div.remove();
            this.div = null;
        }
    }
}