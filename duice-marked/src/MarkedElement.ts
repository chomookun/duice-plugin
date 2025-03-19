import {ObjectElement} from "duice";

declare var marked: any;
declare var Prism: any;

/**
 * Marked Element
 */
export class MarkedElement extends ObjectElement<HTMLElement> {

    div: HTMLDivElement;

    config: object;

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        // creates child div
        this.div = document.createElement('div');
        this.getHtmlElement().appendChild(this.div);
        // customizes responsive table
        const renderer = new marked.Renderer();
        renderer.table = (header: string, body: string) => {
            return `<table style="display:inline-block;overflow-x:scroll;max-width:100%;">\n<thead>${header}</thead>\n<tbody>${body}</tbody>\n</table>`;
        };
        // config
        this.config = {
            headerIds: false,
            mangle: false,
            breaks: true,
            gfm: true,
            renderer: renderer
        }
    }

    /**
     * Sets value
     * @param value value
     */
    override setValue(value: any): void {
        value = value ? value : '';
        value = marked.parse(value, this.config);
        this.div.innerHTML = value;
        this.div.querySelectorAll('[class^=language-]').forEach(function(pre:Element){
            pre.classList.add('line-numbers');
        });
        // highlight
        Prism.highlightAll();
    }

}


