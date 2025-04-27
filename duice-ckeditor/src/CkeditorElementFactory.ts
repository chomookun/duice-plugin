import {Configuration, ElementRegistry, ObjectElementFactory} from "duice";
import {TinymceElement} from "./TinymceElement";

/**
 * Ckeditor Factory
 */
export class CkeditorElementFactory extends ObjectElementFactory<HTMLElement> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-tinymce`, new CkeditorElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override createElement(htmlElement: HTMLElement, bindData: object, context: object): TinymceElement {
        return new CkeditorElement(htmlElement, bindData, context);
    }

}
