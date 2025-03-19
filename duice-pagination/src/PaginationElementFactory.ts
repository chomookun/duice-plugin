import {Configuration, CustomElementFactory} from "duice";
import {ElementRegistry} from "duice";
import {CustomElement} from "duice";
import {PaginationElement} from "./PaginationElement";

/**
 * Pagination Element Factory
 */
export class PaginationElementFactory extends CustomElementFactory<object> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-pagination`, new PaginationElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
        return new PaginationElement(htmlElement, bindData, context);
    }

}
