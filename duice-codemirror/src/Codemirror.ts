/// <reference path="../node_modules/duice/dist/duice.d.ts" />
declare var CodeMirror: any;

namespace duice.extension {

    export class Codemirror extends duice.ObjectElement<HTMLElement> {

        codeMirror: any;

        toolbar: HTMLDivElement;

        constructor(element: HTMLElement, bindData: object, context: object) {
            super(element, bindData, context);
            this.getHtmlElement().style.display = 'block';

            // config
            let config = {
                mode: 'markdown',
                inputStyle: 'textarea',
                lineNumbers: true,
                theme: "default",
                extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
            };

            // textarea
            let textarea = document.createElement('textarea');
            this.getHtmlElement().appendChild(textarea);

            // create code mirror
            this.codeMirror = CodeMirror.fromTextArea(textarea, config);
            this.codeMirror.setSize('100%','100%');

            // add change event listener
            this.codeMirror.on("blur",() => {
                let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                this.notifyObservers(event);
            });
        }

        override setValue(value: any): void {
            if(!value) {
                value = '';
            }
            this.codeMirror.doc.setValue(value);
        }

        override getValue(): any {
            let value = this.codeMirror.doc.getValue();
            if(!value) {
                return null;
            }
            return value;
        }

    }

}

