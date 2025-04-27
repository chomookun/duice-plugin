import {getElementAttribute, ObjectElement} from "duice";
import {PropertyChangingEvent} from "duice";

declare var tinymce: any;

/**
 * Tinymce Element
 */
export class CkeditorElement extends ObjectElement<HTMLElement> {

    content: string;

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        htmlElement.style.display = 'block';
        let textarea = document.createElement('textarea');
        textarea.id = 'myDynamicEditor';
        htmlElement.appendChild(textarea);
        let _this = this;
        tinymce.init({
            selector: '#myDynamicEditor',
            branding: false,
            menubar: false,
            // height: 400,
            plugins: 'lists link image table code',
            toolbar: 'undo redo bold italic underline alignleft aligncenter alignright bullist numlist link image table code',
            // toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
            setup: (editor: any) => {
                editor.on('init', () => {
                    editor.setContent(_this.content);
                });
                editor.on('blur', () => {
                    console.error("===========blur", editor.getContent());
                    _this.content = editor.getContent();
                    let element = this.getHtmlElement();
                    let data = this.getBindData();
                    let event = new PropertyChangingEvent(element, data, this.getProperty(), this.getValue(), this.getIndex());
                    this.notifyObservers(event);
                });
            }
        });
    }

    /**
     * Sets value
     * @param value property value
     */
    override setValue(value: any): void {
        this.content = value;
        tinymce.get('myDynamicEditor').setContent(value);
    }

    /**
     * Gets value
     */
    override getValue(): any {
        // return this.content;
        return tinymce.get('myDynamicEditor').getContent();
    }

    /**
     * Sets readonly
     * @param readonly readonly or not
     */
    override setReadonly(readonly: boolean): void {
        // this.codeMirror.setOption('readOnly', readonly);
    }

}
