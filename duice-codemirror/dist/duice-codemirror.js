/// <reference path="../node_modules/duice/dist/duice.d.ts" />
var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class Codemirror extends duice.ObjectElement {
            constructor(element, bindData, context) {
                super(element, bindData, context);
                this.mode = 'text/x-markdown';
                this.theme = 'default';
                this.getHtmlElement().style.display = 'block';
                // option
                this.mode = duice.getElementAttribute(element, 'mode') || this.mode;
                this.theme = duice.getElementAttribute(element, 'theme') || this.theme;
                // config
                let config = {
                    mode: this.mode,
                    inputStyle: 'textarea',
                    lineNumbers: true,
                    theme: this.theme,
                    extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
                };
                // textarea
                let textarea = document.createElement('textarea');
                this.getHtmlElement().appendChild(textarea);
                // create code mirror
                this.codeMirror = CodeMirror.fromTextArea(textarea, config);
                this.codeMirror.setSize('100%', '100%');
                // refresh (not working without setTimeout)
                setTimeout(() => {
                    this.codeMirror.refresh();
                }, 1);
                // add change event listener
                this.codeMirror.on("blur", () => {
                    let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                    this.notifyObservers(event);
                });
            }
            setValue(value) {
                if (!value) {
                    value = '';
                }
                this.codeMirror.doc.setValue(value);
            }
            getValue() {
                let value = this.codeMirror.doc.getValue();
                if (!value) {
                    return null;
                }
                return value;
            }
            setReadonly(readonly) {
                this.codeMirror.setOption('readOnly', readonly);
            }
            setDisable(disable) {
                this.codeMirror.setOption('readOnly', disable);
            }
        }
        extension.Codemirror = Codemirror;
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class CodemirrorFactory extends duice.ObjectElementFactory {
            createElement(htmlElement, bindData, context) {
                return new extension.Codemirror(htmlElement, bindData, context);
            }
        }
        extension.CodemirrorFactory = CodemirrorFactory;
        // register
        duice.DataElementRegistry.register(`${duice.getNamespace()}-codemirror`, new CodemirrorFactory());
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
//# sourceMappingURL=duice-codemirror.js.map