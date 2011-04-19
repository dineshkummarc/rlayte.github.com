# Javascript TDD

## Overview

Test-driven development is a methodology that enforces writing tests before writing the code that is being tested.

### Red, green, refactor

1. **Red**
Write a failing test, that correctly excercises the code under test

2. **Green**
Write the simplest solution to get the test passing

3. **Refactor**
Implement patterns, DRY, optimisation, etc.

4. **Repeat**

## Why is this a good approach

Hopefully I'll be able to explain some of the more advanced ideas as I go through this section.

### Testing is not the objective
+ Tests are a side benefit
+ TDD is a process for designing applications
+ Does not replace QA, does not remove all bugs.

### Refactoring
+ Test-suite essential to properly refactor code
+ Impossible to write code elegantly first time - refactoring often allow your code base to evolve over time without fear.

### Code smells
+ Examples (excessive comments, long functions, etc)
+ Bad code is hard to test
+ Test-first approach exposes issues before they become problems

### Duck-typing
+ Lack of compiler errors mitagated by full test coverage
+ Makes you consider objects rather than class hierarchies

### Emergent design
+ Requirements always change, designing upfront doesn't work
+ Write objects from the outside-in, producing more usable APIs
+ Mock objects as a way to 'discover' interfaces
+ Results in lean code

## Demo

A simple but real-world example. Shopping cart? Suggestions welcome on this.

## If I have time

+ Parallels with functional programming, especially mock objects being a hack to provide immutable state.
+ Importance of acceptance and integration test. How they are different from unit tests.
