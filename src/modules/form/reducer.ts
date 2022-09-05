export enum VideoType {
  PHRASE = "phrase",
  SIGN = "sign",
}

export interface SubmissionInfo {
  language: "en";
  humanityId: string;
  name: string;
  bio: string;
  photo: { uri: string; content: ArrayBufferLike } | null;
  video: { uri: string; content: ArrayBufferLike } | null;
  videoType: VideoType | null;
}

export type SubmissionAction =
  | { type: "SOUL_ID"; payload: string }
  | { type: "NAME"; payload: string }
  | { type: "BIO"; payload: string }
  | { type: "PHOTO"; payload: { uri: string; content: ArrayBufferLike } }
  | { type: "VIDEO"; payload: { uri: string; content: ArrayBufferLike } }
  | { type: "VIDEO_MODE"; payload: VideoType }
  | { type: "DELETE_PHOTO" }
  | { type: "DELETE_VIDEO" };

export type SubmissionReducer = (
  s: SubmissionInfo,
  a: SubmissionAction
) => SubmissionAction;

export const emptySubmission: SubmissionInfo = {
  language: "en",
  humanityId: "",
  name: "",
  bio: "",
  photo: null,
  video: null,
  videoType: null,
};

export const submissionReducer = (
  state: SubmissionInfo,
  action: SubmissionAction
): SubmissionInfo => {
  switch (action.type) {
    case "SOUL_ID":
      return { ...state, humanityId: action.payload };
    case "NAME":
      return { ...state, name: action.payload };
    case "BIO":
      return { ...state, bio: action.payload };
    case "PHOTO":
      return { ...state, photo: action.payload };
    case "VIDEO":
      return { ...state, video: action.payload };
    case "VIDEO_MODE":
      return { ...state, videoType: action.payload };
    case "DELETE_PHOTO":
      return { ...state, photo: null };
    case "DELETE_VIDEO":
      return { ...state, video: null, videoType: null };
    default:
      return state;
  }
};
