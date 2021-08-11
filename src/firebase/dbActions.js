// import { dbTutorials as db } from "../firebase";
// const db = firebase.ref("/tutorials");

export default function actions(db) {
  const getAll = () => {
    return db;
  };

  const create = (data) => {
    return db.push(data);
  };

  const update = (key, data) => {
    return db.child(key).update(data);
  };

  const remove = (key) => {
    return db.child(key).remove();
  };

  const removeAll = () => {
    return db.remove();
  };
  return {
    getAll,
    create,
    update,
    remove,
    removeAll,
  };
}
