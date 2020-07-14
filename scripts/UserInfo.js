class UserInfo {
    constructor( name, about, api) {
      this.name = name.textContent;
      this.about = about.textContent;
      this.api = api;
    }
    setUserInfo(name, about) {
      this.name = name;
      this.about = about;
    }
    
    updateUserInfo(name, about) {
      name.textContent = this.name;
      about.textContent = this.about;
    }
  
  }



