import {Configuration, CustomElement, CustomElementFactory, ElementRegistry} from "duice";
import {JsplumbElement} from "./JsplumbElement";

export class JsplumbElementFactory extends CustomElementFactory<object> {

    /**
     * Static block
     */
    static {
        // register
        ElementRegistry.register(`${Configuration.getNamespace()}-jsplumb`, new JsplumbElementFactory());
    }

    /**
     * Creates element
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
        return new JsplumbElement(htmlElement, bindData, context);
    }

}
