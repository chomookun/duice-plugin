import {Configuration, ElementRegistry, ObjectElementFactory} from "duice";
import {CodemirrorElement} from "./CodemirrorElement";

/**
 * Codemirror Factory
 */
export class CodemirrorElementFactory extends ObjectElementFactory<HTMLElement> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-codemirror`, new CodemirrorElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override createElement(htmlElement: HTMLElement, bindData: object, context: object): CodemirrorElement {
        return new CodemirrorElement(htmlElement, bindData, context);
    }

}
