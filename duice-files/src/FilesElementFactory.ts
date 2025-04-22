import {Configuration, CustomElementFactory} from "duice";
import {ElementRegistry} from "duice";
import {CustomElement} from "duice";
import {FilesElement} from "./FilesElement";

/**
 * File Element Factory
 */
export class FilesElementFactory extends CustomElementFactory<object> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-files`, new FilesElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
        return new FilesElement(htmlElement, bindData, context);
    }

}
