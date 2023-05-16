export interface Module {
  id: number;
  title: string;
  terms: Terms[];
}

export interface Terms {
  term: string;
  translation: string;
}
