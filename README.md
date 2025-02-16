# Timer App

## Overview

The Timer App is a React Native application that allows users to create, start, pause, reset, and delete multiple timers. Timers can be categorized, and users can control all timers within a category simultaneously. Completed timers trigger a modal notification and are stored in history.

## Features

- Create multiple timers with a name, duration, and category.
- Start, pause, and reset individual timers.
- Start, pause, and reset all timers in a specific category.
- Timers run in real-time and decrement every second.
- Completed timers trigger a congratulatory modal.
- Timers are stored persistently using AsyncStorage.
- Grouping of timers by category for better organization.

## Tech Stack

- **React Native**: UI development.
- **AsyncStorage**: Local storage for timers.
- **react-native-modalize**: Bottom sheet modal for adding new timers.
- **Context API**: Theme management.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- React Native CLI
- Android Studio / Xcode (for emulators or real devices)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/timer-app.git
   ```
2. Navigate into the project directory:
   ```sh
   cd timer-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the application:
   - For Android:
     ```sh
     npx react-native run-android
     ```
   - For iOS:
     ```sh
     npx react-native run-ios
     ```

## Usage

- Tap **ADD TIMER** to create a new timer.
- Enter the **Name, Duration, and Category**, then tap **ADD TIMER**.
- Start, pause, reset, or delete a timer using the buttons provided.
- Control all timers in a category with **START ALL, PAUSE ALL, and RESET ALL** buttons.
- A modal appears when a timer completes.

## Project Structure

```
├── src
│   ├── components    # Reusable UI components (Progress, Header, Divider)
│   ├── screens       # Main screens (HomeScreen, HistoryScreen)
│   ├── theme        # Theme Context for dark/light mode
│   ├── constants     # App-wide constants
│   ├── styles        # Styling files
│   ├── utils         # Helper functions
│   ├── App.js        # Main App entry point
│   └── index.js      # React Native entry point
```

## Future Enhancements

- Background timer execution when the app is closed.
- Push notifications for completed timers.
- More customization options for timers (e.g., sound alerts, different time formats).

## Contributing

Feel free to submit issues or pull requests to improve the project!

## License

This project is licensed under the MIT License.
