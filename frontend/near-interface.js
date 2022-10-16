/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class Thing {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getThing() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_thing' });
  }

  async setThing(args) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_thing', args });
  }
}