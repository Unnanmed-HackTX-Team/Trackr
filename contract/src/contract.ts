import {NearBindgen, near, call, view} from 'near-sdk-js';
import { v4 as uuidv4 } from 'uuid';

@NearBindgen({})
class HelloNear {
    greeting: string = "Hello";

    @view({}) // This method is read-only and can be called for free
    get_greeting(): string {
        return this.greeting;
    }

    @call({}) // This method changes the state, for which it cost gas
    set_greeting({message}: { message: string }): void {
        // Record a log permanently to the blockchain!
        near.log(`Saving greeting ${message}`);
        this.greeting = message;
    }

    @call({})
    create_thing(metadata: Metadata): string {
        near.promiseCreate(`${near.currentAccountId}.${uuidv4()}`, "")
        return "account id";
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
    DateLastUpdated: number;
    DateCreated: number;
    CreatedBy: string;
    Description: string;
}