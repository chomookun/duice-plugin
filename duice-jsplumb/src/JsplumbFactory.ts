import {Configuration, CustomElement, CustomElementFactory, DataElementRegistry} from "duice";
import {Jsplumb} from "./Jsplumb";

export class DiagramFactory extends CustomElementFactory<object> {

    static {
        // register
        DataElementRegistry.register(`${Configuration.getNamespace()}-jsplumb`, new DiagramFactory());
    }

    override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
        return new Jsplumb(htmlElement, bindData, context);
    }

}
