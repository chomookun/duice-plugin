declare var jsPlumb: any;
declare namespace duice.plugin {
    class Jsplumb extends duice.CustomElement<object> {
        elementProperty: string;
        elementLoop: string;
        elementIdProperty: string;
        elementPositionXProperty: string;
        elementPositionYProperty: string;
        connectorProperty: string;
        connectorSourceProperty: string;
        connectorTargetProperty: string;
        htmlElementTemplate: string;
        container: HTMLElement;
        jsPlumbInstance: any;
        elementItems: Map<string, HTMLElement>;
        sourceEndpoints: Map<string, any>;
        targetEndpoints: Map<string, any>;
        connectorItems: any[];
        constructor(htmlElement: HTMLElement, bindData: object, context: object);
        createStyle(): HTMLStyleElement;
        doRender(object: object): void;
        doUpdate(object: object): void;
        clearContainer(): void;
        fitContainerToContent(): void;
        createElementItem(elementObject: object, context: object, index: number): void;
        createConnectorItem(connectorObject: object): void;
        addConnectorData(connectorSourceId: string, connectorTargetId: string): void;
        removeConnectorData(connectorSourceId: string, connectorTargetId: string): void;
        isEditable(): boolean;
    }
}
declare namespace duice.plugin {
    class DiagramFactory extends CustomElementFactory<object> {
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): CustomElement<object>;
    }
}
