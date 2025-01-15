import { useExtention } from "@/components/model/extention";

export const useOwnedExtensions = (ownedExtensionIds: number[]) => {
  return ownedExtensionIds.map((extentionId) => useExtention(extentionId));
};
