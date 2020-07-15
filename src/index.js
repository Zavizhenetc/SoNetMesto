
import "./index.css";
import {Api} from "./scripts/Api";
import {Card} from "./scripts/Card";
import {CardList} from "./scripts/CardList";
import {FormValidator} from "./scripts/FormValidator";
import {Popup} from "./scripts/Popup";
import {UserInfo} from "./scripts/UserInfo";
const log = (elem) => {
  console.log(elem);
};

(() => {
  const template = document
    .querySelector("#place-card")
    .content.querySelector(".place-card");

  // ================== api
  const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
  const config = {
    baseUrl: `${API_URL}/cohort11`,
    // baseUrl: "https://praktikum.tk/cohort11",
    headers: {
      authorization: "5d59240d-10ce-4e5c-b0e4-dbb9bb378332",
      "Content-Type": "application/json",
    },
  };
  const api = new Api(config);

  const formNewCard = document.forms.new;
  const formEditInfo = document.forms.editInfo;
  const popupAdd = new Popup(document.querySelector(".popup__new-card"));
  const popupEdit = new Popup(document.querySelector(".popup__edit-info"));
  const popupPictures = new Popup(document.querySelector(".popup__pictures"));
  const userInfoButton = document.querySelector(".user-info__button");
  const userInfoEditButton = document.querySelector(".user-info__edit-button");
  const placesList = document.querySelector(".places-list");
  const popupContentPictures = document.querySelector(
    ".popup__content-pictures"
  );
  const cardList = new CardList(placesList);
  const userInfoAbout = document.querySelector(".user-info__job");
  const userAvatar = document.querySelector(".user-info__photo");
  const userInfoName = document.querySelector(".user-info__name");

  const openPicturesCall = (link) => {
    popupContentPictures.setAttribute("src", link);
    popupPictures.open();
  };
  const userEditButton = document.querySelector(".user-info__edit-button");
  const { userName, userAbout } = formEditInfo.elements;
  const userInfoDate = new UserInfo(userInfoName, userInfoAbout, api);
  const { name, link } = formNewCard.elements;
  const validationFormNewCard = new FormValidator(formNewCard);
  const validationFormEditInfo = new FormValidator(formEditInfo);

  validationFormNewCard.setEventListenersValidation();
  validationFormEditInfo.setEventListenersValidation();

  // открытие формы Newcard
  userInfoButton.addEventListener("click", () => {
    formNewCard.reset();
    validationFormNewCard.resetError();
    validationFormNewCard.setSubmitButtonState(false);
    popupAdd.open();
  });

  // открытие формы UserInf
  userInfoEditButton.addEventListener("click", () => {
    validationFormEditInfo.resetError();
    validationFormEditInfo.setSubmitButtonState(true);
    popupEdit.open();
  });

  // ================== addCard=============

  function addCard(event) {
    event.preventDefault();
    api
      .postCard(name.value, link.value)
      .then(() => {
        const cardContainer = new Card(name.value, link.value, template, openPicturesCall, api)
        .createCard();
        cardList.addCard(cardContainer);
        formNewCard.reset();
      })
      .then(() => {
        popupAdd.close();
      })
      .catch((err) => {
        console.log(`Без паники ! это всего лишь ошибка ${err}`);
      });
  }
  formNewCard.addEventListener("submit", addCard);

  userEditButton.addEventListener("click", () => {
    userName.value = userInfoName.textContent;
    userAbout.value = userInfoAbout.textContent;
  });

  formEditInfo.addEventListener("submit", (evt) => {
    evt.preventDefault();
    validationFormEditInfo.setSubmitButtonState(true);

    api
      .patchUserInfo(userName.value, userAbout.value)
      .then((res) =>{ userInfoDate.setUserInfo(res.name, res.about /* ,res.avatar */);
      userInfoDate.updateUserInfo(userInfoName, userInfoAbout /* ,userAvatar */)}) 
      .then(() => {
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Без паники ! это всего лишь ошибка ${err}`);
      });
  });

  // ======================== рэндер карт =====================
  api
    .getBasicCards()
    .then((res) => {
      const basicCard = res.map(({ name, link, likes, id }) => {
        return new Card(name, link,  template,  openPicturesCall, likes, id, res).createCard();
      });
      cardList.render(basicCard);
      // log(likes);
    })
    .catch((err) => {
      console.log(`Без паники ! это всего лишь ошибка ${err} `);
    });

  // =========================== данные пользователя ===================

  api
    .getUserInfo()
    .then((res) => {
      userInfoDate.setUserInfo(res.name, res.about  /* ,res.avatar */);
      userInfoDate.updateUserInfo(userInfoName, userInfoAbout  /* ,userAvatar */);
    })
    .catch((err) => {
      console.log(`Без паники ! это всего лишь ошибка ${err}`);
    });
})();

