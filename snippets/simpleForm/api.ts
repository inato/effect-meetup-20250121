import schema from "./schema";
import * as yup from "yup";

type Values = yup.InferType<typeof schema>;

export const sendToApi = async (_: any) => {};
export const getFromApi = async (): Promise<Values> => ({}) as any;
