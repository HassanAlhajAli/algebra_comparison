import { evaluateExpression, parseExpression, renderExpression } from './src/algebra/base';

// Test basic arithmetic
console.log("\n=== Test 1: Basic Addition ===");
const test1 = parseExpression("2 + 3");
const result1 = evaluateExpression(test1);
console.log("Input: 2 + 3");
console.log("Result:", renderExpression(result1));
console.log("Expected: 5");

console.log("\n=== Test 2: Subtraction with negative result ===");
const test2 = parseExpression("3 - 5");
const result2 = evaluateExpression(test2);
console.log("Input: 3 - 5");
console.log("Result:", renderExpression(result2));
console.log("Expected: -2 or (-2)");

console.log("\n=== Test 3: Multiplication ===");
const test3 = parseExpression("4 * 5");
const result3 = evaluateExpression(test3);
console.log("Input: 4 * 5");
console.log("Result:", renderExpression(result3));
console.log("Expected: 20");

console.log("\n=== Test 4: Division that divides evenly ===");
const test4 = parseExpression("10 / 2");
const result4 = evaluateExpression(test4);
console.log("Input: 10 / 2");
console.log("Result:", renderExpression(result4));
console.log("Expected: 5");

console.log("\n=== Test 5: Division that doesn't divide evenly ===");
const test5 = parseExpression("10 / 3");
const result5 = evaluateExpression(test5);
console.log("Input: 10 / 3");
console.log("Result:", renderExpression(result5));
console.log("Expected: (10 / 3) - should not simplify");

console.log("\n=== Test 6: Complex expression ===");
const test6 = parseExpression("2 + 3 * 4");
const result6 = evaluateExpression(test6);
console.log("Input: 2 + 3 * 4");
console.log("Result:", renderExpression(result6));
console.log("Expected: 14");

console.log("\n=== Test 7: Expression with variable ===");
const test7 = parseExpression("x + 5");
const result7 = evaluateExpression(test7);
console.log("Input: x + 5");
console.log("Result:", renderExpression(result7));
console.log("Expected: (x + 5) - should not simplify");

console.log("\n=== Test 8: Negation ===");
const test8 = parseExpression("-5");
const result8 = evaluateExpression(test8);
console.log("Input: -5");
console.log("Result:", renderExpression(result8));
console.log("Expected: (-5)");

console.log("\n=== Test 9: Double negation ===");
const test9 = parseExpression("--5");
const result9 = evaluateExpression(test9);
console.log("Input: --5");
console.log("Result:", renderExpression(result9));
console.log("Expected: 5");

console.log("\n=== Test 10: Mixed operations ===");
const test10 = parseExpression("10 + 2 * 5");
const result10 = evaluateExpression(test10);
console.log("Input: 10 + 2 * 5");
console.log("Result:", renderExpression(result10));
console.log("Expected: 20");

console.log("\n=== Test 11: Division by zero ===");
const test11 = parseExpression("10 / 0");
const result11 = evaluateExpression(test11);
console.log("Input: 10 / 0");
console.log("Result:", renderExpression(result11));
console.log("Expected: (10 / 0) - should not simplify");

console.log("\n=== Test 12: Negative division ===");
const test12 = parseExpression("-10 / 2");
const result12 = evaluateExpression(test12);
console.log("Input: -10 / 2");
console.log("Result:", renderExpression(result12));
console.log("Expected: (-5)");
