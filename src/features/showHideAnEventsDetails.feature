Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default.
    Given a list of events is displayed
    And the details button is present on an event
    Then the event element is collapsed by default

  Scenario: User can expand an event to see details.
    Given a list of events is displayed
    When the user clicks on the "Show details" button of an event
    Then the event details are visible

  Scenario: User can collapse an event to hide details.
    Given a list of events is displayed
    When the user clicks on the "Hide details" button of the event
    Then the event details are hidden
