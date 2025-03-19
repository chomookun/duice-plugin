import {Configuration, ObjectElementFactory} from "duice";
import {ElementRegistry} from "duice";
import {MarkedElement} from "./MarkedElement";

/**
 * Marked Element Factory
 */
export class MarkedElementFactory extends ObjectElementFactory<HTMLElement> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-marked`, new MarkedElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override createElement(htmlElement: HTMLElement, bindData: object, context: object): MarkedElement {
        return new MarkedElement(htmlElement, bindData, context);
    }

}
