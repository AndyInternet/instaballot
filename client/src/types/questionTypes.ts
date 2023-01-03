export interface Answer {
  _id?: string;
  label: string;
}

export interface Vote {
  _id?: string;
  answerId: string;
  fingerprint: string;
}

export interface Question {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt: Date;
  label: string;
  answers: Answer[];
  votes: Vote[];
  access: string[];
}
