package com.example.Variables01;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * A basic unit test class demonstrating JUnit 5 features.
 */
class Variables4Test {

    @Test
    void aSimpleAssertion() {
        // A basic test to ensure true is true.
        assertTrue(true, "This assertion should always pass.");
    }

    @Test
    void additionShouldWork() {
        // A simple test to verify a calculation.
        int result = 2 + 2;
        assertEquals(4, result, "The sum of 2 and 2 should be 4.");
    }
}
