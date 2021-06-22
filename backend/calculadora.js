'use strict'
var params = process.argv.slice(2);
var plantilla = `
    La suma es: ${Number(params[0])+Number(params[1])}
    La resta es:  ${params[0]-params[1]}
    La multiplicacion es:  ${params[0]*params[1]}
    La división es:  ${params[0]/params[1]}
`;
console.log(plantilla);

