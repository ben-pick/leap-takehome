import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";
config({ path: ".env" });
export const huggingFace = new HfInference(process.env.HF_TOKEN, {});
