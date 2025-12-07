import { evaluateExpression, parseExpression, renderExpression, areExpressionsEquivalent } from './src/algebra/base';

const input1 = "x + -5";
console.log(`\nInput: ${input1}`);
const parsed1 = parseExpression(input1);
console.log("Parsed:", renderExpression(parsed1));

const input2 = "10 + (2 * 5)";
console.log(`\nInput: ${input2}`);
const parsed2 = parseExpression(input2);
const result2 = evaluateExpression(parsed2);
console.log("Result:", renderExpression(result2));

const eqA = "2 * (x + 1)";
const eqB = "2 * x + 2";
console.log(`\nChecking: ${eqA} == ${eqB}`);
const isSame1 = areExpressionsEquivalent(parseExpression(eqA), parseExpression(eqB));
console.log("Equivalent:", isSame1);