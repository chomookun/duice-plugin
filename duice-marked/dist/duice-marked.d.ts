declare var marked: any;
declare var Prism: any;
declare namespace duice.plugin {
    class Marked extends duice.ObjectElement<HTMLElement> {
        div: HTMLDivElement;
        config: object;
        constructor(element: HTMLElement, bindData: object, context: object);
        setValue(value: any): void;
    }
}
declare namespace duice.plugin {
    class MarkedFactory extends duice.ObjectElementFactory<HTMLElement> {
        createElement(htmlElement: HTMLElement, bindData: object, context: object): Marked;
    }
}
