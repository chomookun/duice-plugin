import {Configuration, ObjectElementFactory} from "duice";
import {DataElementRegistry} from "duice";
import {Marked} from "./Marked";

export class MarkedFactory extends ObjectElementFactory<HTMLElement> {

    static {
        // register
        DataElementRegistry.register(`${Configuration.getNamespace()}-marked`, new MarkedFactory());
    }

    override createElement(htmlElement: HTMLElement, bindData: object, context: object): Marked {
        return new Marked(htmlElement, bindData, context);
    }

}
