/** @typedef {{type:string, kind:'message'|'enum'|'scalar', rule:string, optional:boolean, oneof?:string, keyType?:string}} CurrentField */
/** @type {Record<string, {fields:Record<string, CurrentField>, oneofs:Record<string, string[]>}>} */
export const currentFields: Record<string, {
    fields: Record<string, CurrentField>;
    oneofs: Record<string, string[]>;
}>;
/** @type {Record<string, Record<string, number>>} */
export const currentEnums: Record<string, Record<string, number>>;
export type CurrentField = {
    type: string;
    kind: "message" | "enum" | "scalar";
    rule: string;
    optional: boolean;
    oneof?: string;
    keyType?: string;
};
//# sourceMappingURL=current-fields.d.ts.map