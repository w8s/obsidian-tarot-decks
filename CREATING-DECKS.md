# Creating Custom Divination Decks

This guide shows you how to create your own divination decks for the Obsidian Tarot Practice plugin.

## Quick Start

1. Copy one of the [example decks](decks/) as a template
2. Edit the JSON with your cards
3. Test in Obsidian (Settings → Tarot Practice → Deck Management → "Add deck")
4. Optionally add images
5. Share with the community (submit a PR!)

## JSON Structure

### Required Fields

```json
{
  "id": "unique-deck-id",           // Lowercase, hyphens only
  "name": "Display Name",            // How it appears in UI
  "cards": [...],                    // Array of card objects
  "cardCount": 24,                   // Total number of cards
  "supportsReversals": true,         // Can cards be reversed?
  "isBuiltIn": false                 // Always false for custom decks
}
```

### Optional Fields

```json
{
  "description": "Brief description of this deck",
  "backImageUrl": "back.png",        // Path to deck back image
  "metadata": {
    "author": "Your Name",
    "year": 2025,
    "publisher": "Publisher Name",
    "tradition": "oracle"            // See tradition types below
  }
}
```

### Tradition Types

Common values for `metadata.tradition`:
- `tarot` - Traditional tarot (78 cards)
- `oracle` - Oracle decks (any count)
- `lenormand` - Lenormand system (36 or 52 cards)
- `playing-cards` - Standard playing cards (52 cards)
- `runes` - Runic systems (24, 25, 29, 33 cards)
- `i-ching` - I Ching hexagrams (64 cards)
- `ogham` - Celtic tree oracle (20-25 cards)
- `other` - Custom systems

## Card Structure

### Required Card Fields

```json
{
  "index": 0,                        // Zero-based position (0, 1, 2...)
  "name": "Card Name"                // Display name
}
```

### Optional Card Fields

```json
{
  "category": "Major",               // "Major", "Minor", "Oracle", etc.
  "suit": "Wands",                   // "Wands", "Hearts", null
  "rank": "Ace",                     // "Ace", "King", "7", null
  "value": 1,                        // Numeric value, null
  "imageUrl": "cards/00-fool.png"   // Path to card image
}
```

### Card Examples

**Tarot card:**
```json
{
  "index": 0,
  "name": "The Fool",
  "category": "Major",
  "suit": null,
  "rank": null,
  "value": 0,
  "imageUrl": "cards/00-fool.png"
}
```

**Oracle card:**
```json
{
  "index": 0,
  "name": "New Beginnings",
  "category": "Oracle",
  "imageUrl": "cards/new-beginnings.png"
}
```

**Rune:**
```json
{
  "index": 0,
  "name": "Fehu",
  "category": "Freyr's Aett",
  "value": null
}
```

**Playing card:**
```json
{
  "index": 0,
  "name": "Ace of Hearts",
  "category": "Minor",
  "suit": "Hearts",
  "rank": "Ace",
  "value": 1
}
```

## Image Support (Optional)

Images add visual richness to your readings but are completely optional.

### Card Images

Add an `imageUrl` field to each card:

```json
{
  "index": 0,
  "name": "The Fool",
  "imageUrl": "cards/00-fool.png"
}
```

**Path options:**
- **Relative to deck directory:** `"cards/00-fool.png"`
- **Vault path:** `"Assets/Tarot/RWS/00-fool.png"`
- **External URLs:** Not supported (Obsidian security policy)

### Deck Back Image

Add a `backImageUrl` field at the deck level:

```json
{
  "id": "my-deck",
  "backImageUrl": "back.png",
  "cards": [...]
}
```

### Using Images in Templates

The plugin auto-formats images as Obsidian wikilinks:

```handlebars
{{#each cards}}
**{{name}}** {{orientation}}
{{#if image}}
{{image}}
{{/if}}
{{/each}}

{{#if deck_back_image}}
**Deck Back:** {{deck_back_image}}
{{/if}}
```

Variables available:
- `{{card.image}}` - Auto-formatted as `![[path]]`
- `{{card.imageUrl}}` - Raw path
- `{{deck_back_image}}` - Auto-formatted deck back
- `{{deck_back_image_url}}` - Raw deck back path

## Validation Rules

The plugin validates decks before installation:

### Card Count
- `cardCount` field must match actual number of cards
- Minimum: 3 cards
- Maximum: 100 cards (practical limit)

### Card Indices
- Must start at 0
- Must be sequential (0, 1, 2, 3...)
- No gaps or duplicates
- Must be integers

### Card Names
- Duplicate names generate a warning (but allowed)
- Users can ignore warnings for intentional duplicates

### File Size
- Keep JSON files under 1MB for performance
- Large card databases can slow loading

## Best Practices

### Naming Conventions

**Deck ID:**
- Lowercase only
- Hyphens for spaces: `sacred-rebels-oracle`
- No special characters
- Unique across all decks

**Card Names:**
- Use title case: "The Fool", "New Beginnings"
- Keep under 50 characters
- Avoid special characters that might break templates

### Organization

**Small decks (< 50 cards):**
```
my-oracle/
  deck.json
  README.md
  back.png (optional)
  cards/ (optional)
    00-card.png
    01-card.png
```

**Large decks (50+ cards):**
```
tarot-deck/
  deck.json
  README.md
  back.png
  cards/
    major/
      00-fool.png
      01-magician.png
        minor/
      wands/
        ace-wands.png
      cups/
        ace-cups.png
```

### Metadata

Always include complete metadata:

```json
"metadata": {
  "author": "Your Name",
  "year": 2025,
  "publisher": "Self-Published",
  "tradition": "oracle",
  "source": "Original creation",
  "license": "Public Domain"
}
```

### Documentation

Each deck should include a `README.md` with:
- Brief history or background
- How to use the deck
- Recommended spreads
- Card meanings (optional)
- Attribution/credits

## Testing Your Deck

### 1. Validate JSON
Use a JSON validator like [jsonlint.com](https://jsonlint.com/)

### 2. Test in Obsidian
1. Settings → Tarot Practice → Deck Management
2. Click "Add deck"
3. Select your `deck.json`
4. Check for validation errors

### 3. Test Drawing
1. Run "Draw tarot spread"
2. Select your deck from dropdown
3. Draw cards and check output

### 4. Test Templates
Make sure card data appears correctly in:
- Daily draws
- Spread draws
- Custom templates

## Common Errors

### "Card count mismatch"
```
Error: cardCount is 44 but found 45 cards
```
**Fix:** Update `cardCount` or adjust cards array

### "Duplicate card index"
```
Error: Card index 5 appears multiple times
```
**Fix:** Ensure indices are sequential (0, 1, 2, 3...)

### "Invalid JSON"
```
Error: Unexpected token } in JSON
```
**Fix:** Check for missing commas, brackets, or quotes

### "File too large"
```
Warning: Deck file is 2.3MB, may impact performance
```
**Fix:** Remove unnecessary fields or split into multiple decks

## Example Decks

Study these for reference:
- [Elder Futhark](decks/elder-futhark/) - Simple rune system
- [Lenormand](decks/lenormand/) - Cards with suits and ranks
- [Playing Cards](decks/playing-cards/) - Standard deck
- [I Ching](decks/i-ching/) - Large philosophical deck

## Resources

- [JSON Format Documentation](https://www.json.org/)
- [Obsidian Image Formats](https://help.obsidian.md/Linking+notes+and+files/Embed+files#Supported+file+formats)
- [Tarot Practice Plugin Docs](https://github.com/w8s/obsidian-tarot-practice/blob/master/docs/TEMPLATE-VARIABLES.md)

## Need Help?

- [Open an issue](https://github.com/w8s/obsidian-tarot-decks/issues)
- [Plugin discussions](https://github.com/w8s/obsidian-tarot-practice/discussions)
- Check existing deck examples

---

*Happy deck creating!* ✨
