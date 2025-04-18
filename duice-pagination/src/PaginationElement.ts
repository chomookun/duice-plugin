import {Configuration, CustomElement} from "duice";
import {getElementAttribute} from "duice";

/**
 * Pagination Element
 */
export class PaginationElement extends CustomElement<object> {

    pageProperty: string;

    sizeProperty: string;

    totalProperty: string;

    onclick: Function;

    prevContent: string = '<';

    nextContent: string = '>';

    pageNumberSize: number = 10;

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        // attributes
        this.pageProperty = getElementAttribute(htmlElement, 'page-property');
        this.sizeProperty = getElementAttribute(htmlElement, 'size-property');
        this.totalProperty = getElementAttribute(htmlElement, 'total-property');
        this.onclick = new Function(getElementAttribute(htmlElement, 'onclick'));
        // optional
        this.pageNumberSize = Number(getElementAttribute(htmlElement, 'page-number-size') || this.pageNumberSize);
        this.prevContent = getElementAttribute(htmlElement, 'prev-content') || this.prevContent;
        this.nextContent = getElementAttribute(htmlElement, 'next-content') || this.nextContent;
    }

    /**
     * Do render
     * @param object
     */
    override doRender(object: object): void {
        // page,size,count
        let page = Number(object[this.pageProperty]);
        let size = Number(object[this.sizeProperty]);
        let total = Number(object[this.totalProperty]);
        // calculate page
        let totalPage = Math.ceil(total/size);
        let startPageIndex = Math.floor(page/this.pageNumberSize)*this.pageNumberSize;
        let endPageIndex = Math.min(startPageIndex + (this.pageNumberSize-1), totalPage - 1);
        endPageIndex = Math.max(endPageIndex, 0);
        // template
        let pagination = document.createElement('ul');
        pagination.classList.add(`${Configuration.getNamespace()}-pagination`);
        // prev
        let prev = document.createElement('li');
        prev.innerHTML = this.prevContent;
        prev.classList.add(`${Configuration.getNamespace()}-pagination__item-prev`);
        prev.dataset.page = String(Math.max(startPageIndex - this.pageNumberSize, 0));
        prev.addEventListener('click', () => {
            this.onclick.call(prev);
        })
        if(page < this.pageNumberSize) {
            prev.classList.add(`${Configuration.getNamespace()}-pagination__item--disable`);
        }
        pagination.appendChild(prev);
        // pages
        for(let index = startPageIndex; index <= endPageIndex; index ++) {
            let item = document.createElement('li');
            item.appendChild(document.createTextNode(String(index + 1)));
            item.dataset.page = String(index);
            item.classList.add(`${Configuration.getNamespace()}-pagination__item-page`);
            if(index === page) {
                item.classList.add(`${Configuration.getNamespace()}-pagination__item--active`);
            }
            item.addEventListener('click', () => {
                this.onclick.call(item);
            });
            pagination.appendChild(item);
        }
        // next
        let next = document.createElement('li');
        next.innerHTML = this.nextContent;
        next.classList.add(`${Configuration.getNamespace()}-pagination__item-next`);
        next.dataset.page = String(Math.min(endPageIndex + 1, totalPage));
        next.addEventListener('click', () => {
            this.onclick.call(next);
        });
        if(endPageIndex >= (totalPage - 1)) {
            next.classList.add(`${Configuration.getNamespace()}-pagination__item--disable`);
        }
        pagination.appendChild(next);
        // returns
        this.getHtmlElement().innerHTML = '';
        this.getHtmlElement().appendChild(this.createStyle());
        this.getHtmlElement().appendChild(pagination);
    }

    /**
     * Updates element
     * @param object
     */
    override doUpdate(object: object): void {
        this.render();
    }

    /**
     * Creates style
     */
    createStyle(): HTMLStyleElement {
        let style = document.createElement('style');
        style.innerHTML = `
            ${Configuration.getNamespace()}-pagination {
                display: inline-block;
            }
            .${Configuration.getNamespace()}-pagination {
                list-style: none;
                display: flex;
                padding-left: 0;
                margin: 0;
            }
            .${Configuration.getNamespace()}-pagination__item-page {
                cursor: pointer;
                padding: 0 0.5em;
            }
            .${Configuration.getNamespace()}-pagination__item-prev {
                cursor: pointer;
                padding: 0 0.5em;
            }
            .${Configuration.getNamespace()}-pagination__item-next {
                cursor: pointer;
                padding: 0 0.5em;
            }
            .${Configuration.getNamespace()}-pagination__item--active {
                font-weight: bold;
                text-decoration: underline;
                pointer-events: none;
            }
            .${Configuration.getNamespace()}-pagination__item--disable {
                pointer-events: none;
            }
        `;
        return style;
    }

}

