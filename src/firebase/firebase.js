import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import dbActions from "./dbActions";

import config from "./firebase.config";

const app = firebase.initializeApp(config);

export const auth = app.auth();
export default app;
export const db = {
  places: dbActions(app.database().ref("/places")),
};
