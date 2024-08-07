# Gestão de gastos

Desenvolvedores:

**Guilherme Cunha, guilhermegomescunha@hotmail.com**

_**Resumo**. Essa aplicação é um teste interno da empresa Kukac. Consiste num frontend e backend para fazer um controle de gastos financeiros. Para entregar a solução foram utilizados a seguintes tecnlogias:

# Tecnologias

## Backend

+ [NestJS](https://nestjs.com/)
+ [TypeORM](https://typeorm.io/)
+ [MongoDB](https://www.mongodb.com/)
+ [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

## Porque das escolhas

O Nest foi escolhido porque é uma maneira rápida e fácil de gerar uma aplicação que atendesse os requisitos(O crud). Dentro do Nest eu fiz algumas implementações personalizadas como o Logger e o serviço de Excessões. Essa escolha foi tendo em vista se eu precisar alterar algo eu tenho o domínio, caso minhas regras de negócio venham a pedir, mas como o projeto foi bem simples, tanto o Logger quanto as Excessões, ficaram apenas uma abstração simples de soluções já prontas. 


<ul>Dividi o projeto em 3 grandes pastas, sendo elas:
	<li>domain;</li>
	<li>infrastructure;</li>
	<li>usecases</li>
</ul>

Essa divisão eu achei adequada pra o projeto por separar bem as responsabilidades e mescla o que acabei vendo em alguns projetos nos últimos anos aqui na empresa. O domain deixando as interfaces e modelos para serem usados, infrastructure fazendo as configurações/conexões do projeto e o use cases eu deixei para agrupar todo o fluxo dos endpoints, ele que configura, formata, manda/pega dados pro banco(repositório) e gerencia tudo isso. Com essa divisão é necessária um use case para cada rota.

O TypeORM, sinceramente, eu escolhi porque nunca tinha mexido com ele, então acabou sendo um 'desafio' e um aprendizado. Achei que ele integra bem com o Nest e foi de fácil manuseio, o que foi um pouco mais chato foi a parte de configuração do Mongo.

O MongoDB eu escolhi por ser um banco NoSQL de fácil manuseio e que tem a disponibildade do Atlas, um banco na cloud gratuito, o que me economizou tempo numa instância manual de banco e um banco que pode ser usado ao fim da entrega dessa tarefa. 

## Frontend

+ [NextJS](https://nextjs.org/)
+ [Tailwind](https://tailwindcss.com/)

Escolhi o Next porque tinha lido e escutado algumas coisas boas sobre ele, porém foi minha primeira integração usando o mesmo. Eu senti que o Next é bem poderoso e pode gerar muitos benefícios para o usuário final e pro time de desenvolvimento, apenas achei que não seria o ideal para projetos pequenos, mas num geral foi uma experiência tranquila.

O Tailwind eu escolhi por ser a forma mais fácil e rápida das opções fornecidas, também foi minha primeira vez utilizando e achei MUITO fácil e intuitivo de se usar. Eu utilizei um site pra ficar personalizando o projeto, senti que foi mais fácil do que se jogasse no projeto e fosse ficar modificando depois. A plataforma é essa: 
+ [TailwindPlayground](https://play.tailwindcss.com/)

## Aprendizados e considerações

Acho que, num geral, o projeto ficou bom. É um escopo bem simples, mas que tem muita coisa para o desenvolvedor poder trabalhar e pensar. Fiquei bastante satisfeito com a entrega da parte do Backend, como citado acima preferi fazer algumas implementações na mão do que trazer dependências ao projeto, um outro exemplo é o middleware router.logger ao invés de utilizar o Morgan que normalmente uso. Com esse padrão de abstração eu consigo fazer que as partes do meu projeto funcionem como eu queira e evita várias depedências externas.

## Roadmap de melhorias

Para futuras melhorias eu olharia para o front, ver se tem algo a ser otimizado/corrigido, principalmente na organização estrutural e configuração/uso do tailwind. No backend eu faria um sistema de cache, caso tivesse um grande número de usuários, iria optar igual usamos no AWSA Phoenix(Redis e Cache aside).

## Considerações finais

Como visto no frontend, a UI segui um estilo/padronização do jogo Persona. Para fazer essa personalização utilizei os seguintes links:
+ [Paleta de Cores](https://www.color-hex.com/color-palette/1019867)
+ [*CSS do botão](https://codepen.io/kevinquach/pen/JNGmKG?editors=1111)
+ [Gerador de imagem](https://www.fontbolt.com/font/persona-5-font/)

*PS: Não fiz nenhuma alteração no CSS do botão, apenas coloquei o HTML e componentizei para reutilizar o botão com maior facilidade, fazendo somente as mudanças necessárias para essa componentização funcionar 