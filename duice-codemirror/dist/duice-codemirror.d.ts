declare var CodeMirror: any;
declare namespace duice.extension {
    class Codemirror extends duice.ObjectElement<HTMLElement> {
        codeMirror: any;
        toolbar: HTMLDivElement;
        constructor(element: HTMLElement, bindData: object, context: object);
        setValue(value: any): void;
        getValue(): any;
    }
}
declare namespace duice.extension {
    class CodemirrorFactory extends ObjectElementFactory<HTMLElement> {
        createElement(htmlElement: HTMLElement, bindData: object, context: object): Codemirror;
    }
}
