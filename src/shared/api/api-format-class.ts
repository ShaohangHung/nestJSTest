export class ResFormator implements IRes {
  public code: number;
  public msg?: string;
  public payload?: object;

  constructor(payload) {
    this.code = -1;
    this.msg = `success`;
    this.payload = {};
    if (payload === undefined) {
      this.code = 0;
      this.payload = {};
    } else if (payload.name === 'Error') {
      this.msg = payload.message;
    } else {
      this.code = 0;
      this.payload = payload;
    }
  }

  get fullResponse() {
    if (this.code === 0 && !this.payload) {
      throw new Error('payload cannot be blank if no error occur');
    }
    return {
      code: this.code,
      msg: this.msg,
      payload: this.payload,
    };
  }
}

export interface IRes {
  status?: string;
  code: number;
  msg?: string;
  data?: object;
}
