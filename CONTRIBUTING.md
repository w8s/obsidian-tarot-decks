# Contributing to Obsidian Tarot Decks

Thank you for your interest in contributing divination decks! This repository welcomes community submissions of public domain and original divination systems.

## 🎯 What We Accept

### Eligible Decks
- ✅ Public domain divination systems (published before 1929 in US)
- ✅ Original creations you own all rights to
- ✅ Historical systems with proper attribution
- ✅ Well-documented cultural practices

### Not Accepted
- ❌ Copyrighted commercial decks
- ❌ Decks you don't have rights to distribute
- ❌ Incomplete or untested decks
- ❌ Decks without proper documentation

## 📋 Submission Requirements

### Must Have
1. **Complete deck.json** following the [format guide](CREATING-DECKS.md)
2. **README.md** in deck folder with:
   - Deck history and background
   - How to use it
   - Attribution/sources
   - License information
3. **Validation** - deck must load without errors
4. **Documentation** - clear instructions for users

### Should Have
- Example spreads or reading techniques
- Card meanings or interpretations
- Cultural context and respectful representation
- Images (optional but encouraged)

### Nice to Have
- Multiple language support
- Historical references
- Usage examples
- Community testimonials

## 🚀 How to Contribute

### Step 1: Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR-USERNAME/obsidian-tarot-decks.git
cd obsidian-tarot-decks
```

### Step 2: Create Deck Folder
```bash
mkdir -p decks/your-deck-name
cd decks/your-deck-name
```

### Step 3: Add Your Files
```
your-deck-name/
  deck.json          # Required
  README.md          # Required
  back.png           # Optional
  cards/             # Optional
    00-card.png
    01-card.png
```

### Step 4: Test Your Deck
1. Install in Obsidian via Settings → Tarot Practice → Deck Management
2. Try drawing cards in various spreads
3. Verify all fields display correctly
4. Check for validation errors

### Step 5: Document Your Deck

Create a `README.md` in your deck folder:

```markdown
# Your Deck Name

Brief description of the deck and its purpose.

## History

Background and origin of this divination system.

## How to Use

Instructions for readings and interpretations.

## Card Meanings

(Optional) Brief meanings for each card or symbol.

## Attribution

Sources, references, and credits.

## License

Public domain statement or your licensing terms.
```

### Step 6: Create Pull Request
```bash
git add decks/your-deck-name/
git commit -m "Add [Your Deck Name] divination deck"
git push origin main
```

Then open a Pull Request on GitHub with:
- **Title:** "Add [Your Deck Name]"
- **Description:** Brief overview of the deck and its tradition

## ✅ Review Checklist

Before submitting, ensure:

- [ ] Deck loads without errors in Obsidian
- [ ] All card indices are sequential (0, 1, 2...)
- [ ] `cardCount` matches actual number of cards
- [ ] JSON is valid (use [jsonlint.com](https://jsonlint.com))
- [ ] README.md is complete and informative
- [ ] Deck is public domain or you own all rights
- [ ] Attribution and sources are properly cited
- [ ] Cultural elements are represented respectfully
- [ ] No copyrighted material included
- [ ] Tested in at least one spread

## 🔍 What We Review

### Technical Quality
- JSON structure and validation
- Card indexing and naming
- File organization
- Performance impact

### Content Quality
- Deck completeness
- Documentation clarity
- Cultural accuracy
- Historical accuracy (if applicable)

### Legal Compliance
- Copyright clearance
- Public domain verification
- Proper attribution
- License compatibility

## 🎨 Image Guidelines

If including images:

### File Formats
- PNG (preferred for transparency)
- JPG (for photographs)
- WebP (modern format)
- SVG (for symbols/icons)

### File Sizes
- Card images: < 500KB each
- Deck back: < 200KB
- Total deck size: < 50MB

### Image Quality
- Minimum: 300x500px
- Recommended: 600x1000px
- Maximum: 1200x2000px
- Clear, readable text
- Professional appearance

### Copyright
- Only original artwork
- Public domain images
- Properly licensed content
- Clear attribution

## 🌍 Cultural Sensitivity

When contributing decks based on cultural traditions:

### Do's
- ✅ Research thoroughly
- ✅ Cite authentic sources
- ✅ Represent respectfully
- ✅ Include cultural context
- ✅ Acknowledge origins

### Don'ts
- ❌ Appropriate closed practices
- ❌ Misrepresent sacred symbols
- ❌ Use without permission
- ❌ Commercialize sacred traditions
- ❌ Remove cultural context

## 📝 Code of Conduct

### Be Respectful
- Respect cultural traditions
- Be kind to reviewers and contributors
- Provide constructive feedback
- Acknowledge others' work

### Be Honest
- Disclose your relationship to the deck
- Cite sources accurately
- Don't claim others' work
- Be transparent about modifications

### Be Patient
- Reviews may take time
- Revisions might be requested
- Discussion is part of the process
- Community input is valuable

## 🚫 Rejection Criteria

PRs may be rejected if:

- Deck contains copyrighted material
- Insufficient documentation
- Cultural appropriation concerns
- Technical errors or validation failures
- Incomplete or untested deck
- Unresponsive to review feedback

## 💡 Tips for Success

1. **Start small** - Test with a simple deck first
2. **Study examples** - Look at existing decks
3. **Test thoroughly** - Try multiple spreads
4. **Document well** - Clear instructions help users
5. **Engage community** - Discuss in Issues/Discussions first
6. **Be patient** - Quality reviews take time

## 🆘 Need Help?

- **Questions?** [Open an issue](https://github.com/w8s/obsidian-tarot-decks/issues)
- **Ideas?** [Start a discussion](https://github.com/w8s/obsidian-tarot-decks/discussions)
- **Stuck?** Check [CREATING-DECKS.md](CREATING-DECKS.md)
- **Plugin issues?** [Plugin repository](https://github.com/w8s/obsidian-tarot-practice)

## 📜 License Agreement

By contributing, you agree that:

1. You have the right to submit the deck
2. Your contribution will be available under public domain (or compatible license)
3. You grant permission for redistribution
4. You waive claims of copyright (if applicable)

---

**Thank you for contributing to the community!** ✨
