import assert from "node:assert/strict";
import { test } from "node:test";
import { isPublishedProject } from "./publish.ts";

test("only explicitly published, unhidden projects are public", () => {
  assert.equal(isPublishedProject({ published: true }), true);
  assert.equal(isPublishedProject({ published: true, hidden: false }), true);
  assert.equal(isPublishedProject({}), false);
  assert.equal(isPublishedProject({ published: false }), false);
  assert.equal(isPublishedProject({ published: true, hidden: true }), false);
  assert.equal(isPublishedProject({ sample: true } as { published?: boolean }), false);
});
