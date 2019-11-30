# Cubos Movie Search

Aplicação de busca de filmes a partir da API do TMDB.

A busca de filmes pode ser feita tanto por nome quanto por gênero. Devido as regras da API, foram feitos campos específicos para cada tipo de busca, mas seguindo o estilo solicitado.

Quanto à paginação, a API já disponibiliza uma lógica de paginação pronta, então utilizei ela para mostrar os resultados e paginar os dados.

O layout foi alterado em alguns momentos para suprir os requisitos, portanto resolvi implementar alguns designs por conta própria para telas menores visando deixar a aplicação responsiva.

Quanto ao consumo da API, requisições, etc, foi utilizado Redux e Axios para gerenciar ações e requests.

## Scripts disponíveis

Na raiz do projeto você pode executar:

### `yarn start`

Executa a aplicação em modo de desenvolvimento.<br />

### `yarn test`

Executa os testes, se houver.

### `yarn build`

Executa uma build de produção da aplicação.
