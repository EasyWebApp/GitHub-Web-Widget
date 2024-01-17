interface SymbolConstructor {
    readonly observable: unique symbol;
}

declare module '*.module.less' {
    const content: Record<string, string>;

    export = content;
}

declare module '*.png' {
    const content: string;

    export default content;
}
