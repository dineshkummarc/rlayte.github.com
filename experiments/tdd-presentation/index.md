# Javascript TDD

## Overview

1. Definition
Test-driven development is a methodology that enforces writing tests before writing the code that is being tested.

2. Red, green, refactor

3. Red
Write a failing test, that correctly excercises the code under test

4. Green
Write the simplest solution to get the test passing

5. Refactor
Implement patterns, DRY, optimisation, etc.

6. Repeat

## Why is this a good approach

0. Testing is not the objective
+ Tests are a side benefit
+ TDD is a process for designing applications
+ Does not replace QA, does not remove all bugs.

1. Refactoring
+ Test-suite essential to properly refactor code
+ Impossible to write code elegantly first time - refactoring often allow your code base to evolve over time without fear.

2. Code smells
+ Examples (excessive comments, long functions, etc)
+ Bad code is hard to test
+ Test-first approach exposes issues before they become problems

3. Duck-typing
+ Lack of compiler errors mitagated by full test coverage
+ Makes you consider objects rather than class hierarchies

4. Emergent design
+ Requirements always change, designing upfront doesn't work
+ Mock objects as a way to 'discover' interfaces
+ Results in lean code

## Demo

A simple but real-world example. Shopping cart? Suggestions welcome on this.

## If I have time

1. Parallels with functional programming, especially mock objects being a hack to provide immutable state.

2. Importance of acceptance and integration test. How they are different from unit tests.
