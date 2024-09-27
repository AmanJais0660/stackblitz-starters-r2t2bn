# Custom Timepicker Component

## Overview

The **Custom Timepicker Component** is a user-friendly and intuitive time selection tool designed for Angular applications. This component addresses several key usability issues found in existing timepicker solutions, specifically:

- Converting the AM/PM field into a dropdown menu for easier selection.
- Implementing keyboard navigation for enhanced accessibility.
- Preventing invalid time entries such as `14:90`.

This component is particularly relevant in light of [Issue #1644](https://github.com/ng-bootstrap/ng-bootstrap/issues/1644) from the ng-bootstrap GitHub repository, where users reported that the timepicker could remain in an invalid state. By utilizing this custom component, developers can provide a seamless experience for time selection without the risk of incorrect time formats.

## Features

### 1. AM/PM Dropdown

- **Ease of Use**: The AM/PM selection is simplified through a dropdown menu, allowing users to select their desired period with minimal effort.
- **Error Reduction**: This feature reduces the likelihood of user error associated with manual entry of AM/PM values.

### 2. Keyboard Navigation

- **Accessibility**: The component allows users to navigate through AM/PM options using the up/down arrow keys, enhancing usability for keyboard-focused users.
- **Intuitive Interaction**: This feature provides a more consistent and intuitive interaction model for users familiar with keyboard navigation.

### 3. Time Validation

- **Real-time Validation**: The timepicker actively prevents the selection of invalid times, such as `14:90`, by enforcing correct time formats.
- **Improved Data Integrity**: Ensures that the application receives valid time values, reducing the need for error handling and data cleansing post-submission.

### 4. Customizable Formats

- Users can select between 12-hour and 24-hour formats, making the timepicker adaptable to various regional preferences and application needs.

## Installation

To integrate the Custom Timepicker Component into your Angular project, follow these steps:

1. **Install the component via npm**:

   ```bash
   npm install custom-timepicker --save
   ```
