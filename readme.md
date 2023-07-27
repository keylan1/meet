# Meet App

## Feature 1: Filter Events by City

### User Story

As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

### BDD Scenarios

#### Scenario 1: Show upcoming events from all cities when no specific city is searched

Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events.

#### Scenario 2: Show list of cities as suggestions while typing in the city textbox

Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed.

#### Scenario 3: Select a city from the suggested list and display upcoming events for that city

Given the user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

## Feature 2: Show/Hide Event Details

### User Story

As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

### BDD Scenarios

#### Scenario 1: User can click on an event to see details

Given: A list of events is displayed
When: The user clicks on the ‘show details’ button for info
Then: The element expands to show more info on the event

#### Scenario 2: User can click on an event to hide details

Given: An element’s details are expanded
When: The user clicks on the ‘hide details’ button
Then: The element hides the event info again

## Feature 3: Specify Number of Events

### User Story

As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

### BDD Scenario

#### Scenario 1: User can adjust the number of events displayed at one time

Given: A list of events is displayed with a counter
When: The user clicks on the display events option button and chooses from the available options
Then: The number of events increases or decreases

## Feature 4: Use the App When Offline

### User Story

As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

### BDD Scenarios

#### Scenario 1: View previously viewed events when offline

Given: The user had a list of events displayed while online
When: The user opens the app when offline
Then: The events that were viewed when the user was online will be displayed

#### Scenario 2: Attempt to view details of a previously viewed event while offline

Given: A list of events is displayed in the app (user is offline)
When: The user clicks on the info button for a previously viewed event
Then: The event's information is displayed

#### Scenario 3: Attempt to view details of a new event while offline

Given: A list of events is displayed in the app (user is offline)
When: The user clicks on the info button for a new event
Then: The app alerts the user that they cannot view or interact with new events that were not previously viewed

## Feature 5: Add an App Shortcut to the Home Screen

### User Story

As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

### BDD Scenario

#### Scenario: Add app shortcut to home screen

Given: The user has installed the app on their device
When: The user accesses the device's settings for shortcuts
Then: A shortcut is created on the home screen.

## Feature 6: Display Charts Visualizing Event Details

### User Story

As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

### BDD Scenarios

#### Scenario 1: View chart of upcoming events in each city

Given: The user has opened the app
When: The user navigates to the "Chart" section of the app
Then: The app should display an interactive chart or graph showing upcoming events categorized by cities

#### Scenario 2: View events by city in chart/graph

Given: The chart of events by city is open
When: The user clicks on a city
Then: The chart redirects to display the events in the selected city
