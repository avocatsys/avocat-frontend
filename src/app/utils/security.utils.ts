export class Security {

  public static setToken(token: string) {
    localStorage.setItem("user.token", token);
  }

  public static getToken(): string {
    const data = localStorage.getItem("user.token");
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public static hasToken(): boolean {
    if (this.getToken()) return true;
    else return false;
  }

  public static clear() {
    localStorage.removeItem("user.token");    
  }
}
