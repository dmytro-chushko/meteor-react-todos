import { Meteor } from "meteor/meteor";

export const login = (username, password) =>
  Meteor.loginWithPassword(username, password);

export const logout = () => Meteor.logout();
