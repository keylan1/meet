Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default.
    Given the user opens the event page
    Then the event element is collapsed by default

  Scenario: User can expand an event to see details.
    Given the user opens the event page
    When the user clicks on the "Show details" button of an event
    Then the event details are visible

  Scenario: User can collapse an event to hide details.
    Given the user opens the event page
    And an event is expanded with visible details
    When the user clicks on the "Hide details" button of the event
    Then the event details are hidden
