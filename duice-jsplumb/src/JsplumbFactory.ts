namespace duice.plugin {

    export class DiagramFactory extends CustomElementFactory<object> {

        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
            return new Jsplumb(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-jsplumb`, new DiagramFactory());

}