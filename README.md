CaloAI Taste Profile - Food Preference Intelligence Platform
============================================================

Executive Summary
-----------------

**CaloAI Taste Profile** is an intelligent mobile application that uses gesture-based food preference detection to build personalized taste profiles. The app employs a 4-directional swipe system (left, right, up, down) combined with machine learning-inspired analytics to generate comprehensive dietary insights, cuisine preferences, and lifestyle recommendations.

The platform bridges the gap between food selection and personalized nutrition planning by providing users with AI-powered taste analysis in real-time, enabling informed dietary decisions and meal planning optimization.

Development Acknowledgment
--------------------------

This project was developed with the assistance of **Artificial Intelligence (GitHub Copilot)** to accelerate development, optimize code quality, and implement complex features efficiently. The AI assistant was instrumental in:

*   **Architecture Design**: Helping structure the application with scalable component patterns
    
*   **Code Implementation**: Developing gesture recognition logic, data scoring algorithms, and UI components
    
*   **Problem Solving**: Debugging technical issues and optimizing performance bottlenecks
    
*   **Documentation**: Contributing to comprehensive code comments and technical specifications
    

The AI assistance enabled rapid prototyping and iteration while maintaining code quality and best practices. All core functionality, business logic, and strategic decisions were guided by human oversight to ensure alignment with project objectives and quality standards.

Business Problem
----------------

### Challenges Addressed:

1.  **Lack of Personalized Nutrition Insights**
    
    *   Users struggle to understand their actual food preferences and dietary patterns
        
    *   Generic diet recommendations don't align with individual taste profiles
        
    *   No intuitive way to explore and categorize food preferences
        
2.  **Meal Planning Complexity**
    
    *   Finding meals that match personal taste while maintaining nutrition goals is time-consuming
        
    *   Users need quick insights into their diet type and cuisine preferences
        
    *   Food discovery lacks personalization
        
3.  **User Engagement in Health Apps**
    
    *   Traditional survey-based preference collection is tedious and low-engagement
        
    *   Gamification and interactive UI increase user retention
        
    *   Need for immediate, actionable feedback from user input
        

### Solution Value Proposition:

*   **Intuitive Interaction**: Swipe-based food voting is natural and engaging
    
*   **Instant Insights**: Real-time taste profile generation with 4 preference levels
    
*   **Actionable Output**: Clear dietary recommendations and cuisine preferences
    
*   **Data-Driven**: AI-powered analysis converts simple preferences into comprehensive lifestyle insights
    

Methodology
-----------

### Architecture Overview
`   User Input (Swipe Screen)          ↓  Preference Collection (4 Directions)          ↓  Data Aggregation & Scoring          ↓  Taste Profile Building          ↓  Analytics & Insights Generation          ↓  Results Visualization   `

### Technical Approach:

#### 1. **Swipe Recognition System**

*   **4-Directional Gesture Detection**:
    
    *   **Right Swipe**: Like (Green - Positive Interest)
        
    *   **Left Swipe**: Dislike (Red - Negative Interest)
        
    *   **Up Swipe**: Super Like (Blue - Strong Preference)
        
    *   **Down Swipe**: Not Sure (Gray - Neutral/Uncertain)
        
*   **Real-time Visual Feedback**:
    
    *   Dynamic indicators appear above the card showing swipe intent
        
    *   Haptic feedback on button press for engagement
        
    *   Progress bar showing overall completion status
        

#### 2. **Data Scoring System**
`
scoreFood(food, weight):    - Super Like: weight = 3x    - Like: weight = 2x    - Not Sure: weight = 1x    - Dislike: weight = 0x (negative impact)   `

#### 3. **Taste Profile Construction**

The system builds three interconnected score matrices:

*   **Tag Scores**: Individual food attributes (protein, vegan, healthy, etc.)
    
*   **Category Scores**: Food categories (protein, carbs, vegetables, etc.)
    
*   **Cuisine Scores**: Global cuisines based on food-cuisine mapping
    

#### 4. **Insight Generation**

Uses rule-based analytics on aggregated scores:

*   **Diet Type Detection**: Vegan → Vegetarian → Protein Heavy → Omnivore
    
*   **Lifestyle Highlights**: Fruit Lover, Health Conscious, High Protein Diet, etc.
    
*   **Top Cuisines**: Ranked by weighted preference scores
    
*   **Key Highlights**: Combined carousel of diet + cuisines + categories
    

#### 5. **UI/UX Pattern**

`   Swipe Screen (Data Input)      ↓  Results Screen (Data Visualization)      ├── Key Highlights Carousel (Diet + Cuisines + Categories)      ├── Taste Highlights (Lifestyle Insights)      └── Food Categories Carousel (Detailed Preferences)   `

Skills & Technologies
---------------------

### Frontend Development

*   **React Native** - Cross-platform mobile UI
    
*   **Expo** - Development framework and tooling
    
*   **TypeScript** - Type-safe code structure
    
*   **Expo Router** - File-based routing and navigation
    

### Animation & Gesture Handling

*   **React Native Reanimated** - Smooth, performant animations
    
*   **React Native Gesture Handler** - Pan gesture detection and tracking
    
*   **Animated Values** - Real-time gesture position interpolation
    

### UI/UX Components

*   **Glass Morphism Design** - Expo Blur for modern, frosted glass effects
    
*   **Custom Gesture Indicators** - Real-time swipe direction visualization
    
*   **Progress Tracking** - Linear progress bars for user guidance
    
*   **Carousel Implementation** - Horizontal scrolling with pagination
    

### Data Management

*   **Utility Functions** - Modular scoring and analysis logic
    
*   **JSON Data Structure** - Foods and cuisines database
    
*   **Type Definitions** - Strict typing for data consistency
    

### Design Principles

*   **Dark Mode**: #0B0B0F background with high-contrast text
    
*   **Accent Color**: #22C55E (green) for primary actions
    
*   **Glass Effects**: Blur intensity 20-35 for depth and modern aesthetics
    
*   **Responsive Layout**: Dimensions-based sizing for all screen sizes
    

Results
-------

#### Implemented Features:

1.  **Swipe Screen**
    
    *   4-directional gesture recognition with threshold detection
        
    *   Dynamic swipe indicators (Yes/No badges, Superlike/Unsure pills)
        
    *   Real-time card rotation and scaling based on swipe angle
        
    *   Haptic feedback for button interactions
        
    *   Progress bar showing quiz completion
        
    *   50+ food items with categories and tags
        
2.  **Results Screen**
    
    *   Key Highlights horizontal carousel (Diet + Cuisines + Categories)
        
    *   Diet Style badge with AI-determined classification
        
    *   Top 3 Cuisines with emoji representations
        
    *   Food Category highlights with scores
        
    *   Taste Highlights section with lifestyle insights
        
    *   Food Categories carousel (Love, Super Likes, Not Sure, Dislike)
        
    *   Vertical list display for each category (no item sliding)
        
    *   Blue circle icons with white symbols for food items
        
    *   Even carousel scrolling without cutting off slides
        
3.  **Navigation & Flow**
    
    *   Index → Swipe → Results flow
        
    *   Retake Quiz button to restart
        
    *   Share functionality placeholder
        
    *   Proper parameter passing between screens
        
4.  **Design System**
    
    *   Glass morphism UI across all screens
        
    *   Consistent color scheme
        
    *   Responsive layouts for multiple screen sizes
        
    *   Dark theme optimization
        

#### Key Metrics:

*   **Foods Available**: 50+ items with tags and categories
    
*   **Cuisines Supported**: 10+ global cuisines
    
*   **Preference Levels**: 4 (Like, Dislike, Super Like, Not Sure)
    
*   **Insights Generated**: 5+ different analytical dimensions
    

How to Use
----------

### Prerequisites

`   Node.js (v14 or higher)  npm or yarn package manager  Expo CLI  iOS Simulator or Android Emulator (or physical device)   `

### Installation

1.  **Clone the Repository**
    

`   git clone https://github.com/manii5228/calorai-taste-profile.git  cd calorai-taste-profile   `

1.  **Install Dependencies**
    

`   npm install  # or  yarn install   `

1.  **Start the Development Server**
    

`   npx expo start -c   `

1.  **Run on Device/Emulator**
    

`   # For iOS  i  # For Android  a  # For Web  w   `

### User Flow Guide

#### Step 1: Welcome Screen (Index)

*   View the app introduction
    
*   See the "Design Your Food Plan" message
    
*   Green start button to begin the quiz
    

#### Step 2: Swipe Screen

1.  **Read the Food Name** - Centered on the card
    
2.  **Swipe in Your Preferred Direction**:
    
    *   **Swipe Right** → "Yes" / Like (Green)
        
    *   **Swipe Left** → "No" / Dislike (Red)
        
    *   **Swipe Up** → "Superlike" ⭐ (Blue)
        
    *   **Swipe Down** → "Unsure" (Gray)
        
3.  **Watch the Progress Bar** - Track quiz completion
    
4.  **Visual Feedback** - See swipe indicators appear above the card
    
5.  **Repeat** - Continue through all food items
    

#### Step 3: Results Screen

1.  **Key Highlights Carousel** - Scroll to see:
    
    *   Your Diet Style (green badge)
        
    *   Top Cuisines you prefer
        
    *   Top Food Categories
        
2.  **Taste Highlights** - Read AI-generated insights about your preferences
    
3.  **Food Categories** - Scroll through different preference categories:
    
    *   ♥ Foods You Love
        
    *   ⭐ Super Likes
        
    *   ? Not Sure
        
    *   😒 Foods You Hate
        
4.  **Action Buttons**:
    
    *   **Retake Quiz** - Start over with a fresh assessment
        
    *   **Share** - Share your taste profile
        



🏗️ Project Structure
---------------------

`   calorai-taste-profile/  ├── app/  │   ├── _layout.tsx          # Root layout  │   ├── index.tsx            # Welcome screen  │   ├── swipe.tsx            # Swipe interaction screen  │   └── results.tsx          # Results & insights screen  ├── components/  │   ├── GlassCard.tsx        # Glass morphism card  │   ├── GlassView.tsx        # Alternative glass container  │   ├── ItemCarousel.tsx     # Food items carousel  │   ├── ProgressBar.tsx      # Progress indicator  │   ├── SwipeActions.tsx     # Action buttons  │   ├── SwipeCard.tsx        # Food card display  │   └── SwipeIndicator.tsx   # Swipe direction badges  ├── constants/  │   ├── foods.ts             # Foods & cuisines export  │   ├── foods.json           # Food data (50+ items)  │   └── theme.ts             # Design tokens  ├── utils/  │   ├── tasteProfiler.ts     # Profile building logic  │   └── insigths.ts          # Analytics & insights  └── package.json   `

🔗 Technologies Used
--------------------

*   **React Native** - Cross-platform mobile development
    
*   **Expo** - Development & deployment platform
    
*   **TypeScript** - Type safety
    
*   **React Native Reanimated** - Smooth animations
    
*   **React Native Gesture Handler** - Gesture recognition
    
*   **Expo Router** - Navigation
    
*   **Expo Blur** - Glass morphism effects
    
*   **Expo Haptics** - Haptic feedback
