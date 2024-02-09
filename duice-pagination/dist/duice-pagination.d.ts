declare namespace duice.plugin {
    class Pagination extends duice.CustomElement<object> {
        pageProperty: string;
        sizeProperty: string;
        countProperty: string;
        onclick: Function;
        prevContent: string;
        nextContent: string;
        pageNumberSize: number;
        constructor(htmlElement: HTMLElement, bindData: object, context: object);
        doRender(object: object): void;
        doUpdate(object: object): void;
        createStyle(): HTMLStyleElement;
    }
}
declare namespace duice.plugin {
    class PaginationFactory extends CustomElementFactory<object> {
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object>;
    }
}
