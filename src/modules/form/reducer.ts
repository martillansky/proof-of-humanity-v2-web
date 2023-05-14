export enum VideoType {
  PHRASE = "phrase",
  SIGN = "sign",
}

export interface SubmissionInfo {
  humanityId: string;
  name: string;
  photo: { uri: string; content: string | Blob } | null;
  video: { uri: string; content: string | Blob } | null;
}

export type SubmissionAction =
  | { type: "SOUL_ID"; payload: string }
  | { type: "NAME"; payload: string }
  | { type: "BIO"; payload: string }
  | { type: "PHOTO"; payload: { uri: string; content: string | Blob } }
  | { type: "VIDEO"; payload: { uri: string; content: string | Blob } }
  | { type: "DELETE_PHOTO" }
  | { type: "DELETE_VIDEO" };

export type SubmissionReducer = (
  s: SubmissionInfo,
  a: SubmissionAction
) => SubmissionAction;

export const emptySubmission: SubmissionInfo = {
  humanityId: "",
  name: "",
  photo: null,
  video: null,
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
    case "PHOTO":
      return { ...state, photo: action.payload };
    case "VIDEO":
      return { ...state, video: action.payload };
    case "DELETE_PHOTO":
      return { ...state, photo: null };
    case "DELETE_VIDEO":
      return { ...state, video: null };
    default:
      return state;
  }
};
