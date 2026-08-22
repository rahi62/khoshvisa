import { createCmsClientFromEnv } from "@digitalafarin/cms-next";

export const cms = createCmsClientFromEnv({ revalidate: 60 });
