# Conversor de moedas

# Explicações

* Meu objetivo inicial era fazer um conversor simples de moeda que convertesse entre pelo menos 4 moedas.
No entanto eu quis ir além e desenvolvi um conversor com a funcionalidade de converter qualquer moeda,
obtendo as taxas de cada moeda na api 'https://api.exchangeratesapi.io/latest?base=USD'.

* No metodo create presente no arquivo controllers/ConvertController.ts eu criei uma função chamada
multiplyValuesCurrency(origin, rate) que recebe como primeiro parâmetro o valor de origem a ser convertido e
como segundo parâmetro o valor da taxa da moeda destino, tendo como base de taxas a moeda de origem e por fim
retornando a multiplicação dos valores. 
Em seguida atribuí a constante conversion o link da api usando BackTick(ou template string como também é 
conhecido) para que o valor da base de taxa seja o mesmo do valor de origem e por fim extraio a data
referente as taxas atribuindo-a a constante date.

* A constante targetValue que recebe a chamada da função multiplyValuesCurrency(source_currency, rate[target_currency]),
logo após faz-se a inserção dos valores no banco de dados.

## A Stack utilizada

* NodeJS com Typescript; 
* O banco de dados utilizado foi o SQLite - Uso migrations para minhas tabelas no DB;
* O QueryBuilder Knex.js
* A Lib de acesso a API usada foi o Axios, pois acho uma ferramenta muito simples de usar;
* E o Micro Framework Express para tratamento de rotas;
