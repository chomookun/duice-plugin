import {Configuration, DataElementRegistry, ObjectElementFactory} from "duice";
import {Codemirror} from "./Codemirror";

export class CodemirrorFactory extends ObjectElementFactory<HTMLElement> {

    static {
        // register
        DataElementRegistry.register(`${Configuration.getNamespace()}-codemirror`, new CodemirrorFactory());
    }

    override createElement(htmlElement: HTMLElement, bindData: object, context: object): Codemirror {
        return new Codemirror(htmlElement, bindData, context);
    }

}
