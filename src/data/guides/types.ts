export interface GuideStep {
  title: string;
  description: string;
  code?: string;
}

export interface GuideResource {
  label: string;
  url: string;
}

export interface Guide {
  providerId: "openai" | "anthropic" | "google" | "mistral" | "deepseek";
  providerName: string;
  tagline: string;
  modelsCovered: string[];
  whatYouLearn: string[];
  intro: string;
  prerequisites: string[];
  steps: GuideStep[];
  costTips: string[];
  commonMistakes: string[];
  resources: GuideResource[];
}
