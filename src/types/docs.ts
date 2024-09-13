export interface EvidenceFile {
  name: string;
  description?: string;
  fileURI?: string;
}

export interface RegistrationFile {
  name: string;
  photo: string;
  video: string;
  bio: string;
}

export interface MetaEvidenceFile {
  title: string;
  fileURI: string;
}
