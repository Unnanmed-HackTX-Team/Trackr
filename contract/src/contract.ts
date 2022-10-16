import { NearBindgen, call, near, Vector, view } from "near-sdk-js";
@NearBindgen({})
class Thing {
    vector: Vector;

    constructor() {
        this.vector = new Vector('unique-id-vector1');
    }
    
    @view({})
    get_thing(account_id: number): Metadata {
        near.log("get_thing", account_id);
        return this.vector.get(account_id) as Metadata;
    }

    @call({})
    set_thing(metaData: Metadata): void {
        near.log("set_thing", metaData);
        this.vector.push(metaData);
    }
}

interface Log {
    Timestamp: number;
    Location: string;
    CreatedBy: string;
    State: string;
    Notes: string;
}

interface Metadata {
    DateCreated: number;
    DateUpdated: number;
    Creator: string;
    Name: string;
    Description: string;
    Logs: Log[];
}