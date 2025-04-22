import {Configuration, CustomElement, findVariable, ObjectProxy} from "duice";
import {getElementAttribute, callFunction} from "duice";

/**
 * Files Element
 */
export class FilesElement extends CustomElement<object> {

    filenameProperty: string;

    sizeProperty: string;

    files: File[];

    onClick: Function;

    onAdd: Function;

    onRemove: Function;

    iconContent: string = '<svg style="display:block;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="1rem" height="1rem"><path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"/></svg>';

    removeContent: string = '[-]';

    addContent: string = '[+]';

    emptyContent: string = 'No files';

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        // attributes
        this.filenameProperty = getElementAttribute(htmlElement, 'filename-property');
        this.sizeProperty = getElementAttribute(htmlElement, 'size-property');
        const files = getElementAttribute(htmlElement, 'files');
        this.files = files ? findVariable(context, files) : null;

        // event listeners
        const onClick = getElementAttribute(htmlElement, 'on-click');
        this.onClick = onClick ? findVariable(context, onClick) : null;
        const onAdd = getElementAttribute(htmlElement, 'on-add');
        this.onAdd = onAdd ? findVariable(context, onAdd) : null;
        const onRemove = getElementAttribute(htmlElement, 'on-remove');
        this.onRemove = onRemove ? findVariable(context, onRemove) : null;

        // custom style
        this.iconContent = getElementAttribute(htmlElement, 'icon-content') || this.iconContent;
        this.removeContent = getElementAttribute(htmlElement, 'remove-content') || this.removeContent;
        this.addContent = getElementAttribute(htmlElement, 'add-content') || this.addContent;
    }

    /**
     * Do render
     * @param object
     */
    override doRender(object: object): void {
        this.getHtmlElement().innerHTML = '';
        this.getHtmlElement().appendChild(this.createStyle());

        // items
        let arrayProxy = this.getBindData() as Array<object>;
        arrayProxy.forEach((file, index) => {
            let itemElement = this.createItemElement(file, index);
            this.getHtmlElement().appendChild(itemElement);
        });

        // item empty
        if (arrayProxy.length === 0) {
            let emptyElement = document.createElement('div');
            emptyElement.innerHTML = `${this.emptyContent}`;
            emptyElement.classList.add(`${Configuration.getNamespace()}-files__empty`);
            this.getHtmlElement().appendChild(emptyElement);
        }

        // add button
        if (this.files) {
            let addButton= document.createElement('span');
            addButton.innerHTML = this.addContent;
            addButton.classList.add(`${Configuration.getNamespace()}-files__item-add`);
            addButton.addEventListener('click', () => {
                this.addFile().then();
            });
            this.getHtmlElement().appendChild(addButton);
        }
    }

    createItemElement(item: object, index: number): HTMLElement {
        let filename = item[this.filenameProperty];
        let size = parseInt(item[this.sizeProperty]);
        let itemElement = document.createElement('div');
        itemElement.classList.add(`${Configuration.getNamespace()}-files__item`);

        // icon
        let iconElement = document.createElement('span');
        iconElement.innerHTML = `${this.iconContent}`;
        iconElement.classList.add(`${Configuration.getNamespace()}-files__item-icon`);
        itemElement.appendChild(iconElement);

        // filename
        let filenameElement = document.createElement('span');
        filenameElement.innerHTML = `${filename}`;
        filenameElement.classList.add(`${Configuration.getNamespace()}-files__item-filename`);
        itemElement.appendChild(filenameElement);

        // on click listener
        if (this.onClick) {
            filenameElement.style.cursor = 'pointer';
            filenameElement.classList.add(`${Configuration.getNamespace()}-files__item-filename--on-click`);
            filenameElement.addEventListener('click', () => {
                console.log(this.onClick);
                callFunction(this.onClick, filenameElement, item);
            });
        }

        // size
        let sizeElement = document.createElement('span');
        sizeElement.innerHTML = `(${this.formatBytes(size)})`;
        sizeElement.classList.add(`${Configuration.getNamespace()}-files__item-size`);
        itemElement.appendChild(sizeElement);

        // remove button
        if (this.files) {
            let removeButton = document.createElement('span');
            removeButton.innerHTML = this.removeContent;
            removeButton.classList.add(`${Configuration.getNamespace()}-files__item-remove`);
            removeButton.dataset.index = index.toString();
            let _this = this;
            removeButton.addEventListener('click', function() {
                let index = parseInt(this.dataset.index);
                _this.removeFile(index);
            });
            itemElement.appendChild(removeButton);
        }

        // returns
        return itemElement;
    }

    formatBytes(bytes: any, scale = 2): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = parseFloat((bytes / Math.pow(k, i)).toFixed(scale));
        return `${value} ${sizes[i]}`;
    }

    /**
     * Adds file
     */
    async addFile(): Promise<void> {
        let _this = this;
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', 'true');
        input.addEventListener('change', async function () {
            let files = Array.from(this[`files`]);
            if (_this.onAdd) {
                let result = await _this.callOnAddListener(files);
                if (!result) {
                    return false;
                } else {
                    files = result;
                }
            }
            for (const file of files) {
                let item = {
                    [_this.filenameProperty]: file.name,
                    [_this.sizeProperty]: file.size
                };
                globalThis.Object.defineProperty(item, '_file_', { value: file, writable: true });
                (_this.getBindData() as Array<object>).push(item);
                _this.files.push(file);
            }
        });
        input.click();
    }

    /**
     * Removes file
     * @param index index
     */
    async removeFile(index: number): Promise<void> {
        let arrayProxy = this.getBindData() as Array<object>;
        let objectProxy = arrayProxy[index];

        // calls on remove listener
        if (this.onRemove) {
            let result = await this.callOnRemoveListener(objectProxy);
            if (result === false) {
                return;
            }
        }

        // if target file is exist, remove file
        let targetFile = globalThis.Object.getOwnPropertyDescriptor(objectProxy, '_file_')?.value;
        if (targetFile) {
            let fileIndex = this.files.findIndex(it => {
                return it === targetFile;
            });
            this.files.splice(fileIndex, 1);
        }
        arrayProxy.splice(index, 1);
    }

    /**
     * Updates element
     * @param object
     */
    override doUpdate(object: object): void {
        this.render();
    }

    /**
     * Creates style
     */
    createStyle(): HTMLStyleElement {
        let style = document.createElement('style');
        style.innerHTML = `
            ${Configuration.getNamespace()}-files {
                display: block;
            }
            .${Configuration.getNamespace()}-files__item {
                display: flex;
                gap: 0.25rem;
                align-items: center;
            }
            .${Configuration.getNamespace()}-files__item > * {
                display: inline-block;
            }
            .${Configuration.getNamespace()}-files__item-icon {
                height: 1em;
                filter: invert(0.5);
            }
            .${Configuration.getNamespace()}-files__item-filename {
            }
            .${Configuration.getNamespace()}-files__item-filename--on-click:hover {
                text-decoration: underline;
            }
            .${Configuration.getNamespace()}-files__item-size {
            }
            .${Configuration.getNamespace()}-files__item-remove {
                cursor: pointer;
            } 
            .${Configuration.getNamespace()}-files__item-add {
                cursor: pointer;
            }
            .${Configuration.getNamespace()}-files__empty {
            }
        `;
        return style;
    }

    async callOnAddListener(files: File[]): Promise<File[]> {
        return await callFunction(this.onAdd, null, files);
    }

    async callOnRemoveListener(item: object): Promise<boolean> {
        return await callFunction(this.onRemove, null, item);
    }

}

