import {getElementAttribute, ObjectElement} from "duice";
import {PropertyChangingEvent} from "duice";

declare var ClassicEditor: any;

/**
 * Ckeditor Element
 */
export class CkeditorElement extends ObjectElement<HTMLElement> {

    private editor: any = null;          // CKEditor 인스턴스

    private internalValue: any = null;     // 초기 setValue 저장

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        this.getHtmlElement().appendChild(this.createStyle());

        // textarea
        const textarea = document.createElement('textarea');
        // textarea.style.height = this.getHtmlElement().style.height;
        console.error("===========", this.getHtmlElement().style.height);
        htmlElement.appendChild(textarea);

        // CKEditor initialization
        let _this = this;
        ClassicEditor
            .create(textarea, {
                extraPlugins: [DefaultUploadPlugin]
            })
            .then((editor: any) => {
                this.editor = editor;
                // set initial value
                if (this.internalValue !== null) {
                    this.editor.setData(this.internalValue);
                }
                // blur event
                editor.editing.view.document.on('blur', (evt: any, data: any) => {
                    if (editor.getData() !== this.internalValue) {
                        this.internalValue = editor.getData();
                        this.notifyPropertyChanged();
                    }
                });
                // double check
                editor.ui.view.editable.element.addEventListener('blur', () => {
                    if (editor.getData() !== this.internalValue) {
                        this.internalValue = editor.getData();
                        this.notifyPropertyChanged();
                    }
                });
            })
            .catch((error: any) => {
                console.error('Error initializing CKEditor:', error);
            });
    }

    /**
     * Creates style
     */
    createStyle(): HTMLStyleElement {
        let style = document.createElement('style');
        style.innerHTML = `
            .ck-editor {
                display: flex;
                flex-direction: column;
                height: 100% !important;
            }
            .ck-editor__main {
                flex: 1;
            }
            .ck-editor__editable_inline:not(.ck-comment__input *) {
                height: 100%;
            }
        `;
        return style;
    }

    /**
     * Notifies property changed
     */
    notifyPropertyChanged(): void {
        let element = this.getHtmlElement();
        let data = this.getBindData();
        let event = new PropertyChangingEvent(element, data, this.getProperty(), this.getValue(), this.getIndex());
        this.notifyObservers(event);
    }

    /**
     * Sets value
     * @param value property value
     */
    override setValue(value: any): void {
        this.internalValue = value;
        if (this.editor) {
            this.editor.setData(value ?? '');
        }
    }

    /**
     * Gets value
     */
    override getValue(): any {
        return this.internalValue;
    }

    /**
     * Sets readonly
     * @param readonly readonly or not
     */
    override setReadonly(readonly: boolean): void {
        if (this.editor) {
            if (readonly === true) {
                this.editor.enableReadOnlyMode('readonly');
            } else {
                this.editor.disableReadOnlyMode('readonly');
            }
        }
    }

    /**
     * Sets disabled
     * @param disabled disabled or not
     */
    override setDisabled(disabled: boolean): void {
        if (this.editor) {
            if (disabled === true) {
                this.editor.enableReadOnlyMode('disabled');
            } else {
                this.editor.disableReadOnlyMode('disabled');
            }
        }
    }

}

/**
 * Default Upload Plugin
 */
class DefaultUploadPlugin {

    constructor(editor: any) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            console.log("== loader", loader);
            return new DefaultUploadAdapter(loader);
        };
    }

}

/**
 * Default Upload Adapter
 */
class DefaultUploadAdapter {

    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    async upload(): Promise<any> {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        default: reader.result
                    });
                };
                reader.onerror = error => {
                    reject(error);
                };
                reader.readAsDataURL(file); // 🔥 Base64
            }));
    }

}