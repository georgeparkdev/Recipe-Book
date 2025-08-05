# Feature Plan: Search & Tag System for Recipe Book

## Overview

Implement a robust search and tag system for the React frontend, supporting both free-text and tag-based search, with partial match and combinable filters. Update the recipe JSON structure and prompt to support custom tags.

---

## 1. Search on Main Page

- Add a search input to the main page.
- Support searching by recipe title (partial match, case-insensitive).
- Support searching by custom tags (partial match, case-insensitive).
- Allow combining title and tag search (e.g., "pasta" + "dinner").
- Display filtered results in real time as the user types.

## 2. Tag System

- Allow users to assign any custom tags to recipes (free-form, e.g., "dinner", "breakfast", "quick").
- Store tags in a new array field in each recipe JSON: `custom_tags: [string, ...]`.
- Update all recipe JSON files to include the `custom_tags` array (can be empty if no tags).
- UI: Display tags on recipe cards and detail pages. Allow clicking a tag to filter/search by it.

## 3. JSON Structure Update

- Add a `custom_tags` array to the recipe schema:
  ```json
  "custom_tags": ["dinner", "quick", ...]
  ```
- Ensure all new and existing recipes follow this structure.

## 4. Prompt Update

- Update the recipe normalization prompt to extract custom tags from the recipe text if present.
- If no custom tags are present, set `custom_tags` to an empty array.

## 5. Implementation Steps

1. Update the recipe JSON schema and all existing recipe files.
2. Update the prompt for recipe normalization.
3. Implement search UI and logic in the React app.
4. Add tag display and clickable filtering in the UI.
5. Test combined search (title + tags) and edge cases.
6. Update documentation to reflect new features and usage.

## 6. Success Criteria

- Users can search recipes by title and tags, with partial and combined filters.
- Tags are free-form, stored in `custom_tags`, and visible in the UI.
- Prompt and JSON structure are updated and consistent.
- All features are tested and documented.
