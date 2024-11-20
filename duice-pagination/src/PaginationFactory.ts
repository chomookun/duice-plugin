import {Configuration, CustomElementFactory} from "duice";
import {DataElementRegistry} from "duice";
import {CustomElement} from "duice";
import {Pagination} from "./Pagination";

export class PaginationFactory extends CustomElementFactory<object> {

    static {
        // register
        DataElementRegistry.register(`${Configuration.getNamespace()}-pagination`, new PaginationFactory());
    }

    override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object> {
        return new Pagination(htmlElement, bindData, context);
    }

}
