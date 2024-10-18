import { adminSeeder } from "./adminSeeder";
import {
  dailyPriceProprtyPriceUpdate,
  proprtyAreaSeeder,
  proprtyRoomSeeder,
  proprtySeeder,
  proprtyTypeSeeder,
} from "./rmsApiSeeder";

export const seederData = async () => {
  await adminSeeder();
  // await proprtyTypeSeeder();
  // await proprtySeeder();
  // await proprtyRoomSeeder();
  // await proprtyAreaSeeder();
  await dailyPriceProprtyPriceUpdate();
};
