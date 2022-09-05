import UAParser from "ua-parser-js";

const parser = new UAParser(navigator.userAgent);
export const USER_AGENT = parser.getResult();

const device = parser.getDevice();
export const IS_MOBILE = device.type === "mobile" || device.type === "tablet";

export const OS = parser.getOS();
export const IS_IOS = OS.name === "iOS";
export const IS_ANDROID = OS.name === "Android";
