# Sorteio de Times com Cores Aleatórias

## Descrição
Este projeto permite o sorteio de times de jogadores utilizando cores aleatórias. O usuário pode configurar o número de jogadores e o número de times a serem formados. As cores dos times são sorteadas com base nas cores fornecidas pelo usuário, e o sorteio é realizado de forma interativa, com feedback visual e notificações.

## Funcionalidades

### 1. **Configuração do Número de Jogadores e Times**
   - O usuário insere o número de jogadores e o número de times no formulário.
   - A quantidade de times é calculada automaticamente com base na quantidade de jogadores e o número de jogadores por time.
   - O número de times é exibido na interface e salvo no `localStorage`.

### 2. **Seleção de Cores**
   - O usuário pode selecionar a cor de cada time utilizando inputs de cor (color picker).
   - Cada cor selecionada é salva no `localStorage`, garantindo que as preferências do usuário sejam persistidas entre sessões.
   - Se houver mais de três cores, o sorteio será realizado para escolher as cores de forma aleatória, garantindo que os times sejam formados com cores distintas.

### 3. **Sorteio dos Times**
   - Quando o usuário clica no botão para realizar o sorteio, a aplicação escolhe aleatoriamente uma cor e atribui um jogador a um time dessa cor.
   - O sorteio é realizado até que o número de jogadores para cada time seja atingido.
   - Durante o sorteio, a cor do time sorteado é exibida em uma caixa colorida.
   - Uma notificação é mostrada ao usuário quando todos os jogadores forem sorteados, indicando que o sorteio foi finalizado.

### 4. **Feedback Visual e Notificações**
   - Ao realizar o sorteio, uma animação é acionada para dar feedback visual ao usuário.
   - O navegador também pode vibrar (se suportado) para indicar que o sorteio está ocorrendo.
   - Um modal é exibido com a cor do time sorteado, permitindo que o usuário veja qual time foi sorteado para cada jogador.

### 5. **Limpeza e Reinício**
   - O usuário pode reiniciar o sorteio ou limpar todos os dados armazenados (localStorage), caso deseje reconfigurar o sorteio.
   - O botão de reset permite que o usuário limpe todas as informações salvas e recarregue a página.

## Como Rodar o Projeto

1. Clone ou faça o download do repositório.
2. Abra o arquivo `index.html` em um navegador moderno (recomendado usar Chrome ou Firefox).
3. Preencha os campos com o número de jogadores e de times.
4. Clique no botão "Sortear Times" para realizar o sorteio.

## Dependências
Este projeto não depende de bibliotecas externas, sendo construído exclusivamente com HTML, CSS e JavaScript.

## Contribuições
Se você deseja contribuir para este projeto, sinta-se à vontade para realizar um **fork** e submeter um **pull request**.

## Licença
Este projeto está licenciado sob a Licença MIT.

## Exemplos de Uso

1. **Configuração Inicial:**
   - Defina o número de jogadores (ex: 10) e o número de times (ex: 5). O sistema calculará automaticamente a quantidade de jogadores por time.
   - O número de times será exibido na interface.

2. **Seleção de Cores:**
   - O usuário pode selecionar as cores dos times utilizando os "color pickers" disponíveis.

3. **Sorteio dos Times:**
   - Ao clicar em "Sortear Times", os jogadores serão atribuídos aleatoriamente a cada time, e a cor do time será exibida ao lado do nome do jogador.

4. **Notificação e Modal:**
   - Após o sorteio, uma notificação aparece na tela informando que o sorteio foi finalizado, e um modal exibe a cor do time sorteado para cada jogador.

## Capturas de Tela

![Exemplo da interface de configuração](exemplo-imagem.png)

*Exemplo de tela de configuração antes do sorteio.*

---

### Como Funciona o Sorteio

- **Entrada do Usuário:** O usuário informa o número de jogadores e de times.
- **Cálculo dos Times:** O número de jogadores é distribuído pelos times, e o sistema calcula quantos jogadores vão para cada time.
- **Seleção de Cores:** O usuário escolhe as cores dos times. O sistema sorteia aleatoriamente um jogador para cada time.
- **Notificação Visual:** Quando o sorteio é concluído, o sistema avisa o usuário com uma notificação visual.
