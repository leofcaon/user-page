export class UserModel {
  constructor(
    public id?: number,
    public email?: string,
    public username?: string
  ) {
  }
  [key: string]: any;
}
