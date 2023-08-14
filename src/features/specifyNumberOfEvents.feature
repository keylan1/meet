Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given the user opens the event page
    Then 32 events are displayed

  Scenario: User can change the number of events displayed.
    Given the user opens the event page
    When the user selects a different number of events to display
    Then the page displays the specified number of events
