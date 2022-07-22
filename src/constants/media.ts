import UAParser from "ua-parser-js";

export const USER_AGENT = new UAParser.UAParser(
  navigator.userAgent
).getResult();

export const OS = USER_AGENT.os;
export const IS_MOBILE = USER_AGENT.device.type === "mobile";
export const IS_IOS = OS.name === "iOS";
export const IS_ANDROID = OS.name === "Android";
