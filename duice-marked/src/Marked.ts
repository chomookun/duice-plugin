/// <reference path="../node_modules/duice/dist/duice.d.ts" />
declare var marked: any;
declare var Prism: any;

namespace duice.plugin {

    export class Marked extends duice.ObjectElement<HTMLElement> {

        div: HTMLDivElement;

        config: object;

        constructor(element: HTMLElement, bindData: object, context: object) {
            super(element, bindData, context);

            // creates child div
            this.div = document.createElement('div');
            this.getHtmlElement().appendChild(this.div);

            // config
            this.config = {
                headerIds: false,
                mangle: false,
                breaks: true,
                gfm: true
            }
        }

        override setValue(value: any): void {
            value = value ? value : '';
            value = marked.parse(value, this.config);
            this.div.innerHTML = value;
            this.div.querySelectorAll('[class^=language-]').forEach(function(pre:Element){
                pre.classList.add('line-numbers');
            });
            // highlight
            Prism.highlightAll();
        }

    }

}

