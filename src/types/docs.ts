export interface EvidenceFile {
  name: string;
  description?: string;
  fileURI?: string;
}

export interface RegistrationFile {
  photo: string;
  video: string;
}

export interface MetaEvidenceFile {
  title: string;
  fileURI: string;
}
