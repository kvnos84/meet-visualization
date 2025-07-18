Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user hasn’t specified a number of events
    When the user opens the app
    Then the user should see 32 events by default

  Scenario: User can change the number of events displayed
    Given the user wants to see a specific number of events
    When the user sets the number to 10
    Then the user should see 10 events displayed
