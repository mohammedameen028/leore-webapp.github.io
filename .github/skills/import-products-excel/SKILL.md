---
name: import-products-excel
description: "Import or update storefront products from an uploaded Excel workbook and write them to src/data/products.json. Use when the user uploads, attaches, or provides an .xlsx/.xlsm product spreadsheet and asks to add, sync, or import products."
argument-hint: "Excel workbook path or attached workbook"
---

# Import Products from Excel

Use this workflow to add or update the LEORÉ storefront catalog from a product workbook.

## Procedure

1. Locate the provided workbook. For `.xlsx` or `.xlsm`, read worksheets and cell values with an available Excel parser such as Python `openpyxl` (`data_only=True` for cached formula results). Do not modify the workbook. For legacy `.xls` or an unreadable attachment, ask for an `.xlsx` or CSV copy. If no parser is available, ask before installing anything; do not add a one-time import dependency to the storefront.
2. Identify the product worksheet, header row, and populated rows. If there are multiple plausible sheets, merged headers, formulas without cached results, or unclear columns, report the ambiguity and ask a focused question before editing.
3. Map columns to the catalog schema. Match headers case-insensitively and accept clear synonyms, but do not infer uncertain values:

   | Catalog field | Common workbook headers |
   | --- | --- |
   | `id` | ID, slug, handle, SKU |
   | `name` | product, product name, title |
   | `category` | category, product type, collection |
   | `price` | price, selling price |
   | `tag` | tag, label, badge |
   | `image` | image, image path, filename |
   | `imageAlt` | image alt, alt text |
   | `details` | details, description, product description |
   | `sizes` | sizes, available sizes, size options |
   | `inStock` | in stock, availability, status, quantity |

4. Validate every row before writing. `name`, `category`, numeric `price`, `image`, `sizes`, and stock availability must be unambiguous. Prices in this catalog are INR; ask before converting another currency. Parse sizes into an array (split only on clear delimiters). Convert explicit stock booleans/statuses or numeric quantity (`> 0` means in stock); ask when stock meaning is unclear. Use an explicit ID/slug when available; otherwise make a lowercase hyphenated slug from the name and check uniqueness. Do not silently skip invalid rows.
5. Verify each image exists. Catalog image paths are site-relative, such as `assets/products/example.jpg`; runtime files must also exist under `public/assets/products/` because the storefront resolves URLs from the public directory. If the workbook contains embedded images or references missing files, explain what is missing and ask how to match or supply them. Do not invent filenames or replace unrelated images.
6. Read `src/data/products.json` and preserve its top-level `heroImage` and all existing products. Upsert workbook rows by `id`: update a matching product, append a new one, and flag duplicate IDs or likely name collisions for confirmation. Preserve these exact JSON keys: `id`, `name`, `category`, `price`, `tag`, `image`, `imageAlt`, `details`, `sizes`, and `inStock`. Use a concise neutral `imageAlt` based only on the product name if no alt text is supplied; use an empty `tag` or `details` only when those fields are absent and not needed to resolve ambiguity.
7. Write valid JSON without changing unrelated formatting or products. Check that IDs are unique, required fields have the expected types, and all referenced images exist in `public/assets/products/`. Run `npm run build` and report the rows added, updated, or held for clarification.

Keep the change scoped to `src/data/products.json` and image files explicitly supplied for these products. Do not change application code or add project dependencies for the import.