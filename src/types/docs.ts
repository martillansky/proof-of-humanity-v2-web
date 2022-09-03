export interface EvidenceFile {
  name: string;
  description?: string;
  fileURI?: string;
}

export interface RegistrationFile {
  name?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  bio?: string;
  videoType: string;
  photo: string;
  video: string;
}
