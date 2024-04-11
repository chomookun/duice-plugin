declare var CodeMirror: any;
declare namespace duice.extension {
    class Codemirror extends duice.ObjectElement<HTMLElement> {
        mode: string;
        theme: string;
        codeMirror: any;
        constructor(element: HTMLElement, bindData: object, context: object);
        setValue(value: any): void;
        getValue(): any;
        setReadonly(readonly: boolean): void;
    }
}
declare namespace duice.extension {
    class CodemirrorFactory extends ObjectElementFactory<HTMLElement> {
        createElement(htmlElement: HTMLElement, bindData: object, context: object): Codemirror;
    }
}
