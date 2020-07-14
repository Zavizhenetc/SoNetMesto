
class Card {

  constructor(name, link,  template,  openPicturesCall, likes, id, res){
    this.name = name;
    this.link = link;
    this.template = template;
    this.openPicturesCall = openPicturesCall;
    this.remove = this.remove.bind(this);
    this.res = res;
    this.likes = likes;
   

  }

  createCard() {
    this.container = this.template.cloneNode(true);
    this.container.querySelector(".place-card__name").textContent = this.name;
    this.container.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
    this.container.querySelector(".place-card__likes").textContent = `${this.likes.length}`;
    this.setEventListeners();
    return this.container;
  }
 


  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");

  }

  remove() {
    this.container.remove();
 
  }
 
  openImage = ()=> {
    this.openPicturesCall(this.link);
  };

  setEventListeners() {
    this.container.addEventListener("click", (event) => {
      if (event.target.classList.contains("place-card__like-icon")) {
        this.like(event);
      }
      if (event.target.classList.contains("place-card__delete-icon")) {

        this.remove(event);
      }
      if (event.target.classList.contains("place-card__image")) {

        this.openImage(this.link);
      }
    });
  }
  
  
}




