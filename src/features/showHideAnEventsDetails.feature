Feature: Show/Hide Event Details

  Scenario: Event details are collapsed by default
    Given the user sees a list of events
    Then each event element should not show its details by default

  Scenario: User can expand an event to see its details
    Given the user sees a list of events
    When the user clicks on “Show Details”
    Then the event element should expand to show details

  Scenario: User can collapse an event to hide its details
    Given the event details are visible
    When the user clicks on “Hide Details”
    Then the event details should be hidden
