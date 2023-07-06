import { Meteor } from "meteor/meteor";

export const login = (username, password) =>
  Meteor.loginWithPassword(username, password, (error) => alert(error.reason));

export const logout = () => Meteor.logout();
