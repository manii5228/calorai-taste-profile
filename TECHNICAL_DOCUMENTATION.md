# CaloAI Taste Profile - Complete Technical Documentation

## 🎯 Project Overview

**CaloAI Taste Profile** is a React Native mobile application that collects user food preferences through gesture-based interactions (swiping) and generates personalized taste profiles with AI-powered insights.

### Core Flow:
```
Index Screen (Welcome)
    ↓ [Start Button]
Swipe Screen (Data Collection)
    ↓ [User Swipes through Foods]
Results Screen (Data Analysis)
    ↓ [View Insights & Take Actions]
```

---

## 📁 File Structure & Detailed Explanation

### Root Configuration Files

#### `package.json`
- **Purpose**: Project dependencies and scripts management
- **Key Dependencies**:
  - `react-native`: Core mobile framework
  - `expo`: Development and deployment platform
  - `expo-router`: File-based routing
  - `react-native-reanimated`: Smooth animations
  - `react-native-gesture-handler`: Gesture detection
  - `expo-blur`: Glass morphism effects
  - `expo-haptics`: Haptic feedback

#### `app.json`
- **Purpose**: Expo app configuration
- **Contains**:
  - App name and slug
  - Platform specifications
  - Icon and splash screen settings
  - Plugin configurations

#### `tsconfig.json`
- **Purpose**: TypeScript compiler options
- **Enables**:
  - Type checking
  - Module path aliases (@/ paths)
  - Strict type safety

#### `babel.config.js`
- **Purpose**: JavaScript transpilation configuration
- **Handles**: React Native specific babel plugins

---

## 🎨 Component Architecture

### 1. **GlassCard.tsx** - Glass Morphism Container
```
Purpose: Reusable glass-effect wrapper for content sections

Props:
  - title: string (optional) - Card header text
  - children: React.ReactNode - Content inside the card
  - intensity: number (optional, default: 20) - Blur intensity

Key Functions:
  - render(): Renders BlurView with children content

Related Topics:
  - Glass Morphism Design Pattern
  - Backdrop Blur Effect
  - Material Design
  - Elevation and Depth
  
Implementation:
  ├── BlurView (from expo-blur)
  │   ├── intensity={22}
  │   ├── tint="dark"
  │   └── children (custom content)
  └── StyleSheet
      ├── borderRadius: 20
      ├── backgroundColor: rgba(255,255,255,0.1)
      ├── borderWidth: 1
      └── borderColor: rgba(255,255,255,0.2)
```

### 2. **GlassView.tsx** - Alternative Glass Container
```
Purpose: Alternative glass container with customizable props

Props:
  - children: React.ReactNode
  - intensity: number (default: 20)
  - radius: number (default: 16)

Key Functions:
  - render(): Similar to GlassCard but without title

Related Topics:
  - Component Composition
  - Props Pattern
  - Reusability
```

### 3. **SwipeCard.tsx** - Food Item Display
```
Purpose: Individual food card shown during swipe interaction

Props:
  - name: string - Food name
  - image: string - Image URL

Layout:
  ├── Top Section
  │   ├── Food Name (Text)
  │   └── Category Badge
  ├── Middle Section
  │   ├── Food Image (240px height)
  │   └── Rounded corners with overflow hidden
  └── Bottom Section
      └── Nutritional info (optional)

Styling:
  - Width: Full device width
  - Height: 340px
  - Shadow effects (iOS)
  - Glass morphism background

Related Topics:
  - Image Loading & Caching
  - Responsive Design
  - Shadow/Elevation
```

### 4. **SwipeActions.tsx** - Action Buttons
```
Purpose: Four action buttons at bottom of swipe screen

Buttons Layout:
  [Dislike ✕] [Not Sure ?] [Super Like ★] [Like ♥]
   Red ️#EF4444   Gray #6B7280    Blue #3B82F6   Green #22C55E

Props:
  - onLike: () => void - Called when Like button pressed
  - onDislike: () => void - Called when Dislike button pressed
  - onSuperLike: () => void - Called when Super Like button pressed
  - onNotSure: () => void - Called when Not Sure button pressed

Key Functions:
  ├── handleDislikePressß() {
  │   ├── Haptics.impactAsync(Light)
  │   └── onDislike()
  ├── handleNotSurePressß() {
  │   ├── Haptics.impactAsync(Light)
  │   └── onNotSure()
  ├── handleSuperLikePressß() {
  │   ├── Haptics.impactAsync(Medium)
  │   └── onSuperLike()
  └── handleLikePressß() {
      ├── Haptics.impactAsync(Medium)
      └── onLike()

Related Topics:
  - Haptic Feedback
  - Button States
  - Event Handling
  - UX Feedback
```

### 5. **ProgressBar.tsx** - Progress Indicator
```
Purpose: Visual progress indicator showing quiz completion

Props:
  - progress: number (0 to 1) - Completion percentage

Implementation:
  ├── Container: Full width bar
  ├── Animated width based on progress
  ├── Color: #22C55E (Green) when active
  └── Height: 4px

Key Functions:
  - render(): Draws animated progress bar
  - calculateWidth(): progress * 100%

Related Topics:
  - Linear Progress Indicator
  - Animation
  - Visual Feedback
  - Progress Tracking
```

### 6. **SwipeIndicator.tsx** - Swipe Direction Badges
```
Purpose: Show visual indicators for swipe direction intent

Display Conditions:
  - Right Swipe → "Yes" (Green Circle #22C55E)
  - Left Swipe → "No" (Red Circle #EF4444)
  - Up Swipe → "Superlike ⭐" (Blue Pill #3B82F6)
  - Down Swipe → "Unsure" (Gray Pill #6B7280)

Props:
  - direction: 'left' | 'right' | 'up' | 'down' | 'none'

Layout:
  ├── Left/Right Indicators
  │   ├── Position: Absolute on sides
  │   ├── Size: 80x80 circle
  │   ├── Style: Filled colored circle
  │   └── Text: Centered in circle
  └── Up/Down Indicators
      ├── Position: Top/Bottom center
      ├── Size: Pill shape (120x40)
      ├── Style: Rounded badge
      └── Text: Centered with icon

Related Topics:
  - Visual Feedback
  - Gesture Intent Indication
  - User Guidance
  - Directional Cues
```

### 7. **ItemCarousel.tsx** - Food Items List
```
Purpose: Display food items in a category as vertical list

Props:
  - title: string - Category title (e.g., "Foods You Love")
  - emoji: string - Category emoji (♥, ⭐, ?, 😒)
  - items: Array<{id, name}> - Food items to display
  - iconType: 'heart' | 'checkmark' | 'cross' - Icon style

Key Functions:
  ├── getIcon(): string {
  │   - Returns icon symbol based on iconType
  │   - 'heart' → '♥'
  │   - 'checkmark' → '✓'
  │   - 'cross' → '✕'
  │   }
  │
  └── render(): ReactNode {
      ├── Header: Category title with emoji
      ├── List Container: Vertical scrollable list
      └── List Items: Each food item with icon + name
      }

Item Structure:
  ├── Icon Circle
  │   ├── Background: #3B82F6 (Blue)
  │   ├── Width/Height: 32px
  │   ├── Icon Color: #FFFFFF (White)
  │   └── Icon Size: 16px
  └── Text Label
      ├── Font Size: 15px
      ├── Color: #E5E7EB (Light Gray)
      └── Font Weight: 500

Related Topics:
  - List Rendering
  - Icon Systems
  - Category Grouping
  - Visual Hierarchy
```

---

## 📱 Screen Components

### 1. **index.tsx** - Welcome/Onboarding Screen
```
Purpose: App entry point and introduction screen

Layout Structure:
  ├── Logo Badge (Top Right)
  │   ├── Position: Absolute
  │   ├── Green circle (#22C55E)
  │   └── Size: 50x50
  │
  ├── Main Title
  │   ├── Text: "Design Your Food Plan"
  │   ├── Size: 32px
  │   └── Color: #FFFFFF
  │
  ├── Glass Card Container
  │   ├── Title: "Your Taste Profile"
  │   ├── Description: Intro text
  │   └── CTA Button
  │
  └── Start Button
      ├── Text: "Let's Start"
      ├── Background: #22C55E
      ├── Action: Navigate to /swipe
      └── Press Feedback: Haptics

Key Functions:
  ├── handleStartPress() {
  │   ├── Trigger haptic feedback
  │   ├── router.push('/swipe')
  │   └── Navigate to swipe screen
  │   }
  │
  └── render(): JSX {
      ├── View container
      ├── Logo badge
      ├── Title text
      ├── Glass card with content
      └── Start button
      }

Related Topics:
  - Entry Point
  - Onboarding UX
  - Screen Navigation
  - Visual Hierarchy
  - Call-to-Action Design
```

### 2. **swipe.tsx** - Food Swiping Screen
```
Purpose: Core interaction screen for collecting user preferences

DATA MANAGEMENT:
  ├── State Variables:
  │   ├── index: number - Current food item index
  │   ├── likes: number[] - IDs of liked foods
  │   ├── dislikes: number[] - IDs of disliked foods
  │   ├── superLike: number[] - IDs of super-liked foods
  │   ├── notSure: number[] - IDs of unsure foods
  │   └── finished: boolean - Quiz completion status
  │
  ├── Animated Values:
  │   ├── translateX: Animated.Value - Horizontal position
  │   ├── translateY: Animated.Value - Vertical position
  │   └── swipeDirection: 'left'|'right'|'up'|'down'|'none'
  │
  └── Constants:
      ├── SWIPE_THRESHOLD: width * 0.25 (25% of screen)
      ├── SWIPE_VERTICAL_THRESHOLD: height * 0.25
      └── width, height: Device dimensions

KEY ALGORITHMS:

1. GESTURE DETECTION:
  ├── Pan Gesture Handler:
  │   ├── onUpdate(e): {
  │   │   ├── translateX.value = e.translationX
  │   │   ├── translateY.value = e.translationY
  │   │   ├── Determine direction based on translation
  │   │   │   ├── absX > absY → Horizontal swipe
  │   │   │   │   ├── e.translationX > 50 → 'right'
  │   │   │   │   └── e.translationX < -50 → 'left'
  │   │   │   └── absY > absX → Vertical swipe
  │   │   │       ├── e.translationY > 50 → 'down'
  │   │   │       └── e.translationY < -50 → 'up'
  │   │   └── Update swipeDirection.value
  │   │   }
  │   │
  │   └── onEnd(): {
  │       ├── swipeDirection.value = 'none'
  │       ├── Check if translation > THRESHOLD
  │       │   ├── translateX > THRESHOLD → swipeRight()
  │       │   ├── translateX < -THRESHOLD → swipeLeft()
  │       │   ├── translateY > THRESHOLD → swipeDown()
  │       │   └── translateY < -THRESHOLD → swipeUp()
  │       └── Else → Reset to center (spring animation)
  │       }

2. SWIPE DIRECTION HANDLERS:

  swipeRight(): {
    ├── Animate card to right (translateX = -width)
    ├── Call onSwipeComplete('right')
    └── Add current food ID to likes array
    }

  swipeLeft(): {
    ├── Animate card to left (translateX = width)
    ├── Call onSwipeComplete('left')
    └── Add current food ID to dislikes array
    }

  swipeUp(): {
    ├── Animate card up (translateY = -height)
    ├── Call onSwipeComplete('up')
    └── Add current food ID to superLike array
    }

  swipeDown(): {
    ├── Animate card down (translateY = height)
    ├── Call onSwipeComplete('down')
    └── Add current food ID to notSure array
    }

3. COMPLETION HANDLER:

  onSwipeComplete(direction): {
    ├── Get current food item
    ├── Create new preference arrays
    │   ├── newLikes = direction === 'right' ? [...likes, food.id] : likes
    │   ├── newDislikes = direction === 'left' ? [...dislikes, food.id] : dislikes
    │   ├── newSuperLike = direction === 'up' ? [...superLike, food.id] : superLike
    │   └── newNotSure = direction === 'down' ? [...notSure, food.id] : notSure
    ├── Update state with new arrays
    ├── Reset animations: translateX = 0, translateY = 0
    ├── If index === foods.length - 1:
    │   ├── setFinished(true)
    │   └── handleFinish(newLikes, newDislikes, newSuperLike, newNotSure)
    │       └── router.replace('/results', params)
    └── Else:
        └── setIndex(prev => prev + 1) // Next food
    }

ANIMATION SYSTEM:

  animatedStyle = useAnimatedStyle(() => {
    ├── Calculate rotation based on X translation:
    │   └── rotate = interpolate(
    │       translateX.value,
    │       [-width/2, 0, width/2],
    │       [-15deg, 0deg, 15deg]
    │   )
    │
    └── Return transform: {
        ├── translateX: translateX.value
        ├── translateY: translateY.value
        └── rotateZ: rotate + 'deg'
        }
    })

LAYOUT STRUCTURE:
  ├── Container (flex: 1, dark background)
  ├── Logo Badge (top right)
  ├── Main Title
  ├── Progress Bar
  ├── Card Wrapper (center, flex-based)
  │   ├── SwipeIndicator (direction badges)
  │   └── Animated Card
  │       ├── GestureDetector (wraps gestures)
  │       └── SwipeCard (food display)
  └── SwipeActions (buttons at bottom)

Related Topics:
  - Gesture Recognition
  - State Management
  - Animation Interpolation
  - Spring Physics
  - Event Handling
  - Navigation & Routing
  - Array Mutation Patterns
```

### 3. **results.tsx** - Results & Insights Screen
```
Purpose: Display analysis of user preferences and generate insights

DATA PROCESSING:

1. INPUT PARSING:
  const { likes, dislikes, notSure, superLike } = useLocalSearchParams()
  ├── Parse JSON strings to arrays
  └── Create preference arrays: likedIds[], dislikedIds[], etc.

2. FOOD FILTERING:
  ├── likedFoods = foods.filter(f => likedIds.includes(f.id))
  ├── dislikedFoods = foods.filter(f => dislikedIds.includes(f.id))
  ├── notSureFoods = foods.filter(f => notSureIds.includes(f.id))
  └── superLikeFoods = foods.filter(f => superLikeIds.includes(f.id))

3. TASTE PROFILE BUILDING:
  const profile = buildTasteProfile(
    foods,
    likedIds,
    superLikeIds,
    notSureIds,
    cuisines
  )
  
  Returns: {
    tagScores: Record<string, number>,    // Weight of each tag
    categoryScores: Record<string, number>, // Weight of each category
    cuisineScores: Record<string, number>   // Weight of each cuisine
  }

4. INSIGHTS GENERATION:
  ├── dietType = getDietType(profile.tagScores)
  │   ├── Logic:
  │   │   ├── If tagScores['vegan'] > 5 → 'Vegan'
  │   │   ├── If tagScores['vegetable'] > 6 → 'Vegetarian'
  │   │   ├── If tagScores['protein'] > 6 → 'Protein Heavy'
  │   │   └── Else → 'Omnivore'
  │   └── Purpose: Classify diet type
  │
  ├── highlights = getLifestyleHighlights(profile.tagScores)
  │   ├── Logic: Array of insights based on tagScores
  │   │   ├── If tagScores['fruit'] > 4 → Add 'Fruit Lover'
  │   │   ├── If tagScores['indulgent'] > 5 → Add 'Fast Food Lover'
  │   │   ├── If tagScores['healthy'] > 5 → Add 'Health Conscious'
  │   │   ├── If tagScores['protein'] > 6 → Add 'High Protein Diet'
  │   │   └── If tagScores['fat'] > 4 → Add 'Fat Friendly'
  │   └── Purpose: Generate lifestyle insights
  │
  ├── topCuisineNames = getTopCuisines(profile.cuisineScores)
  │   ├── Logic:
  │   │   ├── Sort cuisines by score (descending)
  │   │   ├── Take top 3
  │   │   └── Return cuisine names
  │   └── Purpose: Get top 3 cuisines
  │
  ├── topCuisines = cuisines.filter(c => topCuisineNames.includes(c.name))
  │   └── Purpose: Get full cuisine objects
  │
  └── topCategories = getTopCategories()
      ├── Build categoryMap from liked foods
      ├── Sort categories by count
      ├── Return top 5 with emojis
      └── Purpose: Get top food categories

5. CAROUSEL STATE TRACKING:
  const [activeCategory, setActiveCategory] = useState(0)
  └── Tracks which category carousel slide is visible

LAYOUT SECTIONS:

1. HEADER:
  ├── Logo badge (top right)
  └── Title: "Your Taste Profile"

2. KEY HIGHLIGHTS CAROUSEL:
  ├── Horizontal ScrollView
  ├── First Item: Diet Style Badge
  │   ├── Green badge (#22C55E)
  │   ├── Text: dietType
  │   └── Label: "Diet Style"
  ├── Cuisine Items: (for each topCuisine)
  │   ├── Emoji: cuisine.emoji
  │   └── Label: cuisine.name
  └── Category Items: (for each topCategory)
      ├── Emoji: category.emoji
      └── Label: category.name

3. TASTE HIGHLIGHTS SECTION:
  ├── GlassCard title: "Taste Highlights"
  ├── For each highlight:
  │   ├── Bullet point (•)
  │   └── Highlight text
  └── Example: "Fruit Lover", "Health Conscious"

4. FOOD CATEGORIES CAROUSEL:
  ├── Title: "Foods You Love"
  ├── Horizontal ScrollView (page scrolling)
  ├── 4 Slides:
  │   ├── ♥ Foods You Love (liked foods)
  │   ├── ⭐ Super Likes (super-liked foods)
  │   ├── ? Not Sure (unsure foods)
  │   └── 😒 Foods You Hate (disliked foods)
  └── Each slide:
      ├── ItemCarousel component
      ├── Vertical list of foods
      └── Blue circle icons with white symbols

5. PAGINATION DOTS:
  ├── Center below carousel
  ├── One dot per category
  ├── Active dot: Green (#22C55E)
  └── Inactive dot: Gray (rgba(255,255,255,0.3))

6. FOOTER BUTTONS:
  ├── "Retake Quiz" Button
  │   ├── Green background
  │   ├── Action: router.push('/swipe')
  │   └── Restarts the quiz
  └── "Share" Button
      ├── Green border, transparent background
      └── Placeholder for future implementation

Related Topics:
  - Data Aggregation
  - Scoring Algorithms
  - Analysis & Insights
  - Data Visualization
  - Carousel Implementation
  - Screen Navigation
  - Pagination
```

---

## 🛠️ Utility Functions

### **tasteProfiler.ts** - Profile Building Logic

```typescript
function buildTasteProfile(
  foods: Food[],
  likedIds: number[],
  superLikeIds: number[],
  notSureIds: number[],
  cuisines: Cuisine[]
): TasteProfile

PURPOSE: Score all foods based on preferences and aggregate results

ALGORITHM:

1. Initialize Score Objects:
  const cuisineScores: Record<string, number> = {}
  const tagScores: Record<string, number> = {}
  const categoryScores: Record<string, number> = {}

2. Helper Function - scoreFood():
  scoreFood(food, weight): {
    ├── Add to category score:
    │   └── categoryScores[food.category] += weight
    │
    ├── For each tag in food.tags:
    │   └── tagScores[tag] += weight
    │
    └── For each cuisine:
        ├── Check if food name or tags match cuisine
        └── If match:
            └── cuisineScores[cuisine.name] += weight
    }

3. Score Foods Based on Preference:
  foods.forEach(food => {
    ├── If superLikeIds.includes(food.id):
    │   └── scoreFood(food, 3)  // Weight: 3x
    ├── Else if likedIds.includes(food.id):
    │   └── scoreFood(food, 2)  // Weight: 2x
    ├── Else if notSureIds.includes(food.id):
    │   └── scoreFood(food, 1)  // Weight: 1x
    └── Else (disliked):
        └── Don't score (weight: 0)
    })

4. Return Profile Object:
  return {
    tagScores,
    categoryScores,
    cuisineScores
  }

RELATED TOPICS:
  - Weighted Scoring
  - Data Aggregation
  - Object/Array Processing
  - Scoring Algorithms
  - Machine Learning Concepts
```

### **insigths.ts** - Analytics Functions

```typescript
function getDietType(tagScores): string

PURPOSE: Classify diet type based on tag scores

ALGORITHM:
  ├── If tagScores['vegan'] > 5 → 'Vegan'
  ├── If tagScores['vegetable'] > 6 → 'Vegetarian'
  ├── If tagScores['protein'] > 6 → 'Protein Heavy'
  └── Else → 'Omnivore'

LOGIC EXPLANATION:
  - Higher thresholds for specificity
  - Vegan most restrictive (checked first)
  - Falls back to Omnivore (most common)

---

function getLifestyleHighlights(tagScores): string[]

PURPOSE: Generate lifestyle insights from food preferences

ALGORITHM:
  const highlights: string[] = []
  
  ├── if (tagScores['fruit'] > 4)
  │   └── highlights.push('Fruit Lover')
  ├── if (tagScores['indulgent'] > 5)
  │   └── highlights.push('Fast Food Lover')
  ├── if (tagScores['healthy'] > 5)
  │   └── highlights.push('Health Conscious')
  ├── if (tagScores['protein'] > 6)
  │   └── highlights.push('High Protein Diet')
  ├── if (tagScores['fat'] > 4)
  │   └── highlights.push('Fat Friendly')
  │
  └── if (highlights.length === 0)
      └── highlights.push('Balanced Eater')
  
  return highlights

LOGIC EXPLANATION:
  - Multiple insights can be true simultaneously
  - Each checks independent scoring condition
  - Fallback to 'Balanced Eater' if no specifics match
  - More intuitive than single classification

---

function getTopCuisines(cuisineScores): string[]

PURPOSE: Rank and return top 3 cuisines

ALGORITHM:
  return Object.entries(cuisineScores)
    .sort((a, b) => b[1] - a[1])    // Sort descending by score
    .slice(0, 3)                     // Take top 3
    .map(([name]) => name)           // Extract names only

LOGIC EXPLANATION:
  - entries(): Convert {name: score} to [[name, score], ...]
  - sort(): Descending order (highest scores first)
  - slice(): Limit to top 3
  - map(): Extract cuisine names only

RELATED TOPICS:
  - Array Methods
  - Object Destructuring
  - Sorting Algorithms
  - Data Extraction
```

---

## 📊 Data Structures

### Foods Data (foods.json)
```typescript
type Food = {
  id: number                    // Unique identifier
  name: string                  // Food name (e.g., "Grilled Salmon")
  image: string                 // Image URL
  category: string              // Category (protein, carb, vegetable, etc.)
  tags: string[]                // Attributes (protein, fish, omega-3, etc.)
}

// Example:
{
  "id": 1,
  "name": "Grilled Salmon",
  "image": "https://...",
  "category": "protein",
  "tags": ["protein", "fish", "omega-3"]
}
```

### Cuisines Data (foods.json)
```typescript
type Cuisine = {
  id: number                    // Unique identifier
  name: string                  // Cuisine name (e.g., "Italian")
  emoji: string                 // Emoji representation
  description: string           // Keywords for matching
}

// Example:
{
  "id": 1,
  "name": "Italian",
  "emoji": "🍝",
  "description": "pasta, risotto, pizza"
}
```

### Taste Profile
```typescript
type TasteProfile = {
  tagScores: Record<string, number>         // {tag: weight}
  categoryScores: Record<string, number>    // {category: weight}
  cuisineScores: Record<string, number>     // {cuisine: weight}
}

// Example:
{
  "tagScores": {
    "protein": 15,
    "healthy": 10,
    "fish": 8
  },
  "categoryScores": {
    "protein": 15,
    "vegetable": 10
  },
  "cuisineScores": {
    "Mediterranean": 12,
    "Asian": 8
  }
}
```

---

## 🔄 Data Flow Diagram

```
User Opens App (index.tsx)
    ↓
[Display Welcome Screen]
    ↓
User Taps "Start" Button
    ↓
Navigate to Swipe Screen (swipe.tsx)
    ↓
[Load Foods List from Constants]
    ↓
[Display First Food Item]
    ↓
User Swipes in Direction
    ├─ Right: Add to likes
    ├─ Left: Add to dislikes
    ├─ Up: Add to superLike
    └─ Down: Add to notSure
    ↓
[Animate Card Out]
    ↓
Load Next Food Item
    ↓
Repeat Until All Foods Reviewed
    ↓
Trigger Navigation to Results
    ├─ Pass preference arrays via route params
    └─ JSON.stringify() for transmission
    ↓
Results Screen (results.tsx)
    ├─ Parse preference arrays from params
    ├─ Filter foods into categories
    ├─ Call buildTasteProfile()
    │   └─ Aggregate scores
    ├─ Call getDietType(), getLifestyleHighlights(), getTopCuisines()
    │   └─ Generate insights
    └─ Render insights & food lists
    ↓
User Interacts with Results
    ├─ Scroll through highlights carousel
    ├─ View food categories
    ├─ Tap "Retake Quiz" (restart)
    └─ Tap "Share" (placeholder)
```

---

## 🎯 Key Concepts & Related Topics

### 1. **Gesture Recognition & Animation**
- **Pan Gesture**: 2D tracking of finger movement
- **Thresholds**: Minimum distance for action recognition
- **Interpolation**: Smooth value transitions between ranges
- **Spring Physics**: Realistic bounce animation
- **Animated Values**: Non-blocking performance-optimized updates

### 2. **State Management**
- **React Hooks**: useState for local component state
- **useLocalSearchParams**: Extract data from navigation
- **Shared Values**: Cross-component animation state
- **Array Mutation**: Immutable patterns with spread operator

### 3. **Data Scoring & Analytics**
- **Weighted Scoring**: Different impact levels for preferences
- **Aggregation**: Combining multiple scores
- **Classification**: Rule-based categorization
- **Ranking**: Sorting by relevance/score

### 4. **UI/UX Patterns**
- **Glass Morphism**: Frosted glass effect design
- **Haptic Feedback**: Tactile response to interactions
- **Visual Indicators**: Direction feedback during swipe
- **Progressive Disclosure**: Revealing results gradually
- **Carousel Pattern**: Horizontal swipeable content

### 5. **Navigation & Routing**
- **File-Based Routing**: Expo Router auto-routing
- **Route Parameters**: Passing data between screens
- **JSON Serialization**: Converting arrays to/from strings
- **Navigation Stack**: Managing screen history

### 6. **Performance Optimization**
- **React Native Reanimated**: GPU-accelerated animations
- **Gesture Handler**: Native gesture recognition
- **Memoization**: Avoiding unnecessary re-renders
- **Efficient Filtering**: Array operations

---

## 🚀 Function Call Hierarchy

```
App Start
└── index.tsx (Welcome Screen)
    └── [User presses Start]
        └── router.push('/swipe')
            └── swipe.tsx (Swipe Screen)
                ├── useState() x5 (preference arrays)
                ├── useSharedValue() x3 (animations)
                ├── Gesture.Pan() [createGestureHandler]
                │   ├── onUpdate() [track finger position]
                │   │   └── Determine swipeDirection
                │   └── onEnd() [process swipe]
                │       ├── swipeLeft/Right/Up/Down()
                │       │   └── onSwipeComplete()
                │       │       ├── Add to preference array
                │       │       ├── Advance to next food
                │       │       └── [if last food] handleFinish()
                │       │           └── router.replace('/results', params)
                │       └── Reset animations
                ├── useAnimatedStyle() [calculate rotation]
                └── Render components
                    ├── ProgressBar (progress/foods.length)
                    ├── SwipeIndicator (swipeDirection)
                    ├── SwipeCard (foods[index])
                    └── SwipeActions (button handlers)
                
                └── results.tsx (Results Screen)
                    ├── useLocalSearchParams() [extract data]
                    ├── Parse JSON arrays
                    ├── Filter foods into categories
                    │   ├── foods.filter(f => likedIds.includes(f.id))
                    │   ├── foods.filter(f => superLikeIds.includes(f.id))
                    │   ├── foods.filter(f => notSureIds.includes(f.id))
                    │   └── foods.filter(f => dislikeIds.includes(f.id))
                    ├── buildTasteProfile(foods, likedIds, superLikeIds, notSureIds, cuisines)
                    │   ├── Initialize score objects
                    │   ├── For each food: scoreFood(food, weight)
                    │   │   ├── categoryScores[category] += weight
                    │   │   ├── For each tag: tagScores[tag] += weight
                    │   │   └── For each cuisine: cuisineScores[cuisine] += weight
                    │   └── Return profile
                    ├── getDietType(profile.tagScores)
                    │   └── Check conditions → return diet string
                    ├── getLifestyleHighlights(profile.tagScores)
                    │   └── Build array of insights
                    ├── getTopCuisines(profile.cuisineScores)
                    │   └── Sort, slice top 3
                    ├── getTopCategories() [internal]
                    │   └── Build category rankings
                    ├── useState(activeCategory) [carousel tracking]
                    └── Render components
                        ├── Key Highlights Carousel
                        │   ├── Diet badge
                        │   ├── Cuisine items
                        │   └── Category items
                        ├── Taste Highlights section
                        │   └── Display insight bullets
                        ├── Food Categories Carousel
                        │   ├── ScrollView with page snapping
                        │   ├── ItemCarousel components
                        │   │   └── Render food list
                        │   └── Pagination dots
                        └── Footer buttons
                            ├── Retake Quiz → router.push('/swipe')
                            └── Share [placeholder]
```

---

## 🔧 Important Algorithms Explained

### Algorithm 1: Gesture Detection
```typescript
// Determine if swipe is horizontal or vertical
const absX = Math.abs(translationX)
const absY = Math.abs(translationY)

if (absX > absY) {
  // Horizontal swipe detected
  if (translationX > THRESHOLD) direction = 'right'
  else direction = 'left'
} else {
  // Vertical swipe detected
  if (translationY > THRESHOLD) direction = 'down'
  else direction = 'up'
}

// Advantage: Simple, responsive, avoids diagonal confusion
```

### Algorithm 2: Weighted Scoring
```typescript
// Different preference levels have different impacts
const weight = {
  'superLike': 3,      // Strongest preference
  'like': 2,           // Moderate preference
  'notSure': 1,        // Weak signal
  'dislike': 0         // No impact
}

// Multiply each food's contribution by its weight
scoreFood(food, weight) {
  food.tags.forEach(tag => {
    tagScores[tag] += weight
  })
  categoryScores[food.category] += weight
}

// Result: Super likes influence results 3x more than neutral
```

### Algorithm 3: Diet Classification
```typescript
// Hierarchical classification with thresholds
if (tagScores['vegan'] > 5) return 'Vegan'
else if (tagScores['vegetable'] > 6) return 'Vegetarian'
else if (tagScores['protein'] > 6) return 'Protein Heavy'
else return 'Omnivore'

// Logic:
// - Most restrictive checked first (vegan)
// - Lower threshold for Omnivore (default)
// - Protein Heavy distinguishes meat-heavy but not vegan
```

### Algorithm 4: Top Items Ranking
```typescript
// Convert to entries, sort, slice, extract
const topItems = Object.entries(scores)
  .sort((a, b) => b[1] - a[1])  // b[1] - a[1] = descending
  .slice(0, 3)                   // First 3 items
  .map(([name]) => name)         // Extract names only

// Example:
// Input: {a: 5, b: 8, c: 3, d: 10}
// Output: ['d', 'b', 'a']
```

---

## 📝 Summary Table

| Component | Purpose | Key Props | Related Concepts |
|-----------|---------|-----------|------------------|
| GlassCard | Glass effect container | title, children, intensity | Glass Morphism |
| SwipeCard | Food display | name, image | Image Loading |
| SwipeActions | Action buttons | onLike, onDislike, etc | Haptics |
| ProgressBar | Progress indicator | progress | Animations |
| SwipeIndicator | Swipe feedback | direction | Visual Feedback |
| ItemCarousel | Food list | title, items, iconType | List Rendering |
| index.tsx | Welcome screen | - | Navigation |
| swipe.tsx | Swipe interaction | - | Gestures, State |
| results.tsx | Analysis display | - | Analytics, UI |

---

## 🎓 Learning Resources

### Topics to Study:
1. **React Native Gesture Handler** - Pan gesture API
2. **React Native Reanimated** - Animation framework
3. **Expo Routing** - File-based navigation
4. **TypeScript** - Type definitions
5. **Array Methods** - filter, map, reduce, sort
6. **Algorithm Design** - Scoring, ranking, classification

---

**Document Version**: 1.0
**Last Updated**: January 25, 2026
**Status**: Complete Technical Reference
