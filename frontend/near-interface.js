/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
import { Contract } from 'near-api-js';

export class Thing {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
    this.contract = new Contract(this.wallet.wallet.account(), this.contractId, {
      viewMethods: ["get_thing"],
      changeMethods: ["set_thing"]
    });
  }

  async getThing() {
    console.log("aaaa")
    const data = await this.contract.get_thing();
    console.log(data);
    return data;
  }

  async setThing(args) {
    console.log(args);
    return await this.contract.set_thing(args, "300000000000000", "0");
  }
}
//abcc88e6-2870-4ba3-925e-0666a557ed38.natelu.testnet