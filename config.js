import * as dotenv from "dotenv";
import { getArgs } from "./helpers.js";

dotenv.config();

export const args = getArgs();

/**
 * possible values: 'openai' or 'ollama'
 */
console.log("Processing provider config:");
console.log("- args.PROVIDER:", args.PROVIDER);
console.log("- process.env.PROVIDER:", process.env.PROVIDER);
export const AI_PROVIDER = args.PROVIDER || process.env.PROVIDER || "openai";
console.log("- Final AI_PROVIDER:", AI_PROVIDER);

/**
 * name of the model to use.
 * can use this to switch between different local models.
 */
export const MODEL = args.MODEL || process.env.MODEL || "gpt-4o-mini";
