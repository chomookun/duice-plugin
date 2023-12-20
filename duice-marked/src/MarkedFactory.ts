namespace duice.plugin {

    export class MarkedFactory extends duice.ObjectElementFactory<HTMLElement> {

        override createElement(htmlElement: HTMLElement, bindData: object, context: object): Marked {
            return new Marked(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-marked`, new MarkedFactory());

}
