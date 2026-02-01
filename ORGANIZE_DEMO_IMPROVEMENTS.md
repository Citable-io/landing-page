# Organize Demo - Improvements & Workflow

## Overview
The Organize demo has been redesigned to work like an **animated video walkthrough** that tells the story of how users interact with the organize/bibliography feature.

## New Workflow Sequence

The demo now flows through these 9 steps (~19.5 seconds total):

### 1. **Empty State** (1.5s)
- Shows a clean, empty library
- Prompts user with "No papers yet"
- Highlights "Import Papers" button to start

### 2. **Import Action** (1s)
- Import button becomes highlighted with green glow
- User sees the button is ready to be clicked

### 3. **PDF Drop** (2.5s)
- Three PDF icons animate down (like dropping files)
- Shows the import process in action
- Visual feedback of files being added

### 4. **Metadata Extraction** (3s)
- Reference table rows fade in one by one
- Shows papers appearing with:
  - **Title**: Paper name
  - **Authors**: Extracted from PDF metadata
  - **Year**: Publication year
  - **Venue**: Journal/conference name
  - **Tags**: Auto-generated tags
- Demonstrates automatic metadata extraction capability

### 5. **Organizing** (2s)
- Sidebar collections animate with a pulse effect
- Paper counts appear on collections (1, 2, 0)
- Shows papers being automatically organized into categories:
  - Transformers (1 paper)
  - Natural Language (2 papers)
  - To Read (0 papers)

### 6. **Paper Select** (1.5s)
- First paper row becomes highlighted/selected
- Selected row shows blue background
- Demonstrates single-paper selection

### 7. **Detail View** (2s)
- Selected paper remains highlighted
- Shows how users can interact with individual papers
- Ready to view full metadata/annotations

### 8. **Filtering** (2s)
- Search box becomes highlighted with ring effect
- Shows the search/filter capability
- Demonstrates discovery of papers by search

### 9. **Organized** (1.5s)
- Final state showing fully organized library
- All papers visible in table
- Collections populated with counts
- Library ready to use
- **Loops back to step 1** to repeat the workflow

## Visual Improvements

### Colors
- **Primary Actions**: Green (#1FD068) - matches Citable brand
- **Highlights**: Ring effects and glow animations
- **Table**: Dark theme with good contrast for readability
- **Collections**: Show paper counts in green badges

### Animations
- **Fade in**: Smooth row appearance during metadata extraction
- **Pulse**: Organizing collections during automation
- **Ring**: Search box highlights during filtering step
- **Scale**: Import button highlights with scale-up effect

### Information Displayed

**Reference Table Columns:**
- Title (primary, always visible)
- Authors (hidden on mobile, shown on sm+)
- Year (always visible)
- Venue (hidden on tablet, shown on md+)
- Tags (hidden on mobile, shown on lg+)

**Collections Sidebar:**
- Folder icon + collection name
- Paper count badge (green)
- Selected state highlighting
- Pulsing animation during organizing

## Key Features Demonstrated

1. ✅ **Import Process**: Visual representation of adding papers
2. ✅ **Auto-Extraction**: Metadata automatically extracted from PDFs
3. ✅ **Auto-Organization**: Papers organized into smart collections
4. ✅ **Selection**: Click to select and view paper details
5. ✅ **Search/Filter**: Powerful search capabilities
6. ✅ **Organization**: Hierarchical collection structure

## User Experience
- **Duration**: ~19.5 seconds per cycle
- **Responsive**: Adapts to all screen sizes
- **Accessible**: Text labels and clear visual hierarchy
- **Engaging**: Smooth animations tell the story of the workflow
- **Looping**: Continuously demonstrates the feature for visitors

## Next Steps

To further enhance the demo, consider:
1. **Detail Pane**: Add right sidebar showing selected paper details
2. **Annotations**: Show PDF highlights/annotations from a paper
3. **Search Results**: Animate filtering results
4. **Collections**: Show drag-drop to organize papers
5. **Export**: Show how to export organized bibliography
