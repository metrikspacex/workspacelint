import type { Rules } from "eslint-define-config";

type FilterRules<CollectedRules> = Exclude<CollectedRules, Rules>;

export type { FilterRules };
