namespace duice.plugin {

    export class PaginationFactory extends CustomElementFactory<object> {

        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
            return new Pagination(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-pagination`, new PaginationFactory());

}