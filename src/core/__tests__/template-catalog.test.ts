import { expect, test } from "bun:test";
import { z } from "zod";
import { TemplateSchema } from "../../config/schema";

test("default template catalog contains valid templates with unique IDs", async () => {
  const catalog: unknown = await Bun.file(
    new URL("../../../docs/templates.json", import.meta.url),
  ).json();
  const templates = z.array(TemplateSchema).min(1).parse(catalog);

  expect(new Set(templates.map((template) => template.id)).size).toBe(
    templates.length,
  );
});
