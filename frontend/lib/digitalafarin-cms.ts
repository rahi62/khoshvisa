import { createCmsClientFromEnv } from "@digitalafarin/cms-next";

export function getCmsClient() {
  if (!process.env.DIGITALAFARIN_CMS_URL || !process.env.DIGITALAFARIN_CMS_SITE) return null;
  return createCmsClientFromEnv({ revalidate: 60 });
}
