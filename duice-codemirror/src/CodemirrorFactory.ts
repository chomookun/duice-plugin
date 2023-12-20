namespace duice.extension {

    export class CodemirrorFactory extends ObjectElementFactory<HTMLElement> {

        override createElement(htmlElement: HTMLElement, bindData: object, context: object): Codemirror {
            return new Codemirror(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-codemirror`, new CodemirrorFactory());

}

