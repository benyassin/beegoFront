export interface Form {
    id: number;
    name: string;
    geometry: string;
    campaignId: number;
    color: string;
    schema: Schema;
}

export interface Schema {
    components: Array<Object>;
}
