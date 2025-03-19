import {getElementAttribute, ObjectElement} from "duice";
import {PropertyChangeEvent} from "duice";

declare var CodeMirror: any;

/**
 * Codemirror Element
 */
export class CodemirrorElement extends ObjectElement<HTMLElement> {

    mode: string = 'text/x-markdown';

    theme: string = 'default';

    codeMirror: any;

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        this.getHtmlElement().style.display = 'block';
        // option
        this.mode = getElementAttribute(htmlElement, 'mode') || this.mode;
        this.theme = getElementAttribute(htmlElement, 'theme') || this.theme;
        // config
        let config = {
            mode: this.mode,
            inputStyle: 'textarea',
            lineNumbers: true,
            theme: this.theme,
            extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
        };
        // textarea
        let textarea = document.createElement('textarea');
        this.getHtmlElement().appendChild(textarea);
        // create code mirror
        this.codeMirror = CodeMirror.fromTextArea(textarea, config);
        this.codeMirror.setSize('100%','100%');
        // refresh (not working without setTimeout)
        setTimeout(() => {
            this.codeMirror.refresh();
        },1);
        // add change event listener
        this.codeMirror.on("blur",() => {
            let event = new PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
            this.notifyObservers(event);
        });
    }

    /**
     * Sets value
     * @param value property value
     */
    override setValue(value: any): void {
        if(!value) {
            value = '';
        }
        let scrollInfo = this.codeMirror.getScrollInfo();
        this.codeMirror.doc.setValue(value);
        this.codeMirror.scrollTo(scrollInfo.left, scrollInfo.top);
    }

    /**
     * Gets value
     */
    override getValue(): any {
        let value = this.codeMirror.doc.getValue();
        if(!value) {
            return null;
        }
        return value;
    }

    /**
     * Sets readonly
     * @param readonly readonly or not
     */
    override setReadonly(readonly: boolean): void {
        this.codeMirror.setOption('readOnly', readonly);
    }

}
