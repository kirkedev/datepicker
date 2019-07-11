Feature: React DatePicker
  Scenario: Go to previous month
    Given a datepicker for June 2019
    When I click the previous button
    Then I see dates for May 2019
    And the header updates to May 2019

  Scenario: Go to next month
    Given a datepicker for June 2019
    When I click the next button
    Then I see dates for July 2019
    And the header updates to July 2019

  Scenario: Select a date
    Given a datepicker for June 2019
    When I select June 6
    Then June 6 is highlighted
    And the submit button is enabled
    When I click the submit button
    Then June 6 is chosen
