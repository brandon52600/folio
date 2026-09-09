import { hpiGroups, exposureFields } from './subjective.ts';
import type { Outline } from './catalog.ts';
// All templates include the full outline; the PDF marks it "if applicable".
// Retain these entry points so catalog counts and previews share the same fields.
export function groupsFor(_outline: Outline) { return hpiGroups; }
export function exposuresFor(_outline: Outline) { return exposureFields; }
