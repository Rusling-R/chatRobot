class verify {
  constructor(id, verifyFn) {
    this.formDom = $(`#${id}`);
    this.errorP = this.formDom.nextElementSibling;
    this.verifyFn = verifyFn;
    this.formDom.addEventListener('blur', () => this.validator());
  }

  async validator() {
    const result = await this.verifyFn(this.formDom.value);
    this.errorP.tagName === 'P' && (this.errorP.innerText = result);
    if (result) {
      return false;
    } else {
      return true;
    }
  }

  static async validatForm(...args) {
    const results = await Promise.all(args.map((i) => i.validator()));
    return results.every((i) => i);
  }
}
