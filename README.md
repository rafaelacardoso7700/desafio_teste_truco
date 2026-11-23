
**Rafaela Tanaka Cardoso 24062611-2**

**Vitor Hugo da Costa 23234248-2**

# Truco Paulista - Casos de Teste

## Concepção do Desafio

O desafio consiste na criação de casos de teste para o jogo de Truco Paulista, utilizando JavaScript e o framework Jest.
A ideia é testar as principais regras do jogo e verificar se tudo funciona como esperado, desde a distribuição das cartas até a definição da dupla vencedora.

Os testes foram elaborados considerando uma partida tradicional de Truco Paulista, com quatro jogadores divididos em duas duplas.

## Funcionamento dos Casos de Teste

Foram criados 18 casos de teste para verificar diferentes situações que podem acontecer durante uma partida.

Os testes estão divididos entre as seguintes funcionalidades:

- **Baralho:** verifica se o baralho possui 40 cartas, sem cartas que não fazem parte do jogo e sem duplicações.
- **Distribuição:** verifica se cada jogador recebe três cartas.
- **Comparação de cartas:** verifica qual carta é mais forte durante uma rodada.
- **Manilhas:** verifica se as manilhas são identificadas corretamente e se a comparação entre elas funciona.
- **Pontuação:** verifica o valor inicial da mão e os aumentos de pontos.
- **Pedidos de truco:** verifica os pedidos de truco, seis, nove e doze, além da possibilidade de recusar.
- **Resultado das rodadas:** verifica qual dupla venceu e como são tratados os empates.
- **Finalização:** verifica a soma dos pontos e o encerramento da partida quando uma dupla chega a 12 pontos.

### Como executar os testes

Primeiro, é necessário instalar as dependências do projeto:

```bash
npm install
```

Caso o Jest ainda não esteja instalado, utilize:

```bash
npm install --save-dev jest
```

Depois, para executar os testes, basta utilizar:

```bash
npm test
```

O Jest irá executar os casos de teste e mostrar quais passaram e quais apresentaram algum erro.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Jest

## Objetivo

O objetivo dos testes é verificar se as principais regras do Truco Paulista estão funcionando corretamente, ajudando a identificar possíveis erros e garantindo que o jogo siga as regras esperadas.
